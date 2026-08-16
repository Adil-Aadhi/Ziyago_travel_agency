"use client";

import { useEffect, useState } from "react";
import { Star, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Review {
  _id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function FeedbackSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] =
    useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  /* -------------------------------------------------------
     Fetch approved reviews
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/public/review",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch reviews"
          );
        }

        setReviews(data.reviews || []);
      } catch (error) {
        console.error(
          "FETCH REVIEWS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  /* -------------------------------------------------------
     Submit review
  ------------------------------------------------------- */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/public/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            location,
            rating,
            review,
          }),
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to submit review"
        );
      }

      toast.success(
        "Review submitted successfully"
      );

      toast.info(
        "Your review will appear after approval."
      );

      /* Reset form */

      setName("");
      setLocation("");
      setRating(5);
      setReview("");

      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "SUBMIT REVIEW ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------------------------------------------
     Format date
  ------------------------------------------------------- */

  const formatDate = (
    date: string
  ) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <>
      {/* Feedback Section */}

      <section
        data-navbar-theme="light"
        className="bg-gradient-to-b from-[#cfeef8] to-white py-12 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header */}

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Guest Experiences
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Travelers Say
            </h2>

            <p className="mt-4 text-sm md:text-base  leading-7 text-gray-600">
              Every journey is special to us. Here is what some of our
              travelers have to say about their experience with us.
            </p>

          </div>

          {/* Reviews */}

          <div className="grid gap-6 md:grid-cols-3">

            {loading ? (

              <div className="col-span-full flex min-h-[220px] items-center justify-center">
                <Loader2
                  size={28}
                  className="animate-spin text-blue-600"
                />
              </div>

            ) : reviews.length === 0 ? (

              <div className="col-span-full flex min-h-[220px] items-center justify-center">
                <p className="px-4 text-center text-sm text-gray-500">
                  No reviews yet. Be the first to share
                  your experience!
                </p>
              </div>

            ) : (

              <>
                {/* ================= DESKTOP / TABLET ================= */}
                <div className="col-span-full hidden md:grid md:grid-cols-3 md:gap-6">

                  {reviews.slice(0, 3).map((item) => (
                    <div
                      key={item._id}
                      className="
                        flex h-full flex-col
                        rounded-2xl
                        border border-gray-100
                        bg-gray-50
                        p-6
                        shadow-sm
                        transition duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                      "
                    >

                      {/* Stars */}
                      <div className="mb-5 flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={18}
                            className={
                              index < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      {/* Review */}
                      <p className="flex-1 text-sm leading-7 text-gray-600">
                        "{item.review}"
                      </p>

                      {/* User */}
                      <div className="mt-6 border-t border-gray-200 pt-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            {item.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {item.name}
                            </h3>

                            <p className="text-xs text-gray-500">
                              {item.location}
                            </p>
                          </div>

                        </div>

                        <p className="mt-3 text-xs text-gray-400">
                          {formatDate(item.createdAt)}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>


                {/* ================= MOBILE ================= */}
                <div className="col-span-full overflow-hidden md:hidden">

                  <div className="review-marquee flex w-max">

                    {/* First set */}
                    {reviews.slice(0, 3).map((item) => (
                      <div
                        key={`first-${item._id}`}
                        className="
                          flex
                          w-[84vw]
                          max-w-[340px]
                          shrink-0
                          flex-col
                          rounded-2xl
                          border
                          border-gray-100
                          bg-gray-50
                          p-5
                          shadow-md
                        "
                      >

                        {/* Stars */}
                        <div className="mb-4 flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={15}
                              className={
                                index < item.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>

                        {/* Review */}
                        <p className="flex-1 text-xs leading-6 text-gray-600">
                          "{item.review}"
                        </p>

                        {/* User */}
                        <div className="mt-5 border-t border-gray-200 pt-4">

                          <div className="flex items-center gap-2.5">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                              {item.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-xs font-semibold text-gray-900">
                                {item.name}
                              </h3>

                              <p className="truncate text-[10px] text-gray-500">
                                {item.location}
                              </p>
                            </div>

                          </div>

                          <p className="mt-2.5 text-[10px] text-gray-400">
                            {formatDate(item.createdAt)}
                          </p>

                        </div>

                      </div>
                    ))}


                    {/* Duplicate set → infinite loop */}
                    {reviews.slice(0, 3).map((item) => (
                      <div
                        key={`second-${item._id}`}
                        className="
                          flex
                          w-[84vw]
                          max-w-[340px]
                          shrink-0
                          flex-col
                          rounded-2xl
                          border
                          border-gray-100
                          bg-gray-50
                          p-5
                          shadow-md
                        "
                      >

                        {/* Stars */}
                        <div className="mb-4 flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={15}
                              className={
                                index < item.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>

                        {/* Review */}
                        <p className="flex-1 text-xs leading-6 text-gray-600">
                          "{item.review}"
                        </p>

                        {/* User */}
                        <div className="mt-5 border-t border-gray-200 pt-4">

                          <div className="flex items-center gap-2.5">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                              {item.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-xs font-semibold text-gray-900">
                                {item.name}
                              </h3>

                              <p className="truncate text-[10px] text-gray-500">
                                {item.location}
                              </p>
                            </div>

                          </div>

                          <p className="mt-2.5 text-[10px] text-gray-400">
                            {formatDate(item.createdAt)}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              </>

            )}

          </div>

          {/* CTA */}

          <div className="mt-12 text-center">

            <p className="mb-4 text-sm text-gray-500">
              Have you travelled with us?
            </p>

            <button
              type="button"
              onClick={() =>
                setIsModalOpen(true)
              }
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Make a Review
            </button>

          </div>

        </div>
      </section>

      {/* Review Modal */}

    {isModalOpen && (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      px-3
      backdrop-blur-sm
      md:px-4
    "
    onClick={() => {
      if (!submitting) {
        setIsModalOpen(false);
      }
    }}
  >

    <div
      className="
        relative
        max-h-[92vh]
        w-full
        max-w-lg
        overflow-y-auto
        rounded-xl
        bg-white
        p-4
        shadow-2xl
        sm:p-6
        md:max-h-[90vh]
        md:rounded-2xl
        md:p-6
        lg:p-8
      "
      onClick={(e) => e.stopPropagation()}
    >

      {/* Close Button */}

      <button
        type="button"
        onClick={() => setIsModalOpen(false)}
        disabled={submitting}
        className="
          absolute
          right-3
          top-3
          rounded-full
          p-1.5
          text-gray-400
          transition
          hover:bg-gray-100
          hover:text-gray-700
          disabled:cursor-not-allowed
          disabled:opacity-50
          md:right-4
          md:top-4
          md:p-2
        "
        aria-label="Close review form"
      >
        <X
          size={17}
          className="md:h-5 md:w-5"
        />
      </button>


      {/* Modal Header */}

      <div className="mb-4 pr-7 md:mb-6 md:pr-8">

        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          Share Your Experience
        </h2>

        <p className="mt-1.5 text-xs leading-5 text-gray-500 md:mt-2 md:text-sm md:leading-6">
          Tell us about your journey. Your feedback helps us improve
          and helps other travelers plan their trips.
        </p>

      </div>


      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-3.5 md:space-y-5"
      >

        {/* Name */}

        <div>

          <label
            htmlFor="review-name"
            className="
              mb-1.5
              block
              text-xs
              font-medium
              text-gray-700
              md:mb-2
              md:text-sm
            "
          >
            Your Name
          </label>

          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            disabled={submitting}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              px-3
              py-2
              text-xs
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
              disabled:opacity-60
              md:rounded-xl
              md:px-4
              md:py-3
              md:text-sm
            "
          />

        </div>


        {/* Location */}

        <div>

          <label
            htmlFor="review-location"
            className="
              mb-1.5
              block
              text-xs
              font-medium
              text-gray-700
              md:mb-2
              md:text-sm
            "
          >
            Location
          </label>

          <input
            id="review-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Kerala, India"
            required
            disabled={submitting}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              px-3
              py-2
              text-xs
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
              disabled:opacity-60
              md:rounded-xl
              md:px-4
              md:py-3
              md:text-sm
            "
          />

        </div>


        {/* Rating */}

        <div>

          <label
            className="
              mb-1.5
              block
              text-xs
              font-medium
              text-gray-700
              md:mb-2
              md:text-sm
            "
          >
            Your Rating
          </label>

          <div className="flex items-center gap-1 md:gap-2">

            {Array.from({
              length: 5,
            }).map((_, index) => {

              const starValue = index + 1;

              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => setRating(starValue)}
                  disabled={submitting}
                  className="
                    transition
                    hover:scale-110
                    disabled:cursor-not-allowed
                  "
                  aria-label={`Rate ${starValue} stars`}
                >
                 <Star
                  size={22}
                  className={`md:h-7 md:w-7 ${
                    starValue <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
                </button>
              );

            })}

            <span className="ml-1.5 text-xs text-gray-500 md:ml-2 md:text-sm">
              {rating}/5
            </span>

          </div>

        </div>


        {/* Review */}

        <div>

          <label
            htmlFor="review-text"
            className="
              mb-1.5
              block
              text-xs
              font-medium
              text-gray-700
              md:mb-2
              md:text-sm
            "
          >
            Your Review
          </label>

          <textarea
            id="review-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your travel experience..."
            required
            disabled={submitting}
            rows={4}
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              px-3
              py-2
              text-xs
              leading-5
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
              disabled:opacity-60
              md:rounded-xl
              md:px-4
              md:py-3
              md:text-sm
              md:leading-normal
              md:rows-5
            "
          />

        </div>


        {/* Submit */}

        <button
          type="submit"
          disabled={submitting}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-1
            rounded-lg
            bg-blue-600
            px-3
            py-2
            text-[10px]
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-60
            md:gap-2
            md:rounded-xl
            md:px-5
            md:py-3.5
            md:text-sm
          "
        >

          {submitting ? (
            <>
              <Loader2
                size={13}
                className="animate-spin md:h-[17px] md:w-[17px]"
              />
              Submitting...
            </>
          ) : (
            <>
              <Send
                size={13}
                className="md:h-[17px] md:w-[17px]"
              />
              Submit Review
            </>
          )}

        </button>

      </form>

    </div>

  </div>
)}

    </>
  );
}