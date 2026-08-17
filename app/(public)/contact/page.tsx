"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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
        "/api/public/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to send your message"
        );
      }

      toast.success(
        "Your message has been sent successfully!"
      );

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "CONTACT FORM ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send your message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      data-navbar-theme="light"
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#cfeef8]
        via-[#e8f7fc]
        to-white
        pt-16
      "
    >
      {/* ================================
          HERO
      ================================= */}
      <section
        data-navbar-theme="light"
        className="px-3 pb-10 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-6 lg:pb-20 lg:pt-24"
      >
        <div className="mx-auto max-w-7xl text-center">

          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-500 sm:mb-2 sm:text-xs lg:mb-3 lg:text-sm lg:tracking-[0.2em]">
            Get In Touch
          </p>

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
            Let's Plan Your Journey
          </h1>

          <p className="mx-auto mt-2 max-w-[310px] text-[10px] leading-5 text-gray-600 sm:mt-3 sm:max-w-2xl sm:text-xs sm:leading-6 lg:mt-4 lg:text-base lg:leading-normal">
            Have a question about a package, need help
            planning your trip, or simply want to talk to us?
            We're here to help.
          </p>

        </div>
      </section>

      {/* ================================
          CONTACT SECTION
      ================================= */}
     <section className="px-3 pb-10 sm:px-6 sm:pb-14 lg:px-6 lg:pb-20">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">

          {/* ============================
              LEFT - CONTACT INFO
          ============================= */}
          <div
            className="
              rounded-2xl
              bg-white
              p-4
              shadow-sm
              sm:rounded-3xl
              sm:p-6
              md:p-8
              lg:p-10
            "
          >

            <p className="text-[9px] font-medium text-blue-500 sm:text-xs lg:text-sm">
              CONTACT US
            </p>

            <h2 className="mt-1 text-lg font-bold leading-tight text-gray-900 sm:mt-2 sm:text-2xl lg:text-3xl">
              We'd love to hear from you
            </h2>

            <p className="mt-2 text-[10px] leading-5 text-gray-500 sm:mt-3 sm:text-xs sm:leading-6 lg:mt-4 lg:text-base lg:leading-relaxed">
              Whether you're looking for your next adventure
              or need assistance with an existing booking,
              feel free to reach out.
            </p>

            {/* Contact details */}
            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5 lg:mt-8 lg:space-y-6">

              {/* Address */}
              <div className="flex gap-2.5 sm:gap-3 lg:gap-4">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500
                    sm:h-10
                    sm:w-10
                    sm:rounded-xl
                    lg:h-11
                    lg:w-11
                  "
                >
                  <MapPin
                    size={15}
                    className="sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-gray-900 sm:text-xs lg:text-sm">
                    Our Office
                  </p>

                  <p className="mt-0.5 text-[9px] leading-4 text-gray-500 sm:mt-1 sm:text-xs sm:leading-5 lg:text-sm lg:leading-relaxed">
                    123 Travel Street,
                    <br />
                    Kochi, Kerala, India
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex gap-2.5 sm:gap-3 lg:gap-4">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500
                    sm:h-10
                    sm:w-10
                    sm:rounded-xl
                    lg:h-11
                    lg:w-11
                  "
                >
                  <Phone
                    size={15}
                    className="sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-gray-900 sm:text-xs lg:text-sm">
                    Phone
                  </p>

                  <p className="mt-0.5 text-[9px] text-gray-500 sm:mt-1 sm:text-xs lg:text-sm">
                    +91 98765 43210
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex gap-2.5 sm:gap-3 lg:gap-4">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500
                    sm:h-10
                    sm:w-10
                    sm:rounded-xl
                    lg:h-11
                    lg:w-11
                  "
                >
                  <Mail
                    size={15}
                    className="sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-gray-900 sm:text-xs lg:text-sm">
                    Email
                  </p>

                  <p className="mt-0.5 break-all text-[9px] text-gray-500 sm:mt-1 sm:text-xs lg:text-sm">
                    hello@ziyaGo.com
                  </p>
                </div>

              </div>

              {/* Hours */}
              <div className="flex gap-2.5 sm:gap-3 lg:gap-4">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-500
                    sm:h-10
                    sm:w-10
                    sm:rounded-xl
                    lg:h-11
                    lg:w-11
                  "
                >
                  <Clock3
                    size={15}
                    className="sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-gray-900 sm:text-xs lg:text-sm">
                    Working Hours
                  </p>

                  <p className="mt-0.5 text-[9px] text-gray-500 sm:mt-1 sm:text-xs lg:text-sm">
                    Mon – Sat: 9:00 AM – 6:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* ============================
              RIGHT - CONTACT FORM
          ============================= */}
          <div
            className="
              rounded-2xl
              bg-white
              p-4
              shadow-sm
              sm:rounded-3xl
              sm:p-6
              md:p-8
              lg:p-10
            "
          >

            <p className="text-[9px] font-medium text-blue-500 sm:text-xs lg:text-sm">
              SEND A MESSAGE
            </p>

            <h2 className="mt-1 text-lg font-bold leading-tight text-gray-900 sm:mt-2 sm:text-2xl lg:text-3xl">
              Tell us how we can help
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4 lg:mt-8 lg:space-y-5"
            >

              {/* Name + Email */}
              <div className="grid gap-3 md:grid-cols-2 md:gap-5">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[10px] font-medium text-gray-700 sm:text-xs lg:mb-2 lg:text-sm"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
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
                      bg-gray-50
                      px-3
                      py-2
                      text-[10px]
                      outline-none
                      transition
                      focus:border-blue-900
                      focus:bg-white
                      sm:rounded-xl
                      sm:px-3.5
                      sm:py-2.5
                      sm:text-xs
                      lg:px-4
                      lg:py-3
                      lg:text-sm
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[10px] font-medium text-gray-700 sm:text-xs lg:mb-2 lg:text-sm"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
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
                      bg-gray-50
                      px-3
                      py-2
                      text-[10px]
                      outline-none
                      transition
                      focus:border-blue-900
                      focus:bg-white
                      sm:rounded-xl
                      sm:px-3.5
                      sm:py-2.5
                      sm:text-xs
                      lg:px-4
                      lg:py-3
                      lg:text-sm
                    "
                  />
                </div>

              </div>


              {/* Phone + Subject */}
              <div className="grid gap-3 md:grid-cols-2 md:gap-5">

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[10px] font-medium text-gray-700 sm:text-xs lg:mb-2 lg:text-sm"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={10}
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      setFormData((prev) => ({
                        ...prev,
                        phone: value,
                      }));
                    }}
                    placeholder="Enter your phone"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-gray-50
                      px-3
                      py-2
                      text-[10px]
                      outline-none
                      transition
                      focus:border-blue-900
                      focus:bg-white
                      sm:rounded-xl
                      sm:px-3.5
                      sm:py-2.5
                      sm:text-xs
                      lg:px-4
                      lg:py-3
                      lg:text-sm
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-[10px] font-medium text-gray-700 sm:text-xs lg:mb-2 lg:text-sm"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-gray-50
                      px-3
                      py-2
                      text-[10px]
                      outline-none
                      transition
                      focus:border-blue-900
                      focus:bg-white
                      sm:rounded-xl
                      sm:px-3.5
                      sm:py-2.5
                      sm:text-xs
                      lg:px-4
                      lg:py-3
                      lg:text-sm
                    "
                  />
                </div>

              </div>


              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[10px] font-medium text-gray-700 sm:text-xs lg:mb-2 lg:text-sm"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your travel plans..."
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    py-2
                    text-[10px]
                    outline-none
                    transition
                    focus:border-blue-900
                    focus:bg-white
                    sm:rounded-xl
                    sm:px-3.5
                    sm:py-2.5
                    sm:text-xs
                    lg:px-4
                    lg:py-3
                    lg:text-sm
                    lg:[&]:py-3
                  "
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
  flex
  items-center
  justify-center
  gap-1.5
  rounded-lg
  bg-gradient-to-r
  from-cyan-500
  to-blue-600
  px-4
  py-2.5
  text-[10px]
  font-semibold
  text-white
  transition
  hover:from-cyan-600
  hover:to-blue-700
  disabled:cursor-not-allowed
  disabled:opacity-60
  sm:rounded-xl
  sm:px-5
  sm:py-3
  sm:text-xs
  lg:px-6
  lg:py-3.5
  lg:text-sm
  hover:cursor-pointer
"
              >
                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                  <Send
                    size={13}
                    className="sm:h-4 sm:w-4 lg:h-[17px] lg:w-[17px]"
                  />
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>

      {/* ================================
          MAP PLACEHOLDER
      ================================= */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

            <div
              className="
                flex
                h-[350px]
                items-center
                justify-center
                bg-gray-100
              "
            >
              <div className="text-center">

                <MapPin
                  size={40}
                  className="mx-auto text-blue-500"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Find Us Here
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Google Maps will be integrated here.
                </p>

              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}