import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(
  file: File,
  type: "image" | "video"
): Promise<{
  secure_url: string;
  public_id: string;
}> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "travel-agency/gallery",
          resource_type: type,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(
              new Error(
                "Cloudinary upload returned no result"
              )
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

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const galleryItem =
      await Gallery.findById(id);

    if (!galleryItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery item not found",
        },
        { status: 404 }
      );
    }

    /* -----------------------------------------------
       Delete from Cloudinary
    ------------------------------------------------ */

    await cloudinary.uploader.destroy(
      galleryItem.publicId,
      {
        resource_type:
          galleryItem.type === "video"
            ? "video"
            : "image",
      }
    );

    /* -----------------------------------------------
       Delete MongoDB document
    ------------------------------------------------ */

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message:
          "Gallery item deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete gallery item",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery item not found",
        },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const title = formData
      .get("title")
      ?.toString()
      .trim();

    const description = formData
      .get("description")
      ?.toString()
      .trim();

    const type = formData
      .get("type")
      ?.toString();

    const file = formData.get("file");

    if (!title || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and media type are required",
        },
        { status: 400 }
      );
    }

    if (
      type !== "image" &&
      type !== "video"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid media type",
        },
        { status: 400 }
      );
    }

    /*
     * --------------------------------------------------
     * If a new file was selected
     * --------------------------------------------------
     */

    if (file instanceof File) {
      if (
        type === "image" &&
        !file.type.startsWith("image/")
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Please upload a valid image",
          },
          { status: 400 }
        );
      }

      if (
        type === "video" &&
        !file.type.startsWith("video/")
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Please upload a valid video",
          },
          { status: 400 }
        );
      }

      /*
       * Upload NEW asset first
       */

      const newCloudinaryResult =
        await uploadToCloudinary(file, type);

      /*
       * Delete OLD asset only AFTER
       * new upload succeeded
       */

      await cloudinary.uploader.destroy(
        galleryItem.publicId,
        {
          resource_type:
            galleryItem.type === "video"
              ? "video"
              : "image",
        }
      );

      /*
       * Update MongoDB with new asset
       */

      galleryItem.title = title;
      galleryItem.description =
        description || "";
      galleryItem.type = type;
      galleryItem.url =
        newCloudinaryResult.secure_url;
      galleryItem.publicId =
        newCloudinaryResult.public_id;

    } else {
      /*
       * No new file
       * Keep existing Cloudinary asset
       */

      galleryItem.title = title;
      galleryItem.description =
        description || "";

      /*
       * If type changed without a new file,
       * don't allow inconsistent data.
       */

      if (type !== galleryItem.type) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please select a new media file when changing the media type",
          },
          { status: 400 }
        );
      }
    }

    await galleryItem.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Gallery item updated successfully",
        gallery: galleryItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update gallery item",
      },
      { status: 500 }
    );
  }
}