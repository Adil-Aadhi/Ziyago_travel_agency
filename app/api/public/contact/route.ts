import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";
import { sendContactAdminEmail } from "@/lib/mail";

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
      name,
      email,
      phone,
      subject,
      message,
    } = body;

    /* -----------------------------------------------
       Validate required fields
    ------------------------------------------------ */

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, subject and message are required",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Validate email
    ------------------------------------------------ */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------
       Create contact message
    ------------------------------------------------ */

    const contactMessage =
      await ContactMessage.create({
        name: name.trim(),

        email: email
          .trim()
          .toLowerCase(),

        phone: phone?.trim() || "",

        subject: subject.trim(),

        message: message.trim(),

        status: "new",
      });

      //mail

    //   try {
    //     await sendContactAdminEmail({
    //         name: name.trim(),
    //         email: email.trim().toLowerCase(),
    //         phone: phone?.trim() || "",
    //         subject: subject.trim(),
    //         message: message.trim(),
    //     });
    //     } catch (emailError) {
    //     console.error(
    //         "CONTACT EMAIL FAILED:",
    //         emailError
    //     );
    // }

    /* -----------------------------------------------
       Response
    ------------------------------------------------ */

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully",
        contact: {
          _id: contactMessage._id,
          status: contactMessage.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE CONTACT MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send your message",
      },
      { status: 500 }
    );
  }
}