import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import Review from "@/lib/models/Review";

/* -------------------------------------------------------
   GET REVIEWS
------------------------------------------------------- */

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find({
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET PUBLIC REVIEWS ERROR:",
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

/* -------------------------------------------------------
   CREATE REVIEW
------------------------------------------------------- */

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      location,
      rating,
      review,
    } = body;

    /* -----------------------------------------------
       Required fields
    ------------------------------------------------ */

    if (
      !name ||
      !location ||
      !rating ||
      !review
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, location, rating and review are required",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Clean values
    ------------------------------------------------ */

    const cleanName =
      String(name).trim();

    const cleanLocation =
      String(location).trim();

    const cleanReview =
      String(review).trim();

    const reviewRating = Number(rating);

    /* -----------------------------------------------
       Validate
    ------------------------------------------------ */

    if (
      cleanName.length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name must contain at least 2 characters",
        },
        { status: 400 }
      );
    }

    if (
      cleanLocation.length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid location",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(reviewRating) ||
      reviewRating < 1 ||
      reviewRating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    if (
      cleanReview.length < 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Review must contain at least 5 characters",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Create review
    ------------------------------------------------ */

    const newReview =
      await Review.create({
        name: cleanName,
        location: cleanLocation,
        rating: reviewRating,
        review: cleanReview,

        // Public reviews require approval
        status: "pending",
      });

    /* -----------------------------------------------
       Response
    ------------------------------------------------ */

    return NextResponse.json(
      {
        success: true,
        message:
          "Review submitted successfully and is awaiting approval",
        review: {
          _id: newReview._id,
          name: newReview.name,
          location: newReview.location,
          rating: newReview.rating,
          review: newReview.review,
          status: newReview.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE PUBLIC REVIEW ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit review",
      },
      { status: 500 }
    );
  }
}