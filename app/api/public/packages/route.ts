import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 8,
        1
      ),
      50
    );

    const search =
      searchParams.get("search")?.trim() || "";

    const destination =
      searchParams.get("destination")?.trim() || "";

    const tourType =
      searchParams.get("tourType")?.trim() || "";

    const minPriceParam =
      searchParams.get("minPrice");

    const maxPriceParam =
      searchParams.get("maxPrice");

    const sort =
      searchParams.get("sort") || "newest";

    const filter: Record<string, any> = {
      isActive: true,
      status: "Active",
    };

    // Search
    if (search) {
      const regex = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { title: regex },
        { destination: regex },
        { description: regex },
      ];
    }

    // Destination
    if (destination) {
      filter.destination = new RegExp(
        destination.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
    }

    // Tour type
    if (tourType) {
      filter.tourType = tourType;
    }

    // Budget
    const minPrice = Number(minPriceParam);
    const maxPrice = Number(maxPriceParam);

    if (
      minPriceParam !== null &&
      Number.isFinite(minPrice) &&
      minPrice >= 0
    ) {
      filter.price = {
        ...(filter.price || {}),
        $gte: minPrice,
      };
    }

    if (
      maxPriceParam !== null &&
      Number.isFinite(maxPrice) &&
      maxPrice >= 0
    ) {
      filter.price = {
        ...(filter.price || {}),
        $lte: maxPrice,
      };
    }

    // Sorting
    let sortOption: Record<string, 1 | -1>;

    switch (sort) {
      case "rating":
        sortOption = { rating: -1 };
        break;

      case "price-low":
        sortOption = { price: 1 };
        break;

      case "price-high":
        sortOption = { price: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const total = await Package.countDocuments(filter);

    const totalPages = Math.ceil(total / limit);

    const packages = await Package.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      packages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("PUBLIC PACKAGES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch packages",
      },
      { status: 500 }
    );
  }
}