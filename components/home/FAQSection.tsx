"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How can I book a travel package?",
    answer:
      "You can explore our travel packages and contact us through the booking option. Our travel experts will help you choose the right package and complete the booking process.",
  },
  {
    id: 2,
    question: "Can I customize my travel package?",
    answer:
      "Yes. We can customize your trip based on your preferred destination, travel dates, number of travelers, accommodation, activities, and budget.",
  },
  {
    id: 3,
    question: "What is included in your travel packages?",
    answer:
      "Depending on the package, inclusions may cover accommodation, transportation, sightseeing, activities, meals, and other travel services. The exact inclusions are mentioned with each package.",
  },
  {
    id: 4,
    question: "Can I change my travel dates after booking?",
    answer:
      "Travel date changes may be possible depending on availability and the terms of your booking. Please contact our team as early as possible if you need to make changes.",
  },
  {
    id: 5,
    question: "Do you arrange airport transfers?",
    answer:
      "Yes. Airport transfers can be arranged for selected destinations and packages. You can also request private or shared transportation depending on your requirements.",
  },
  {
    id: 6,
    question: "How can I contact your travel team?",
    answer:
      "You can contact us through the contact details provided on our website. Our team will be happy to help you with packages, bookings, custom trips, and other travel-related questions.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <section data-navbar-theme="light"
      className="
        relative
        z-10
        -mb-16
        overflow-hidden
        rounded-b-[70px]
        bg-gradient-to-b
        from-white
        via-[#f4fbfd]
        to-[#cfeef8]
        px-6
        pb-28
        pt-20
        sm:px-8
        lg:px-12
      "
    >
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#4daecb]">
            FAQ
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Find answers to some of the most common questions about our travel
            packages, bookings, and services.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#b8e4f0] bg-white/80 shadow-sm"
                    : "border-white/70 bg-white/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold sm:text-base ${
                      isOpen ? "text-[#167a9b]" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-[#cfeef8] text-[#167a9b]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-gray-600 sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Still have questions?
          </p>

          <Link
            href="/contact"
            className="mt-2 inline-block text-sm font-semibold text-[#167a9b] transition-colors duration-300 hover:text-[#062b4d]"
          >
            Contact our travel team →
          </Link>
        </div>

      </div>
    </section>
  );
}