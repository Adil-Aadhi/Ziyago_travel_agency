import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Review from "@/lib/models/Review";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const pageParam =
      Number(searchParams.get("page")) || 1;

    const limitParam =
      Number(searchParams.get("limit")) || 10;

    const status =
      searchParams.get("status");

    const page = Math.max(1, pageParam);

    const limit = Math.min(
      Math.max(1, limitParam),
      50
    );

    const skip = (page - 1) * limit;

    /* -----------------------------------------------
       Filter
    ------------------------------------------------ */

    const filter: {
      status?: "pending" | "approved" | "rejected";
    } = {};

    if (
      status &&
      ["pending", "approved", "rejected"].includes(
        status
      )
    ) {
      filter.status =
        status as
          | "pending"
          | "approved"
          | "rejected";
    }

    /* -----------------------------------------------
       Fetch reviews
    ------------------------------------------------ */

    const [reviews, totalItems] =
      await Promise.all([
        Review.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        Review.countDocuments(filter),
      ]);

    const totalPages = Math.ceil(
      totalItems / limit
    );

    return NextResponse.json(
      {
        success: true,

        reviews,

        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems,
          totalPages,
          hasPreviousPage: page > 1,
          hasNextPage:
            page < totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET ADMIN REVIEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}