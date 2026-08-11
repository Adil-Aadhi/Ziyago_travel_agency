import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Remove Cloudinary version
    const withoutVersion =
      uploadPart.replace(/^v\d+\//, "");

    // Remove file extension
    const publicId =
      withoutVersion.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    console.log(
      "Deleted Cloudinary image:",
      publicId
    );
  } catch (error) {
    console.error(
      "CLOUDINARY DELETE ERROR:",
      error
    );

    // Don't stop the whole deletion because
    // one Cloudinary image failed.
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // -----------------------------------------
    // Find package
    // -----------------------------------------

    const packageData =
      await Package.findById(id);

    if (!packageData) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    // -----------------------------------------
    // Delete main image
    // -----------------------------------------

    if (packageData.mainImage) {
      await deleteFromCloudinary(
        packageData.mainImage
      );
    }

    // -----------------------------------------
    // Delete gallery images
    // -----------------------------------------

    if (
      packageData.galleryImages &&
      packageData.galleryImages.length > 0
    ) {
      await Promise.all(
        packageData.galleryImages.map(
          (imageUrl) =>
            deleteFromCloudinary(imageUrl)
        )
      );
    }

    // -----------------------------------------
    // Delete package from MongoDB
    // -----------------------------------------

    await Package.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message:
          "Package permanently deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PERMANENT DELETE PACKAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to permanently delete package",
      },
      { status: 500 }
    );
  }
}