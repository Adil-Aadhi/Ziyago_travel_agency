import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Package from "@/lib/models/Package";
import Gallery from "@/lib/models/Gallery";
import ContactMessage from "@/lib/models/ContactMessage";
import BookingEnquiry from "@/lib/models/BookingEnquiry";

export async function GET() {
  try {
    await connectDB();

    /* -------------------------------------------------------
       Dashboard counts
    ------------------------------------------------------- */

    const [
      totalPackages,
      galleryItems,
      contactEnquiries,
      bookingEnquiries,
      activePackages,
      recentPackages,
    ] = await Promise.all([
      /* Total packages */
      Package.countDocuments(),

      /* Gallery */
      Gallery.countDocuments(),

      /* Contact enquiries */
      ContactMessage.countDocuments(),

      /* Booking enquiries */
      BookingEnquiry.countDocuments(),

      /* Active packages */
      Package.countDocuments({
        status: "Active",
        isActive: true,
      }),

      /* Latest 5 packages */
      Package.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "_id title destination price status isActive createdAt"
        )
        .lean(),
    ]);

    /* -------------------------------------------------------
       Total enquiries
       = Contact + Booking
    ------------------------------------------------------- */

    const totalEnquiries =
      contactEnquiries + bookingEnquiries;

    /* -------------------------------------------------------
       Response
    ------------------------------------------------------- */

    return NextResponse.json(
      {
        success: true,

        stats: {
          totalPackages,
          galleryItems,
          enquiries: totalEnquiries,
          activePackages,
        },

        recentPackages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET ADMIN DASHBOARD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}