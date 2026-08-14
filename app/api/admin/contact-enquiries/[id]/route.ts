import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";

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

    const contact =
      await ContactMessage.findByIdAndUpdate(
        id,
        {
          $set: {
            status: "read",
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Contact enquiry not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Contact enquiry marked as read",
        contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "MARK CONTACT AS READ ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to mark contact enquiry as read",
      },
      { status: 500 }
    );
  }
}