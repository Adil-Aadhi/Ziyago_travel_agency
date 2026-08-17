"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

type BookingEnquiryModalProps = {
  packageId: string;
  packageTitle: string;
  onClose: () => void;
};

export default function BookingEnquiryModal({
  packageId,
  packageTitle,
  onClose,
}: BookingEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travellers: "1",
    travelDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch(
            "/api/public/bookings",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                packageId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                travellers: Number(
                    formData.travellers
                ),
                travelDate:
                    formData.travelDate || null,
                message: formData.message,
                }),
            }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                "Failed to submit booking request"
            );
            }

            toast.success(
            "Booking request submitted successfully!"
            );

            setFormData({
            name: "",
            email: "",
            phone: "",
            travellers: "1",
            travelDate: "",
            message: "",
            });

            onClose();

        } catch (error) {
            console.error(
            "BOOKING SUBMIT ERROR:",
            error
            );

            toast.error(
            error instanceof Error
                ? error.message
                : "Failed to submit booking request"
            );
        } finally {
            setLoading(false);
        }
        };

  return (
    <div
  className="
    fixed
    inset-0
    z-[100]
    flex
    items-center
    justify-center
    bg-black/50
    p-2
    backdrop-blur-sm
    sm:p-4
  "
  onClick={onClose}
>
  <div
    className="
      relative
      max-h-[95vh]
      w-full
      max-w-2xl
      overflow-y-auto
      rounded-xl
      bg-white
      shadow-2xl
      sm:max-h-[90vh]
      sm:rounded-2xl
    "
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}

    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-800 sm:text-xs sm:tracking-[0.15em]">
          Booking Enquiry
        </p>

        <h2 className="mt-0.5 text-xl font-bold text-gray-900 sm:mt-1 sm:text-2xl">
          Request to Book
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="
          flex
          h-8
          w-8
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
        aria-label="Close"
      >
        <X size={18} className="sm:h-5 sm:w-5" />
      </button>
    </div>

    {/* Form */}

    <form
      onSubmit={handleSubmit}
      className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-6"
    >
      {/* Package */}

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
          Package
        </label>

        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-800 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
          {packageTitle}
        </div>
      </div>

      {/* Name + Email */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
        <div>
          <label
            htmlFor="booking-name"
            className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm"
          >
            Full Name *
          </label>

          <input
            id="booking-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-3
              py-2.5
              text-xs
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              sm:rounded-xl
              sm:px-4
              sm:py-3
              sm:text-sm
            "
          />
        </div>

        <div>
          <label
            htmlFor="booking-email"
            className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm"
          >
            Email Address *
          </label>

          <input
            id="booking-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-3
              py-2.5
              text-xs
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              sm:rounded-xl
              sm:px-4
              sm:py-3
              sm:text-sm
            "
          />
        </div>
      </div>

      {/* Phone + Travellers */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
        <div>
          <label
            htmlFor="booking-phone"
            className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm"
          >
            Phone Number *
          </label>

          <input
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              setFormData((prev) => ({
                ...prev,
                phone: value,
              }));
            }}
            required
            placeholder="Enter your phone"
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-3
              py-2.5
              text-xs
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              sm:rounded-xl
              sm:px-4
              sm:py-3
              sm:text-sm
            "
          />
        </div>

        <div>
          <label
            htmlFor="booking-travellers"
            className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm"
          >
            Number of Travellers *
          </label>

          <input
            id="booking-travellers"
            name="travellers"
            type="number"
            min="1"
            value={formData.travellers}
            onChange={handleChange}
            required
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-3
              py-2.5
              text-xs
              text-gray-900
              outline-none
              transition
              focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              sm:rounded-xl
              sm:px-4
              sm:py-3
              sm:text-sm
            "
          />
        </div>
      </div>

      {/* Travel Date */}

      <div>
        <label
          htmlFor="booking-date"
          className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm"
        >
          Preferred Travel Date
        </label>

        <input
          id="booking-date"
          name="travelDate"
          type="date"
          value={formData.travelDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="
            w-full
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            py-2.5
            text-xs
            text-gray-900
            outline-none
            transition
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-100
            sm:rounded-xl
            sm:px-4
            sm:py-3
            sm:text-sm
          "
        />
      </div>

      {/* Message */}

      <div>
        <label
          htmlFor="booking-message"
          className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm"
        >
          Message
        </label>

        <textarea
          id="booking-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about your travel plans..."
          className="
            w-full
            resize-none
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            py-2.5
            text-xs
            text-gray-900
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-100
            sm:rounded-xl
            sm:px-4
            sm:py-3
            sm:text-sm
          "
        />
      </div>

      {/* Actions */}

      <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 sm:gap-3 sm:pt-5">

        <button
          type="button"
          onClick={onClose}
          className="
            rounded-lg
            border
            border-gray-200
            px-4
            py-2.5
            text-xs
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
            hover:cursor-pointer
            sm:rounded-xl
            sm:px-5
            sm:py-3
            sm:text-sm
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-lg
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition
            hover:from-cyan-600
            hover:to-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-60
            hover:cursor-pointer
            sm:rounded-xl
            sm:px-6
            sm:py-3
            sm:text-sm
          "
        >
          {loading ? "Sending..." : "Send Booking Request"}
        </button>

      </div>
    </form>
  </div>
</div>
  );
}