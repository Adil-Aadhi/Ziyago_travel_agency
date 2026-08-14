import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import Review from "@/lib/models/Review";

type ReviewStatus =
  | "pending"
  | "approved"
  | "rejected";

const VALID_STATUSES: ReviewStatus[] = [
  "pending",
  "approved",
  "rejected",
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

    const body = await request.json();

    const status = body.status as string;

    /* -----------------------------------------------
       Validate status
    ------------------------------------------------ */

    if (
      !VALID_STATUSES.includes(
        status as ReviewStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid review status",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Update review
    ------------------------------------------------ */

    const review =
      await Review.findByIdAndUpdate(
        id,
        {
          $set: {
            status:
              status as ReviewStatus,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          message: "Review not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Review status updated successfully",
        review,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE REVIEW STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update review status",
      },
      { status: 500 }
    );
  }
}