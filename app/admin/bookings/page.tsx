"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type Booking = {
  _id: string;
  packageId: string;
  packageTitle: string;
  name: string;
  email: string;
  phone: string;
  travellers: number;
  travelDate?: string;
  message: string;
  status:
    | "pending"
    | "contacted"
    | "confirmed"
    | "cancelled";
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const ITEMS_PER_PAGE = 10;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(
    []
  );

  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);
const [updatingStatus, setUpdatingStatus] =
  useState(false);

    const [mobileOpen, setMobileOpen] = useState(false);

    const [statusFilter, setStatusFilter] =
        useState<
            | "all"
            | "pending"
            | "contacted"
            | "confirmed"
            | "cancelled"
        >("all");

  /* -------------------------------------------------------
     Fetch Bookings
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/admin/bookings?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch bookings"
          );
        }

        setBookings(data.bookings || []);

        setPagination(
          data.pagination || null
        );
      } catch (error) {
        console.error(
          "FETCH BOOKINGS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage]);

  /* -------------------------------------------------------
     Format Date
  ------------------------------------------------------- */

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* -------------------------------------------------------
     Status Styles
  ------------------------------------------------------- */

  const getStatusClass = (
    status: Booking["status"]
  ) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700";

      case "contacted":
        return "bg-blue-50 text-blue-700";

      case "confirmed":
        return "bg-green-50 text-green-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const handleStatusUpdate = async (
    status: Booking["status"]
    ) => {
    if (!selectedBooking) return;

    try {
        setUpdatingStatus(true);

        const response = await fetch(
        `/api/admin/bookings/${selectedBooking._id}`,
        {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            status,
            }),
        }
        );
    
    

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Failed to update booking status"
      );
    }

    /* Update selected booking in modal */
    setSelectedBooking(data.booking);

    /* Update booking in table */
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === data.booking._id
          ? data.booking
          : booking
      )
    );

    toast.success(
      "Booking status updated successfully"
    );
  } catch (error) {
    console.error(
      "UPDATE BOOKING STATUS ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to update booking status"
    );
  } finally {
    setUpdatingStatus(false);
  }
};

    const filteredBookings =
        bookings.filter((booking) => {
            if (statusFilter === "all") {
            return true;
            }

            return booking.status === statusFilter;
        });

  return (

    <div className="min-h-screen bg-[#f8fafb]">
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">

        <AdminHeader
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <main className="flex-1 p-5 md:p-8">

            {/* -------------------------------------------------------
                Header
            ------------------------------------------------------- */}

            <div className="mb-8">

                <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
                Customer Requests
                </p>

                <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                    Booking Enquiries
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                    Manage booking requests submitted by
                    customers.
                    </p>
                </div>

                {pagination && (
                    <div className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                    {pagination.totalItems}{" "}
                    {pagination.totalItems === 1
                        ? "Request"
                        : "Requests"}
                    </div>
                )}

                </div>
            </div>

            {/* Status Filter */}

                <div className="mb-5 flex flex-wrap items-center gap-2">

                <button
                    type="button"
                    onClick={() => setStatusFilter("all")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "all"
                        ? "bg-orange-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500"
                    }
                    `}
                >
                    All
                </button>

                <button
                    type="button"
                    onClick={() => setStatusFilter("pending")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "pending"
                        ? "bg-yellow-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-yellow-300 hover:text-yellow-600"
                    }
                    `}
                >
                    Pending
                </button>

                <button
                    type="button"
                    onClick={() => setStatusFilter("contacted")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "contacted"
                        ? "bg-blue-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                    }
                    `}
                >
                    Contacted
                </button>

                <button
                    type="button"
                    onClick={() => setStatusFilter("confirmed")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "confirmed"
                        ? "bg-green-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-600"
                    }
                    `}
                >
                    Confirmed
                </button>

                <button
                    type="button"
                    onClick={() => setStatusFilter("cancelled")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "cancelled"
                        ? "bg-red-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:text-red-600"
                    }
                    `}
                >
                    Cancelled
                </button>

                </div>

            {/* -------------------------------------------------------
                Content
            ------------------------------------------------------- */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* Loading */}

                {loading && (
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="flex items-center gap-3 text-gray-500">
                    <Loader2
                        size={22}
                        className="animate-spin"
                    />

                    <span className="text-sm">
                        Loading booking enquiries...
                    </span>
                    </div>
                </div>
                )}

                {/* Empty */}

                {!loading &&
                    bookings.length > 0 &&
                    filteredBookings.length === 0 && (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                        <CalendarDays
                            size={42}
                            className="text-gray-300"
                        />

                        <h2 className="mt-4 text-lg font-semibold text-gray-800">
                            No {statusFilter} bookings
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            There are no bookings with this status.
                        </p>

                        </div>
                    )}

                {/* -------------------------------------------------------
                    Desktop Table
                ------------------------------------------------------- */}

                {!loading && filteredBookings.length > 0 && (
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Customer
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Package
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Travellers
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Travel Date
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Submitted
                        </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {filteredBookings.map((booking) => (
                        <tr
                            key={booking._id}
                            onClick={() =>
                            setSelectedBooking(
                                booking
                            )
                            }
                            className="
                            cursor-pointer
                            transition
                            hover:bg-orange-50/40
                            "
                        >

                            {/* Customer */}

                            <td className="px-6 py-5">

                            <div className="font-medium text-gray-900">
                                {booking.name}
                            </div>

                            <div className="mt-1 text-xs text-gray-500">
                                {booking.email}
                            </div>

                            </td>

                            {/* Package */}

                            <td className="px-6 py-5">

                            <p className="max-w-[220px] truncate font-medium text-gray-800">
                                {booking.packageTitle}
                            </p>

                            </td>

                            {/* Travellers */}

                            <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users size={16} />

                                {booking.travellers}
                            </div>

                            </td>

                            {/* Travel Date */}

                            <td className="px-6 py-5 text-sm text-gray-600">
                            {formatDate(
                                booking.travelDate
                            )}
                            </td>

                            {/* Status */}

                            <td className="px-6 py-5">

                            <span
                                className={`
                                inline-flex
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                capitalize
                                ${getStatusClass(
                                    booking.status
                                )}
                                `}
                            >
                                {booking.status}
                            </span>

                            </td>

                            {/* Submitted */}

                            <td className="px-6 py-5 text-sm text-gray-500">
                            {formatDate(
                                booking.createdAt
                            )}
                            </td>

                        </tr>
                        ))}

                    </tbody>

                    </table>

                </div>
                )}

                {/* -------------------------------------------------------
                    Pagination
                ------------------------------------------------------- */}

                {!loading &&
                pagination &&
                pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">

                    <p className="text-sm text-gray-500">
                        Page{" "}
                        <span className="font-medium text-gray-800">
                        {pagination.currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-800">
                        {pagination.totalPages}
                        </span>
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                        type="button"
                        onClick={() =>
                            setCurrentPage(
                            (page) =>
                                Math.max(
                                page - 1,
                                1
                                )
                            )
                        }
                        disabled={
                            !pagination.hasPreviousPage
                        }
                        className="
                            flex
                            h-9
                            items-center
                            gap-1
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:border-orange-400
                            hover:text-orange-500
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                        >
                        <ChevronLeft size={16} />
                        Previous
                        </button>

                        <button
                        type="button"
                        onClick={() =>
                            setCurrentPage(
                            (page) =>
                                page + 1
                            )
                        }
                        disabled={
                            !pagination.hasNextPage
                        }
                        className="
                            flex
                            h-9
                            items-center
                            gap-1
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:border-orange-400
                            hover:text-orange-500
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                        >
                        Next
                        <ChevronRight size={16} />
                        </button>

                    </div>
                    </div>
                )}

            </div>

            {/* -------------------------------------------------------
                Booking Details Modal
            ------------------------------------------------------- */}

            {selectedBooking && (
                <div
                className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    bg-black/50
                    p-4
                    backdrop-blur-sm
                "
                onClick={() =>
                    setSelectedBooking(null)
                }
                >
                <div
                    className="
                    w-full
                    max-w-2xl
                    rounded-2xl
                    bg-white
                    shadow-2xl
                    "
                    onClick={(e) =>
                    e.stopPropagation()
                    }
                >

                    {/* Modal Header */}

                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                        Booking Enquiry
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                        {selectedBooking.packageTitle}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                        setSelectedBooking(null)
                        }
                        className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        text-gray-500
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        "
                    >
                        ×
                    </button>

                    </div>

                    {/* Details */}

                    <div className="space-y-6 px-6 py-6">

                    {/* Customer */}

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Customer
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                        {selectedBooking.name}
                        </p>
                    </div>

                    {/* Contact */}

                    <div className="grid gap-4 sm:grid-cols-2">

                        <div className="flex items-center gap-3">
                        <Mail
                            size={18}
                            className="text-orange-500"
                        />

                        <div>
                            <p className="text-xs text-gray-400">
                            Email
                            </p>

                            <p className="text-sm text-gray-700">
                            {selectedBooking.email}
                            </p>
                        </div>
                        </div>

                        <div className="flex items-center gap-3">
                        <Phone
                            size={18}
                            className="text-orange-500"
                        />

                        <div>
                            <p className="text-xs text-gray-400">
                            Phone
                            </p>

                            <p className="text-sm text-gray-700">
                            {selectedBooking.phone}
                            </p>
                        </div>
                        </div>

                    </div>

                    {/* Trip Details */}

                    <div className="grid gap-4 sm:grid-cols-2">

                        <div>
                        <p className="text-xs text-gray-400">
                            Travellers
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-800">
                            {selectedBooking.travellers}
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-gray-400">
                            Preferred Travel Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-800">
                            {formatDate(
                            selectedBooking.travelDate
                            )}
                        </p>
                        </div>

                    </div>

                    {/* Status */}

                    <div>
                        <p className="text-xs text-gray-400">
                            Status
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3">

                            <select
                            value={selectedBooking.status}
                            onChange={(e) =>
                                handleStatusUpdate(
                                e.target.value as Booking["status"]
                                )
                            }
                            disabled={updatingStatus}
                            className="
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2
                                text-sm
                                font-medium
                                capitalize
                                text-gray-700
                                outline-none
                                transition
                                focus:border-orange-400
                                focus:ring-2
                                focus:ring-orange-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                            >
                            <option value="pending">
                                Pending
                            </option>

                            <option value="contacted">
                                Contacted
                            </option>

                            <option value="confirmed">
                                Confirmed
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>
                            </select>

                            {updatingStatus && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Loader2
                                size={16}
                                className="animate-spin"
                                />

                                Updating...
                            </div>
                            )}

                        </div>
                        </div>

                    {/* Message */}

                    <div>
                        <p className="text-xs text-gray-400">
                        Message
                        </p>

                        <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                        {selectedBooking.message ||
                            "No message provided."}
                        </div>
                    </div>

                    </div>

                </div>
                </div>
            )}

            </main>
      </div>
    </div>
  </div>
  );
}