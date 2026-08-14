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
        className="px-6 pb-20 pt-24"
      >
        <div className="mx-auto max-w-7xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Get In Touch
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Let's Plan Your Journey
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Have a question about a package, need help
            planning your trip, or simply want to talk to us?
            We're here to help.
          </p>

        </div>
      </section>

      {/* ================================
          CONTACT SECTION
      ================================= */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            {/* ============================
                LEFT - CONTACT INFO
            ============================= */}
            <div
              className="
                rounded-3xl
                bg-white
                p-8
                shadow-sm
                md:p-10
              "
            >

              <p className="text-sm font-medium text-orange-500">
                CONTACT US
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                We'd love to hear from you
              </h2>

              <p className="mt-4 leading-relaxed text-gray-500">
                Whether you're looking for your next adventure
                or need assistance with an existing booking,
                feel free to reach out.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-6">

                {/* Address */}
                <div className="flex gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-50
                      text-orange-500
                    "
                  >
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Our Office
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      123 Travel Street,
                      <br />
                      Kochi, Kerala, India
                    </p>
                  </div>

                </div>

                {/* Phone */}
                <div className="flex gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-50
                      text-orange-500
                    "
                  >
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      +91 98765 43210
                    </p>
                  </div>

                </div>

                {/* Email */}
                <div className="flex gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-50
                      text-orange-500
                    "
                  >
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Email
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      hello@ziyaGo.com
                    </p>
                  </div>

                </div>

                {/* Hours */}
                <div className="flex gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-50
                      text-orange-500
                    "
                  >
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Working Hours
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
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
                rounded-3xl
                bg-white
                p-8
                shadow-sm
                md:p-10
              "
            >

              <p className="text-sm font-medium text-orange-500">
                SEND A MESSAGE
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Tell us how we can help
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Name + Email */}
                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-orange-400
                        focus:bg-white
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-orange-400
                        focus:bg-white
                      "
                    />
                  </div>

                </div>

                {/* Phone + Subject */}
                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-orange-400
                        focus:bg-white
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-orange-400
                        focus:bg-white
                      "
                    />
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your travel plans..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-orange-400
                      focus:bg-white
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
                    gap-2
                    rounded-xl
                    bg-orange-500
                    px-6
                    py-3.5
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
                    : "Send Message"}

                  {!loading && <Send size={17} />}
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
                  className="mx-auto text-orange-500"
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