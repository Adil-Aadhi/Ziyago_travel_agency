import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import BookingEnquiry from "@/lib/models/BookingEnquiry";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

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
    status?: "pending" | "contacted" | "confirmed" | "cancelled";
    } = {};;

    if (
        status &&
        [
            "pending",
            "contacted",
            "confirmed",
            "cancelled",
        ].includes(status)
        ) {
        filter.status = status as
            | "pending"
            | "contacted"
            | "confirmed"
            | "cancelled";
        }

    /* -----------------------------------------------
       Fetch bookings
    ------------------------------------------------ */

    const [bookings, totalItems] =
      await Promise.all([
        BookingEnquiry.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        BookingEnquiry.countDocuments(filter),
      ]);

    const totalPages = Math.ceil(
      totalItems / limit
    );

    return NextResponse.json(
      {
        success: true,

        bookings,

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
      "GET ADMIN BOOKINGS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch booking enquiries",
      },
      { status: 500 }
    );
  }
}