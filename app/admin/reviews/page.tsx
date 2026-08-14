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
        return "bg-orange-50 text-orange-600";

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

        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        <div className="flex min-w-0 flex-1 flex-col">

          <AdminHeader
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="flex-1 p-5 md:p-8">

            {/* Header */}

            <div className="mb-6">

              <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
                Customer Feedback
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Reviews
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review and manage customer feedback.
              </p>

            </div>

            {/* Filters */}

            <div className="mb-5 flex flex-wrap gap-2">

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
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                      statusFilter === value
                        ? "bg-orange-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500"
                    }
                  `}
                >
                  {label}
                </button>
              ))}

            </div>

            {/* Content */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {loading && (
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Loader2
                      size={22}
                      className="animate-spin"
                    />
                    Loading reviews...
                  </div>
                </div>
              )}

              {!loading &&
                filteredReviews.length === 0 && (
                  <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                    <MessageSquare
                      size={42}
                      className="text-gray-300"
                    />

                    <h2 className="mt-4 text-lg font-semibold text-gray-800">
                      No reviews found
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      There are no reviews for this filter.
                    </p>
                  </div>
                )}

              {!loading &&
                filteredReviews.length > 0 && (
                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Customer
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Rating
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Review
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Status
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Date
                          </th>

                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
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
                              className="cursor-pointer transition hover:bg-orange-50/40"
                            >

                              {/* Customer */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 font-semibold text-orange-500">
                                    {review.name
                                      .charAt(0)
                                      .toUpperCase()}
                                  </div>

                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {review.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                      {review.location}
                                    </p>
                                  </div>

                                </div>

                              </td>

                              {/* Rating */}

                              <td className="px-6 py-5">

                                <div className="flex gap-0.5 text-sm">
                                  {"★".repeat(
                                    review.rating
                                  )}
                                </div>

                              </td>

                              {/* Review */}

                              <td className="max-w-[300px] px-6 py-5">

                                <p className="truncate text-sm text-gray-600">
                                  {review.review}
                                </p>

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
                                      review.status
                                    )}
                                  `}
                                >
                                  {review.status}
                                </span>

                              </td>

                              {/* Date */}

                              <td className="px-6 py-5 text-sm text-gray-500">
                                {formatDate(
                                  review.createdAt
                                )}
                              </td>

                              {/* Action */}

                              <td
                                className="px-6 py-5"
                                onClick={(e) =>
                                  e.stopPropagation()
                                }
                              >

                                {review.status ===
                                  "pending" ? (
                                  <div className="flex justify-end gap-2">

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
                                      className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-100 disabled:opacity-50"
                                    >
                                      <Check
                                        size={14}
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
                                      className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                    >
                                      <X
                                        size={14}
                                      />
                                      Reject
                                    </button>

                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400">
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

              {/* Pagination */}

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

                    <div className="flex gap-2">

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
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft
                          size={16}
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
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                        <ChevronRight
                          size={16}
                        />
                      </button>

                    </div>

                  </div>
                )}

            </div>

          </main>
        </div>
      </div>

      {/* Review Details Modal */}

      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedReview(null)
          }
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Customer Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedReview.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedReview(null)
                }
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedReview.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Rating
                </p>

                <p className="mt-1 text-lg">
                  {"★".repeat(
                    selectedReview.rating
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Review
                </p>

                <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                  {selectedReview.review}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Status
                </p>

                <span
                  className={`
                    mt-2
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    capitalize
                    ${getStatusClass(
                      selectedReview.status
                    )}
                  `}
                >
                  {selectedReview.status}
                </span>
              </div>

              <div className="pt-2">

  <p className="mb-3 text-xs text-gray-400">
    Change Status
  </p>

  <div className="grid grid-cols-3 gap-2">

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
        rounded-xl
        border
        px-3
        py-2.5
        text-sm
        font-semibold
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${
          selectedReview.status ===
          "pending"
            ? "border-orange-500 bg-orange-50 text-orange-600"
            : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500"
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
        rounded-xl
        border
        px-3
        py-2.5
        text-sm
        font-semibold
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
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
        rounded-xl
        border
        px-3
        py-2.5
        text-sm
        font-semibold
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
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

  {updatingId === selectedReview._id && (
    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
      <Loader2
        size={14}
        className="animate-spin"
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