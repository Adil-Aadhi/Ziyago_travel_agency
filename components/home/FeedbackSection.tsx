"use client";

import { useState } from "react";
import { Star, X, Send } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    name: "Rahul Menon",
    location: "Kerala, India",
    rating: 5,
    review:
      "Amazing experience from start to finish. Everything was perfectly organized and the team was very helpful throughout the trip.",
    date: "July 2026",
  },
  {
    id: 2,
    name: "Anjali Nair",
    location: "Kochi, India",
    rating: 5,
    review:
      "We had a wonderful family trip. The hotel, transportation and sightseeing arrangements were excellent. Highly recommended!",
    date: "June 2026",
  },
  {
    id: 3,
    name: "Arjun Thomas",
    location: "Bangalore, India",
    rating: 4,
    review:
      "Great service and a very smooth travel experience. The team was responsive and helped us whenever we needed assistance.",
    date: "May 2026",
  },
];

export default function FeedbackSection() {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend-only for now
    const newReview: Review = {
      id: reviews.length + 1,
      name,
      location,
      rating,
      review,
      date: "Just now",
    };

    setReviews((prev) => [newReview, ...prev]);

    setName("");
    setLocation("");
    setRating(5);
    setReview("");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Feedback Section */}
      <section data-navbar-theme="light" className="bg-gradient-to-b from-[#cfeef8] to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Guest Experiences
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Travelers Say
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Every journey is special to us. Here is what some of our
              travelers have to say about their experience with us.
            </p>
          </div>

          {/* Reviews */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                      {item.name.charAt(0)}
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
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-gray-500">
              Have you travelled with us?
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Make a Review
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close review form"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Share Your Experience
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tell us about your journey. Your feedback helps us improve
                and helps other travelers plan their trips.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kerala, India"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Rating
                </label>

                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const starValue = index + 1;

                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        className="transition hover:scale-110"
                        aria-label={`Rate ${starValue} stars`}
                      >
                        <Star
                          size={28}
                          className={
                            starValue <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    );
                  })}

                  <span className="ml-2 text-sm text-gray-500">
                    {rating}/5
                  </span>
                </div>
              </div>

              {/* Review */}
              <div>
                <label
                  htmlFor="review"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your Review
                </label>

                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about your travel experience..."
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Send size={17} />
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}