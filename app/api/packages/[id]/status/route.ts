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

    const body = await request.json();

    const { status } = body;

    if (status !== "Active" && status !== "Draft") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid package status",
        },
        { status: 400 }
      );
    }

    const updatedPackage =
      await Package.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedPackage) {
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
        message: `Package changed to ${status}`,
        package: updatedPackage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE PACKAGE STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update package status",
      },
      { status: 500 }
    );
  }
}