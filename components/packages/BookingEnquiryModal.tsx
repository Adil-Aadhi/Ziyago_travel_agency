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
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-500">
              Booking Enquiry
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Request to Book
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
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
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-6"
        >
          {/* Package */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Package
            </label>

            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
              {packageTitle}
            </div>
          </div>

          {/* Name + Email */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-name"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-100
                "
              />
            </div>

            <div>
              <label
                htmlFor="booking-email"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-100
                "
              />
            </div>
          </div>

          {/* Phone + Travellers */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-phone"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-orange-400
                    focus:ring-2
                    focus:ring-orange-100
                "
                />
            </div>

            <div>
              <label
                htmlFor="booking-travellers"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-100
                "
              />
            </div>
          </div>

          {/* Travel Date */}

          <div>
            <label
              htmlFor="booking-date"
              className="mb-2 block text-sm font-medium text-gray-700"
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
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-900
                outline-none
                transition
                focus:border-orange-400
                focus:ring-2
                focus:ring-orange-100
              "
            />
          </div>

          {/* Message */}

          <div>
            <label
              htmlFor="booking-message"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Message
            </label>

            <textarea
              id="booking-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your travel plans..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-orange-400
                focus:ring-2
                focus:ring-orange-100
              "
            />
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-200
                px-5
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              Cancel
            </button>

           <button
                type="submit"
                disabled={loading}
                className="
                    rounded-xl
                    bg-orange-500
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-orange-600
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
                >
                {loading
                    ? "Sending..."
                    : "Send Booking Request"}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
}