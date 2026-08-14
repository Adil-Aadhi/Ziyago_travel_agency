import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";

type ContactStatus =
  | "new"
  | "read"
  | "replied";

export async function GET(
  request: NextRequest
) {
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
      status?: ContactStatus;
    } = {};

    if (
      status &&
      ["new", "read", "replied"].includes(
        status
      )
    ) {
      filter.status =
        status as ContactStatus;
    }

    /* -----------------------------------------------
       Fetch enquiries
    ------------------------------------------------ */

    const [contacts, totalItems] =
      await Promise.all([
        ContactMessage.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        ContactMessage.countDocuments(filter),
      ]);

    const totalPages = Math.ceil(
      totalItems / limit
    );

    return NextResponse.json(
      {
        success: true,

        contacts,

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
      "GET ADMIN CONTACT ENQUIRIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch contact enquiries",
      },
      { status: 500 }
    );
  }
}