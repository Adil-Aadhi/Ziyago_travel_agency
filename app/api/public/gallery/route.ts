import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 8;

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const pageParam = Number(searchParams.get("page")) || 1;
    const limitParam = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

    const page = Math.max(1, pageParam);
    const limit = Math.min(
      Math.max(1, limitParam),
      MAX_LIMIT
    );

    const skip = (page - 1) * limit;

    const [gallery, totalItems] = await Promise.all([
      Gallery.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("title description type url createdAt")
        .lean(),

      Gallery.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json(
      {
        success: true,
        gallery,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems,
          totalPages,
          hasPreviousPage: page > 1,
          hasNextPage: page < totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUBLIC GALLERY GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery",
      },
      { status: 500 }
    );
  }
}