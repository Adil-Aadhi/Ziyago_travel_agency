import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(
  file: File,
  folder: string
): Promise<{
  secure_url: string;
  public_id: string;
}> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(
            new Error("Cloudinary upload returned no result")
          );
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

async function deleteFromCloudinary(
  imageUrl: string
): Promise<void> {
  if (!imageUrl) return;

  try {
    const uploadPart = imageUrl.split("/upload/")[1];

    if (!uploadPart) {
      console.warn(
        "Could not extract Cloudinary public_id:",
        imageUrl
      );
      return;
    }

    // Remove Cloudinary version if present
    const withoutVersion =
      uploadPart.replace(/^v\d+\//, "");

    // Remove file extension
    const publicId =
      withoutVersion.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    console.log(
      "Deleted old Cloudinary image:",
      publicId
    );
  } catch (error) {
    console.error(
      "CLOUDINARY DELETE ERROR:",
      error
    );
  }
}

// GET SINGLE PACKAGE
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const packageData = await Package.findById(id).lean();

    if (!packageData) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        package: packageData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch package",
      },
      { status: 500 }
    );
  }
}


// UPDATE PACKAGE
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const formData = await request.formData();

    // -----------------------------------------
    // Basic fields
    // -----------------------------------------

    const title = formData
      .get("title")
      ?.toString()
      .trim();

    const destination = formData
      .get("destination")
      ?.toString()
      .trim();

    const duration = formData
      .get("duration")
      ?.toString()
      .trim();

    const price = formData
      .get("price")
      ?.toString();

    const description = formData
      .get("description")
      ?.toString()
      .trim();

    const status =
      formData.get("status")?.toString() || "Draft";

    // -----------------------------------------
    // Find existing package
    // -----------------------------------------

    const existingPackage =
      await Package.findById(id);

    if (!existingPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    // -----------------------------------------
    // Parse JSON fields
    // -----------------------------------------

    const highlightsRaw = formData
      .get("highlights")
      ?.toString();

    const includedRaw = formData
      .get("included")
      ?.toString();

    const excludedRaw = formData
      .get("excluded")
      ?.toString();

    const itineraryRaw = formData
      .get("itinerary")
      ?.toString();

    let highlights =
      existingPackage.highlights || [];

    let included =
      existingPackage.included || [];

    let excluded =
      existingPackage.excluded || [];

    let itinerary =
      existingPackage.itinerary || [];

    try {
      if (highlightsRaw) {
        highlights = JSON.parse(highlightsRaw);
      }

      if (includedRaw) {
        included = JSON.parse(includedRaw);
      }

      if (excludedRaw) {
        excluded = JSON.parse(excludedRaw);
      }

      if (itineraryRaw) {
        itinerary = JSON.parse(itineraryRaw);
      }

      if (
        !Array.isArray(highlights) ||
        !Array.isArray(included) ||
        !Array.isArray(excluded) ||
        !Array.isArray(itinerary)
      ) {
        throw new Error(
          "Package fields must be arrays"
        );
      }
    } catch (error) {
      console.error(
        "UPDATE JSON PARSE ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid package list data",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Validate
    // -----------------------------------------

    const numericPrice = Number(price);

    if (
      !title ||
      !destination ||
      !duration ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Valid title, destination, duration and price are required",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Prepare update
    // -----------------------------------------

    const updateData: Record<string, unknown> = {
      title,
      destination,
      duration,
      price: numericPrice,
      description: description || "",
      highlights,
      included,
      excluded,
      itinerary,
      status:
        status === "Active" || status === "Draft"
          ? status
          : "Draft",
    };

    // -----------------------------------------
    // Main image
    // Only upload if a new image was selected
    // -----------------------------------------

    const mainImage = formData.get("mainImage");

    let oldMainImage: string | null = null;

    if (
      mainImage instanceof File &&
      mainImage.size > 0
    ) {
      const result = await uploadToCloudinary(
        mainImage,
        "travel-agency/packages/main"
      );

      // Keep old image URL temporarily
      oldMainImage =
        existingPackage.mainImage;

      // Save new image URL
      updateData.mainImage =
        result.secure_url;
    }

    // -----------------------------------------
    // Gallery images
    // Add new images to existing gallery
    // -----------------------------------------

    const galleryImages =
      formData.getAll("galleryImages");

    const validGalleryFiles =
      galleryImages.filter(
        (file): file is File =>
          file instanceof File &&
          file.size > 0
      );

    if (validGalleryFiles.length > 0) {
      const galleryResults =
        await Promise.all(
          validGalleryFiles.map((file) =>
            uploadToCloudinary(
              file,
              "travel-agency/packages/gallery"
            )
          )
        );

      const newGalleryUrls =
        galleryResults.map(
          (image) => image.secure_url
        );

      updateData.galleryImages = [
        ...(existingPackage.galleryImages || []),
        ...newGalleryUrls,
      ];
    }

    // -----------------------------------------
    // Update MongoDB
    // -----------------------------------------

    const updatedPackage =
  await Package.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

// -----------------------------------------
// Delete old main image from Cloudinary
// ONLY after MongoDB update succeeds
// -----------------------------------------

if (oldMainImage) {
  await deleteFromCloudinary(
    oldMainImage
  );
}

return NextResponse.json(
  {
    success: true,
    message: "Package updated successfully",
    package: updatedPackage,
  },
  { status: 200 }
);

  } catch (error) {
    console.error(
      "UPDATE PACKAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update package",
      },
      { status: 500 }
    );
  }
}



// SOFT DELETE PACKAGE
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedPackage =
      await Package.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!deletedPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Package moved to deleted packages",
        package: deletedPackage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "SOFT DELETE PACKAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete package",
      },
      { status: 500 }
    );
  }
}