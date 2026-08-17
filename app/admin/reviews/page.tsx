"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
  X,
} from "lucide-react";
import { toast } from "sonner";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type ReviewStatus =
  | "pending"
  | "approved"
  | "rejected";

type Review = {
  _id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  status: ReviewStatus;
  createdAt: string;
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

export default function ReviewsPage() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [reviews, setReviews] = useState<
    Review[]
  >([]);

  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [statusFilter, setStatusFilter] =
    useState<"all" | ReviewStatus>("all");

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [selectedReview, setSelectedReview] =
    useState<Review | null>(null);

  /* -------------------------------------------------------
     Fetch reviews
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/admin/reviews?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch reviews"
          );
        }

        setReviews(data.reviews || []);
        setPagination(data.pagination || null);
      } catch (error) {
        console.error(
          "FETCH REVIEWS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  /* -------------------------------------------------------
     Update status
  ------------------------------------------------------- */

  const updateReviewStatus = async (
    reviewId: string,
    status: ReviewStatus
  ) => {
    try {
      setUpdatingId(reviewId);

      const response = await fetch(
        `/api/admin/reviews/${reviewId}`,
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
            "Failed to update review status"
        );
      }

      setReviews((prev) =>
        prev.map((item) =>
          item._id === reviewId
            ? data.review
            : item
        )
      );

      if (
        selectedReview?._id === reviewId
      ) {
        setSelectedReview(data.review);
      }

      toast.success(
        `Review ${status} successfully`
      );
    } catch (error) {
      console.error(
        "UPDATE REVIEW STATUS ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update review"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* -------------------------------------------------------
     Filter
  ------------------------------------------------------- */

  const filteredReviews =
    reviews.filter((review) => {
      if (statusFilter === "all") {
        return true;
      }

      return review.status === statusFilter;
    });

  /* -------------------------------------------------------
     Helpers
  ------------------------------------------------------- */

  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (
    status: ReviewStatus
  ) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-600";

      case "approved":
        return "bg-green-50 text-green-600";

      case "rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafb]">

      <div className="flex min-h-screen">

        {/* Sidebar */}

        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
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

            <div className="mb-5 sm:mb-6">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                Customer Feedback
              </p>

              <h1 className="mt-0.5 text-2xl font-bold text-gray-900 sm:mt-1 sm:text-3xl">
                Reviews
              </h1>

              <p className="mt-0.5 text-[11px] leading-5 text-gray-500 sm:mt-1 sm:text-sm">
                Review and manage customer feedback.
              </p>

            </div>

            {/* -------------------------------------------------------
                Filters
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

              {(
                [
                  ["all", "All"],
                  ["pending", "Pending"],
                  ["approved", "Approved"],
                  ["rejected", "Rejected"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setStatusFilter(value)
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
                      statusFilter === value
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                    }
                  `}
                >
                  {label}
                </button>
              ))}

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

                  <div className="flex items-center gap-2 text-xs text-gray-500 sm:gap-3 sm:text-sm">

                    <Loader2
                      size={18}
                      className="animate-spin sm:h-[22px] sm:w-[22px]"
                    />

                    Loading reviews...

                  </div>

                </div>
              )}

              {/* Empty */}

              {!loading &&
                filteredReviews.length === 0 && (
                  <div
                    className="
                      flex
                      min-h-[250px]
                      flex-col
                      items-center
                      justify-center
                      px-4
                      text-center
                      sm:min-h-[400px]
                    "
                  >

                    <MessageSquare
                      size={34}
                      className="text-gray-300 sm:h-[42px] sm:w-[42px]"
                    />

                    <h2 className="mt-3 text-sm font-semibold text-gray-800 sm:mt-4 sm:text-lg">
                      No reviews found
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      There are no reviews for this filter.
                    </p>

                  </div>
                )}

              {/* -------------------------------------------------------
                  Table
              ------------------------------------------------------- */}

              {!loading &&
                filteredReviews.length > 0 && (
                  <div className="w-full overflow-x-auto">

                    <table className="w-full min-w-[780px] sm:min-w-[900px]">

                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Customer
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Rating
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Review
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Status
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Date
                          </th>

                          <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Action
                          </th>

                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">

                        {filteredReviews.map(
                          (review) => (
                            <tr
                              key={review._id}
                              onClick={() =>
                                setSelectedReview(
                                  review
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

                                <div className="flex items-center gap-2 sm:gap-3">

                                  <div
                                    className="
                                      flex
                                      h-8
                                      w-8
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-full
                                      bg-gradient-to-br
                                      from-cyan-400
                                      to-blue-600
                                      text-xs
                                      font-semibold
                                      text-white
                                      shadow-sm
                                      sm:h-10
                                      sm:w-10
                                      sm:text-sm
                                    "
                                  >
                                    {review.name
                                      .charAt(0)
                                      .toUpperCase()}
                                  </div>

                                  <div className="min-w-0">

                                    <p className="truncate text-xs font-medium text-gray-900 sm:text-sm">
                                      {review.name}
                                    </p>

                                    <p className="truncate text-[10px] text-gray-500 sm:text-xs">
                                      {review.location}
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* Rating */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <div className="flex gap-0.5 text-xs text-yellow-400 sm:text-sm">
                                  {"★".repeat(
                                    review.rating
                                  )}
                                </div>

                              </td>

                              {/* Review */}

                              <td className="max-w-[220px] px-3 py-3 sm:max-w-[300px] sm:px-6 sm:py-5">

                                <p className="truncate text-xs text-gray-600 sm:text-sm">
                                  {review.review}
                                </p>

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
                                      review.status
                                    )}
                                  `}
                                >
                                  {review.status}
                                </span>

                              </td>

                              {/* Date */}

                              <td className="px-3 py-3 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
                                {formatDate(
                                  review.createdAt
                                )}
                              </td>

                              {/* Action */}

                              <td
                                className="px-3 py-3 sm:px-6 sm:py-5"
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                              >

                                {review.status ===
                                "pending" ? (
                                  <div className="flex justify-end gap-1.5 sm:gap-2">

                                    <button
                                      type="button"
                                      disabled={
                                        updatingId ===
                                        review._id
                                      }
                                      onClick={() =>
                                        updateReviewStatus(
                                          review._id,
                                          "approved"
                                        )
                                      }
                                      className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-green-50
                                        px-2
                                        py-1.5
                                        text-[10px]
                                        font-semibold
                                        text-green-600
                                        transition
                                        hover:bg-green-100
                                        disabled:opacity-50
                                        sm:gap-1.5
                                        sm:px-3
                                        sm:py-2
                                        sm:text-xs
                                      "
                                    >
                                      <Check
                                        size={12}
                                        className="sm:h-[14px] sm:w-[14px]"
                                      />
                                      Approve
                                    </button>

                                    <button
                                      type="button"
                                      disabled={
                                        updatingId ===
                                        review._id
                                      }
                                      onClick={() =>
                                        updateReviewStatus(
                                          review._id,
                                          "rejected"
                                        )
                                      }
                                      className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-red-50
                                        px-2
                                        py-1.5
                                        text-[10px]
                                        font-semibold
                                        text-red-600
                                        transition
                                        hover:bg-red-100
                                        disabled:opacity-50
                                        sm:gap-1.5
                                        sm:px-3
                                        sm:py-2
                                        sm:text-xs
                                      "
                                    >
                                      <X
                                        size={12}
                                        className="sm:h-[14px] sm:w-[14px]"
                                      />
                                      Reject
                                    </button>

                                  </div>
                                ) : (
                                  <span className="text-[10px] text-gray-400 sm:text-xs">
                                    —
                                  </span>
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

                    <div className="flex gap-1.5 sm:gap-2">

                      <button
                        type="button"
                        disabled={
                          !pagination.hasPreviousPage
                        }
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              Math.max(
                                page - 1,
                                1
                              )
                          )
                        }
                        className="
                          flex
                          h-8
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          px-2.5
                          py-1.5
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
                          sm:py-2
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
                        disabled={
                          !pagination.hasNextPage
                        }
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              page + 1
                          )
                        }
                        className="
                          flex
                          h-8
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          px-2.5
                          py-1.5
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
                          sm:py-2
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

          </main>

        </div>
      </div>

      {/* -------------------------------------------------------
          Review Details Modal
      ------------------------------------------------------- */}

      {selectedReview && (
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
            setSelectedReview(null)
          }
        >

          <div
            className="
              max-h-[92vh]
              w-full
              max-w-lg
              overflow-y-auto
              rounded-xl
              bg-white
              p-4
              shadow-2xl
              sm:rounded-2xl
              sm:p-6
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="flex items-start justify-between">

              <div className="min-w-0 pr-3">

                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                  Customer Review
                </p>

                <h2 className="mt-0.5 truncate text-base font-bold text-gray-900 sm:mt-1 sm:text-xl">
                  {selectedReview.name}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedReview(null)
                }
                className="
                  shrink-0
                  rounded-lg
                  p-1.5
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  sm:p-2
                "
              >
                <X
                  size={16}
                  className="sm:h-[18px] sm:w-[18px]"
                />
              </button>

            </div>

            {/* Modal Details */}

            <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">

              {/* Location */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Location
                </p>

                <p className="mt-0.5 text-xs text-gray-700 sm:mt-1 sm:text-sm">
                  {selectedReview.location}
                </p>

              </div>

              {/* Rating */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Rating
                </p>

                <p className="mt-0.5 text-base text-yellow-400 sm:mt-1 sm:text-lg">
                  {"★".repeat(
                    selectedReview.rating
                  )}
                </p>

              </div>

              {/* Review */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Review
                </p>

                <div className="mt-1.5 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-600 sm:mt-2 sm:rounded-xl sm:p-4 sm:text-sm sm:leading-6">
                  {selectedReview.review}
                </div>

              </div>

              {/* Status */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Status
                </p>

                <span
                  className={`
                    mt-1.5
                    inline-flex
                    rounded-full
                    px-2
                    py-0.5
                    text-[10px]
                    font-semibold
                    capitalize
                    sm:mt-2
                    sm:px-3
                    sm:py-1
                    sm:text-xs
                    ${getStatusClass(
                      selectedReview.status
                    )}
                  `}
                >
                  {selectedReview.status}
                </span>

              </div>

              {/* Change Status */}

              <div className="pt-1 sm:pt-2">

                <p className="mb-2 text-[10px] text-gray-400 sm:mb-3 sm:text-xs">
                  Change Status
                </p>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">

                  {/* Pending */}

                  <button
                    type="button"
                    disabled={
                      updatingId ===
                      selectedReview._id
                    }
                    onClick={() =>
                      updateReviewStatus(
                        selectedReview._id,
                        "pending"
                      )
                    }
                    className={`
                      rounded-lg
                      border
                      px-2
                      py-2
                      text-[10px]
                      font-semibold
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:rounded-xl
                      sm:px-3
                      sm:py-2.5
                      sm:text-sm
                      ${
                        selectedReview.status ===
                        "pending"
                          ? "border-blue-500 bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-600"
                          : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-500"
                      }
                    `}
                  >
                    Pending
                  </button>

                  {/* Approved */}

                  <button
                    type="button"
                    disabled={
                      updatingId ===
                      selectedReview._id
                    }
                    onClick={() =>
                      updateReviewStatus(
                        selectedReview._id,
                        "approved"
                      )
                    }
                    className={`
                      rounded-lg
                      border
                      px-2
                      py-2
                      text-[10px]
                      font-semibold
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:rounded-xl
                      sm:px-3
                      sm:py-2.5
                      sm:text-sm
                      ${
                        selectedReview.status ===
                        "approved"
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-500"
                      }
                    `}
                  >
                    Approved
                  </button>

                  {/* Rejected */}

                  <button
                    type="button"
                    disabled={
                      updatingId ===
                      selectedReview._id
                    }
                    onClick={() =>
                      updateReviewStatus(
                        selectedReview._id,
                        "rejected"
                      )
                    }
                    className={`
                      rounded-lg
                      border
                      px-2
                      py-2
                      text-[10px]
                      font-semibold
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:rounded-xl
                      sm:px-3
                      sm:py-2.5
                      sm:text-sm
                      ${
                        selectedReview.status ===
                        "rejected"
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:text-red-500"
                      }
                    `}
                  >
                    Rejected
                  </button>

                </div>

                {updatingId ===
                  selectedReview._id && (
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-500 sm:mt-3 sm:gap-2 sm:text-xs">

                    <Loader2
                      size={13}
                      className="animate-spin sm:h-[14px] sm:w-[14px]"
                    />

                    Updating status...

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}