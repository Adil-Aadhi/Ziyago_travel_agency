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

  const [mobileOpen, setMobileOpen] =
    useState(false);

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

  /* -------------------------------------------------------
     Status Update
  ------------------------------------------------------- */

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

      setSelectedBooking(data.booking);

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

  /* -------------------------------------------------------
     Filter
  ------------------------------------------------------- */

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

          <main className="flex-1 p-3 sm:p-5 md:p-8">

            {/* -------------------------------------------------------
                Header
            ------------------------------------------------------- */}

            <div className="mb-5 sm:mb-8">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                Customer Requests
              </p>

              <div className="mt-1 flex flex-col justify-between gap-3 sm:mt-1 sm:flex-row sm:items-center sm:gap-4">

                <div className="min-w-0">

                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Booking Enquiries
                  </h1>

                  <p className="mt-0.5 text-[11px] leading-5 text-gray-500 sm:mt-1 sm:text-sm">
                    Manage booking requests submitted by
                    customers.
                  </p>

                </div>

                {pagination && (
                  <div
                    className="
                      w-fit
                      rounded-lg
                      border
                      border-blue-100
                      bg-gradient-to-r
                      from-cyan-50
                      to-blue-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-blue-700
                      shadow-sm
                      sm:rounded-xl
                      sm:px-4
                      sm:py-2
                      sm:text-sm
                    "
                  >
                    {pagination.totalItems}{" "}
                    {pagination.totalItems === 1
                      ? "Request"
                      : "Requests"}
                  </div>
                )}

              </div>

            </div>

            {/* -------------------------------------------------------
                Status Filter
            ------------------------------------------------------- */}

            <div
              className="
                mb-4
                flex
                max-w-full
                items-center
                gap-1.5
                overflow-x-auto
                pb-1
                sm:mb-5
                sm:flex-wrap
                sm:gap-2
                sm:overflow-visible
                sm:pb-0
              "
            >

              {/* All */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("all")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "all"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  }
                `}
              >
                All
              </button>

              {/* Pending */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("pending")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "pending"
                      ? "bg-yellow-500 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-yellow-300 hover:text-yellow-600"
                  }
                `}
              >
                Pending
              </button>

              {/* Contacted */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("contacted")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "contacted"
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  }
                `}
              >
                Contacted
              </button>

              {/* Confirmed */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("confirmed")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "confirmed"
                      ? "bg-green-500 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-600"
                  }
                `}
              >
                Confirmed
              </button>

              {/* Cancelled */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("cancelled")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
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

            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
                sm:rounded-2xl
              "
            >

              {/* Loading */}

              {loading && (
                <div className="flex min-h-[300px] items-center justify-center sm:min-h-[400px]">

                  <div className="flex items-center gap-2 text-gray-500 sm:gap-3">

                    <Loader2
                      size={18}
                      className="animate-spin sm:h-[22px] sm:w-[22px]"
                    />

                    <span className="text-xs sm:text-sm">
                      Loading booking enquiries...
                    </span>

                  </div>

                </div>
              )}

              {/* Empty */}

              {!loading &&
                bookings.length > 0 &&
                filteredBookings.length === 0 && (
                  <div
                    className="
                      flex
                      min-h-[250px]
                      flex-col
                      items-center
                      justify-center
                      px-4
                      text-center
                      sm:min-h-[300px]
                      sm:px-6
                    "
                  >

                    <CalendarDays
                      size={34}
                      className="text-gray-300 sm:h-[42px] sm:w-[42px]"
                    />

                    <h2 className="mt-3 text-sm font-semibold text-gray-800 sm:mt-4 sm:text-lg">
                      No {statusFilter} bookings
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      There are no bookings with this status.
                    </p>

                  </div>
                )}

              {/* -------------------------------------------------------
                  Table
              ------------------------------------------------------- */}

              {!loading &&
                filteredBookings.length > 0 && (
                  <div className="w-full overflow-x-auto">

                    <table className="w-full min-w-[850px] sm:min-w-[900px]">

                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Customer
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Package
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Travellers
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Travel Date
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Status
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Submitted
                          </th>

                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">

                        {filteredBookings.map(
                          (booking) => (
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
                                hover:bg-blue-50/50
                              "
                            >

                              {/* Customer */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <div className="text-xs font-medium text-gray-900 sm:text-sm">
                                  {booking.name}
                                </div>

                                <div className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs">
                                  {booking.email}
                                </div>

                              </td>

                              {/* Package */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <p className="max-w-[180px] truncate text-xs font-medium text-gray-800 sm:max-w-[220px] sm:text-sm">
                                  {booking.packageTitle}
                                </p>

                              </td>

                              {/* Travellers */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <div className="flex items-center gap-1.5 text-xs text-gray-600 sm:gap-2 sm:text-sm">

                                  <Users
                                    size={14}
                                    className="sm:h-4 sm:w-4"
                                  />

                                  {booking.travellers}

                                </div>

                              </td>

                              {/* Travel Date */}

                              <td className="px-3 py-3 text-xs text-gray-600 sm:px-6 sm:py-5 sm:text-sm">
                                {formatDate(
                                  booking.travelDate
                                )}
                              </td>

                              {/* Status */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <span
                                  className={`
                                    inline-flex
                                    rounded-full
                                    px-2
                                    py-0.5
                                    text-[10px]
                                    font-semibold
                                    capitalize
                                    sm:px-3
                                    sm:py-1
                                    sm:text-xs
                                    ${getStatusClass(
                                      booking.status
                                    )}
                                  `}
                                >
                                  {booking.status}
                                </span>

                              </td>

                              {/* Submitted */}

                              <td className="px-3 py-3 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                                {formatDate(
                                  booking.createdAt
                                )}
                              </td>

                            </tr>
                          )
                        )}

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
                  <div
                    className="
                      flex
                      flex-col
                      gap-2
                      border-t
                      border-gray-100
                      px-3
                      py-3
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:px-6
                      sm:py-4
                    "
                  >

                    <p className="text-[11px] text-gray-500 sm:text-sm">
                      Page{" "}
                      <span className="font-medium text-gray-800">
                        {pagination.currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-800">
                        {pagination.totalPages}
                      </span>
                    </p>

                    <div className="flex items-center gap-1.5 sm:gap-2">

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
                          h-8
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-2.5
                          text-[11px]
                          font-medium
                          text-gray-700
                          transition
                          hover:border-blue-400
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          sm:h-9
                          sm:px-3
                          sm:text-sm
                        "
                      >

                        <ChevronLeft
                          size={14}
                          className="sm:h-4 sm:w-4"
                        />

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
                          h-8
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-2.5
                          text-[11px]
                          font-medium
                          text-gray-700
                          transition
                          hover:border-blue-400
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          sm:h-9
                          sm:px-3
                          sm:text-sm
                        "
                      >

                        Next

                        <ChevronRight
                          size={14}
                          className="sm:h-4 sm:w-4"
                        />

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
                  p-3
                  backdrop-blur-sm
                  sm:p-4
                "
                onClick={() =>
                  setSelectedBooking(null)
                }
              >

                <div
                  className="
                    max-h-[92vh]
                    w-full
                    max-w-2xl
                    overflow-y-auto
                    rounded-xl
                    bg-white
                    shadow-2xl
                    sm:rounded-2xl
                  "
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  {/* Modal Header */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-gray-100
                      px-4
                      py-3.5
                      sm:px-6
                      sm:py-5
                    "
                  >

                    <div className="min-w-0 pr-3">

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                        Booking Enquiry
                      </p>

                      <h2 className="mt-0.5 truncate text-base font-bold text-gray-900 sm:mt-1 sm:text-xl">
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
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-gray-500
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        sm:h-9
                        sm:w-9
                      "
                    >
                      <span className="text-lg sm:text-xl">
                        ×
                      </span>
                    </button>

                  </div>

                  {/* Details */}

                  <div className="space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">

                    {/* Customer */}

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs">
                        Customer
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-gray-900 sm:mt-1 sm:text-base">
                        {selectedBooking.name}
                      </p>

                    </div>

                    {/* Contact */}

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">

                      <div className="flex items-center gap-2.5 sm:gap-3">

                        <Mail
                          size={16}
                          className="shrink-0 text-blue-500 sm:h-[18px] sm:w-[18px]"
                        />

                        <div className="min-w-0">

                          <p className="text-[10px] text-gray-400 sm:text-xs">
                            Email
                          </p>

                          <p className="truncate text-xs text-gray-700 sm:text-sm">
                            {selectedBooking.email}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">

                        <Phone
                          size={16}
                          className="shrink-0 text-blue-500 sm:h-[18px] sm:w-[18px]"
                        />

                        <div>

                          <p className="text-[10px] text-gray-400 sm:text-xs">
                            Phone
                          </p>

                          <p className="text-xs text-gray-700 sm:text-sm">
                            {selectedBooking.phone}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Trip Details */}

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">

                      <div>

                        <p className="text-[10px] text-gray-400 sm:text-xs">
                          Travellers
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-gray-800 sm:mt-1 sm:text-sm">
                          {selectedBooking.travellers}
                        </p>

                      </div>

                      <div>

                        <p className="text-[10px] text-gray-400 sm:text-xs">
                          Preferred Travel Date
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-gray-800 sm:mt-1 sm:text-sm">
                          {formatDate(
                            selectedBooking.travelDate
                          )}
                        </p>

                      </div>

                    </div>

                    {/* Status */}

                    <div>

                      <p className="text-[10px] text-gray-400 sm:text-xs">
                        Status
                      </p>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:mt-2 sm:gap-3">

                        <select
                          value={
                            selectedBooking.status
                          }
                          onChange={(e) =>
                            handleStatusUpdate(
                              e.target
                                .value as Booking["status"]
                            )
                          }
                          disabled={updatingStatus}
                          className="
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            capitalize
                            text-gray-700
                            outline-none
                            transition
                            focus:border-blue-400
                            focus:ring-2
                            focus:ring-blue-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:rounded-xl
                            sm:px-4
                            sm:py-2
                            sm:text-sm
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
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">

                            <Loader2
                              size={14}
                              className="animate-spin sm:h-4 sm:w-4"
                            />

                            Updating...

                          </div>
                        )}

                      </div>

                    </div>

                    {/* Message */}

                    <div>

                      <p className="text-[10px] text-gray-400 sm:text-xs">
                        Message
                      </p>

                      <div className="mt-1.5 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-600 sm:mt-2 sm:rounded-xl sm:p-4 sm:text-sm sm:leading-6">
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