import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const restoredPackage =
      await Package.findByIdAndUpdate(
        id,
        {
          isActive: true,
        },
        {
          new: true,
        }
      );

    if (!restoredPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Package restored successfully",
        package: restoredPackage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "RESTORE PACKAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to restore package",
      },
      { status: 500 }
    );
  }
}