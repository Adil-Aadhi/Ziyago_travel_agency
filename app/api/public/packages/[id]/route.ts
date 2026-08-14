import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";

export async function GET(
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

    const packageData = await Package.findOne({
      _id: id,
      status: "Active",
      isActive: true,
    }).lean();

    if (!packageData) {
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
        package: packageData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET PUBLIC PACKAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch package",
      },
      { status: 500 }
    );
  }
}