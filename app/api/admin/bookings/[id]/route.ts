import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import BookingEnquiry from "@/lib/models/BookingEnquiry";

type BookingStatus =
  | "pending"
  | "contacted"
  | "confirmed"
  | "cancelled";

const VALID_STATUSES: BookingStatus[] = [
  "pending",
  "contacted",
  "confirmed",
  "cancelled",
];

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    /* -----------------------------------------------
       Get request body
    ------------------------------------------------ */

    const body = await request.json();

    const status = body.status as string;

    /* -----------------------------------------------
       Validate status
    ------------------------------------------------ */

    if (
      !status ||
      !VALID_STATUSES.includes(
        status as BookingStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid booking status",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Find and update booking
    ------------------------------------------------ */

    const booking =
      await BookingEnquiry.findByIdAndUpdate(
        id,
        {
          $set: {
            status:
              status as BookingStatus,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    /* -----------------------------------------------
       Booking not found
    ------------------------------------------------ */

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking enquiry not found",
        },
        { status: 404 }
      );
    }

    /* -----------------------------------------------
       Response
    ------------------------------------------------ */

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking status updated successfully",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE BOOKING STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update booking status",
      },
      { status: 500 }
    );
  }
}