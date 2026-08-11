import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* -------------------------------------------------------
   Upload File → Cloudinary
------------------------------------------------------- */

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
          reject(new Error("Cloudinary upload returned no result"));
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



// GET PACKAGES
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const deleted =
      searchParams.get("deleted") === "true";

    const packages = await Package.find(
      deleted
        ? { isActive: false }
        : { isActive: { $ne: false } }
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        packages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PACKAGES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch packages",
      },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------
   CREATE PACKAGE
------------------------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    /* -----------------------------------------------
       Basic fields
    ------------------------------------------------ */

    const title = formData.get("title")?.toString().trim();
    const destination = formData
      .get("destination")
      ?.toString()
      .trim();

    const duration = formData
      .get("duration")
      ?.toString()
      .trim();

    const price = formData.get("price")?.toString();

    const description = formData
      .get("description")
      ?.toString()
      .trim();

    const status =
      formData.get("status")?.toString() || "Draft";

    /* -----------------------------------------------
       Main image
    ------------------------------------------------ */

    const mainImage = formData.get("mainImage");

    /* -----------------------------------------------
       Gallery images
    ------------------------------------------------ */

    const galleryImages = formData.getAll("galleryImages");

    /* -----------------------------------------------
       Highlights
    ------------------------------------------------ */

    const highlightsRaw = formData
      .get("highlights")
      ?.toString();

    const includedRaw = formData
      .get("included")
      ?.toString();

    const excludedRaw = formData
      .get("excluded")
      ?.toString();

    /* -----------------------------------------------
       Itinerary
    ------------------------------------------------ */

    const itineraryRaw = formData
      .get("itinerary")
      ?.toString();

    /* -----------------------------------------------
       Validation
    ------------------------------------------------ */

    const numericPrice = Number(price);

    if (
      !title ||
      !destination ||
      !duration ||
      !price ||
      !mainImage ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title, destination, duration, price and main image are required",
        },
        { status: 400 }
      );
    }

    if (!(mainImage instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid main image",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Parse JSON fields
    ------------------------------------------------ */

    let highlights: string[] = [];
    let itinerary: {
      day: number;
      title: string;
      description: string;
    }[] = [];
    let included: string[] = [];
    let excluded: string[] = [];

    try {
      if (highlightsRaw) {
        highlights = JSON.parse(highlightsRaw);
      }

      if (itineraryRaw) {
        itinerary = JSON.parse(itineraryRaw);
      }
      if (includedRaw) {
        included = JSON.parse(includedRaw);
      }

      if (excludedRaw) {
        excluded = JSON.parse(excludedRaw);
      }
      // Make sure these fields are arrays
      if (
        !Array.isArray(highlights) ||
        !Array.isArray(itinerary) ||
        !Array.isArray(included) ||
        !Array.isArray(excluded)
      ) {
        throw new Error("Package list fields must be arrays");
      }
    } catch (error) {
      console.error("JSON PARSE ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid highlights or itinerary data",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Upload main image
    ------------------------------------------------ */

    const mainImageResult = await uploadToCloudinary(
      mainImage,
      "travel-agency/packages/main"
    );

    /* -----------------------------------------------
       Upload gallery images
    ------------------------------------------------ */

    const validGalleryFiles = galleryImages.filter(
      (file): file is File => file instanceof File
    );

    const galleryResults =
      validGalleryFiles.length > 0
        ? await Promise.all(
            validGalleryFiles.map((file) =>
              uploadToCloudinary(
                file,
                "travel-agency/packages/gallery"
              )
            )
          )
        : [];

    const galleryImageUrls = galleryResults.map(
      (image) => image.secure_url
    );

    /* -----------------------------------------------
       Create MongoDB document
    ------------------------------------------------ */

    const newPackage = await Package.create({
      title,
      destination,
      duration,
      price: numericPrice,

      description: description || "",

      mainImage: mainImageResult.secure_url,

      galleryImages: galleryImageUrls,

      highlights,

      itinerary,
      included,
      excluded,

      status:
        status === "Active" || status === "Draft"
          ? status
          : "Draft",
    });

    /* -----------------------------------------------
       Response
    ------------------------------------------------ */

    return NextResponse.json(
      {
        success: true,
        message: "Package created successfully",
        package: newPackage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PACKAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create package",
      },
      { status: 500 }
    );
  }
}