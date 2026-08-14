import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import BookingEnquiry from "@/lib/models/BookingEnquiry";
import Package from "@/lib/models/Package";
import { sendBookingAdminEmail } from "@/lib/mail";

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    /* -----------------------------------------------
       Get request body
    ------------------------------------------------ */

    const body = await request.json();

    const {
      packageId,
      name,
      email,
      phone,
      travellers,
      travelDate,
      message,
    } = body;

    /* -----------------------------------------------
       Validate required fields
    ------------------------------------------------ */

    if (
      !packageId ||
      !name ||
      !email ||
      !phone ||
      !travellers
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Package, name, email, phone and number of travellers are required",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Validate travellers
    ------------------------------------------------ */

    const travellerCount = Number(travellers);

    if (
      !Number.isInteger(travellerCount) ||
      travellerCount < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of travellers must be at least 1",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Validate email
    ------------------------------------------------ */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Find package
    ------------------------------------------------ */

    const packageData = await Package.findById(
      packageId
    ).select("_id title status isActive");

    if (!packageData) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    /* -----------------------------------------------
       Check package is active
    ------------------------------------------------ */

    if (
      packageData.status !== "Active" ||
      !packageData.isActive
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This package is currently unavailable",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Create booking enquiry
    ------------------------------------------------ */

    const bookingEnquiry =
      await BookingEnquiry.create({
        packageId: packageData._id,
        packageTitle: packageData.title,

        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),

        travellers: travellerCount,

        travelDate: travelDate
          ? new Date(travelDate)
          : undefined,

        message: message?.trim() || "",

        status: "pending",
      });

      //email snt

    //  try {
    //     await sendBookingAdminEmail({
    //         packageTitle: packageData.title,
    //         name: name.trim(),
    //         email: email.trim().toLowerCase(),
    //         phone: phone.trim(),
    //         travellers: travellerCount,
    //         travelDate: travelDate || null,
    //         message: message?.trim() || "",
    //     });
    //     } catch (emailError) {
    //     console.error(
    //         "BOOKING EMAIL FAILED:",
    //         emailError
    //     );

    //     // Do not fail the booking if email fails.
    //     }

    /* -----------------------------------------------
       Response
    ------------------------------------------------ */

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking request submitted successfully",
        booking: {
          _id: bookingEnquiry._id,
          packageTitle:
            bookingEnquiry.packageTitle,
          status: bookingEnquiry.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE BOOKING ENQUIRY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit booking request",
      },
      { status: 500 }
    );
  }
}