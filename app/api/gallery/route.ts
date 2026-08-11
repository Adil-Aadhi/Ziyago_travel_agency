import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

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

/* -------------------------------------------------------
   GET GALLERY
------------------------------------------------------- */

export async function GET() {
  try {
    await connectDB();

    const gallery = await Gallery.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        gallery,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery",
      },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------
   CREATE GALLERY ITEM
------------------------------------------------------- */

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const formData =
      await request.formData();

    /* -----------------------------------------------
       Basic fields
    ------------------------------------------------ */

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

    /* -----------------------------------------------
       Validation
    ------------------------------------------------ */

    if (!title || !type || !file) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title, media type and file are required",
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

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid media file",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Validate file type
    ------------------------------------------------ */

    if (
      type === "image" &&
      !file.type.startsWith("image/")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please upload a valid image",
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
          message:
            "Please upload a valid video",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Upload to Cloudinary
    ------------------------------------------------ */

    const cloudinaryResult =
      await uploadToCloudinary(
        file,
        type
      );

    /* -----------------------------------------------
       Save MongoDB
    ------------------------------------------------ */

    const galleryItem =
      await Gallery.create({
        title,
        description:
          description || "",

        type,

        url:
          cloudinaryResult.secure_url,

        publicId:
          cloudinaryResult.public_id,
      });

    /* -----------------------------------------------
       Response
    ------------------------------------------------ */

    return NextResponse.json(
      {
        success: true,
        message:
          "Gallery item added successfully",
        gallery: galleryItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to add gallery item",
      },
      { status: 500 }
    );
  }
}