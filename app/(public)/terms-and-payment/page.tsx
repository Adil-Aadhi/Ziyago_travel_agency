"use client";

import {
  Scale,
  ShieldCheck,
  CreditCard,
  Landmark,
  Building2,
  Plane,
  CheckCircle2,
  Wallet,
  FileText,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function TermsAndPaymentPage() {
  const paymentMethods = [
    "UPI",
    "NEFT / RTGS / IMPS Bank Transfers",
    "Credit & Debit Cards",
    "Cash Payments",
  ];

  return (
    <main data-navbar-theme="light" className=" min-h-screen bg-[#f5fbff]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f6fbff] via-[#eaf7fc] to-[#dff3fb] px-3 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-[#38bdf8]/20 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#0b6ea8]/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="mt-8 relative mx-auto max-w-6xl text-center sm:mt-12">
          <div className="mx-auto mb-4 flex justify-center sm:mb-6">
            <Image
              src="/logo/logo.svg"
              alt="ZiyaGo Holidays"
              width={250}
              height={80}
              priority
              className="h-auto w-[120px] sm:w-[170px] lg:w-[250px]"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#062b4d] sm:text-3xl lg:text-5xl">
            Terms & Conditions
            <span className="mx-1.5 text-[#0b8ec7] sm:mx-2">&</span>
            Payment Terms
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-[#527082] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base">
            Please review our terms and payment policies before confirming your
            travel booking with ZiyaGo Holidays.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-6 sm:space-y-10 lg:space-y-14">

          {/* Terms & Conditions */}
          <div className="overflow-hidden rounded-2xl border border-[#d9edf5] bg-white shadow-sm sm:rounded-3xl">
            {/* Section Header */}
            <div className="border-b border-[#d9edf5] bg-[#f0f9fd] px-4 py-4 sm:px-8 sm:py-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#062b4d] text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Scale className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0b6ea8] sm:text-xs">
                    Legal Information
                  </p>

                  <h2 className="mt-0.5 text-lg font-bold text-[#062b4d] sm:mt-1 sm:text-2xl">
                    Terms & Conditions
                  </h2>
                </div>
              </div>
            </div>

            {/* Terms Content */}
            <div className="p-4 sm:p-8 lg:p-10">
              <div className="space-y-4 text-xs leading-6 text-[#4b6475] sm:space-y-5 sm:text-sm sm:leading-7 lg:text-base">

                <div className="flex gap-2.5 sm:gap-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6ea8] sm:h-5 sm:w-5" />

                  <p>
                    The Terms and Conditions of ZiyaGo Holidays and all
                    related booking agreements are governed by applicable
                    Indian laws, including the{" "}
                    <span className="font-semibold text-[#062b4d]">
                      Indian Contract Act, 1872
                    </span>
                    , the{" "}
                    <span className="font-semibold text-[#062b4d]">
                      Consumer Protection Act, 2019
                    </span>
                    , and relevant guidelines issued by the{" "}
                    <span className="font-semibold text-[#062b4d]">
                      Ministry of Tourism.
                    </span>
                  </p>
                </div>

                <div className="flex gap-2.5 sm:gap-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6ea8] sm:h-5 sm:w-5" />

                  <p>
                    All booking agreements with{" "}
                    <span className="font-semibold text-[#062b4d]">
                      ZiyaGo Holidays
                    </span>{" "}
                    shall be governed by, interpreted, and enforced in
                    accordance with the laws of the Republic of India.
                  </p>
                </div>

                <div className="flex gap-2.5 sm:gap-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6ea8] sm:h-5 sm:w-5" />

                  <p>
                    Any legal disputes, claims, or arbitration arising from
                    travel services, package cancellations, student tours,
                    pilgrimage logistics, or related services shall be subject
                    to the exclusive jurisdiction of the competent courts in
                    Kerala.
                  </p>
                </div>

                <div className="flex gap-2.5 sm:gap-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6ea8] sm:h-5 sm:w-5" />

                  <p>
                    All financial transactions and non-refundable deposit
                    forfeitures shall be processed in accordance with
                    applicable Indian consumer protection standards.
                  </p>
                </div>

                <div className="flex gap-2.5 sm:gap-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6ea8] sm:h-5 sm:w-5" />

                  <p>
                    Force Majeure claims and circumstances beyond the
                    reasonable control of ZiyaGo Holidays will be handled in
                    accordance with applicable laws and booking agreements.
                  </p>
                </div>

                <div className="flex gap-2.5 sm:gap-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6ea8] sm:h-5 sm:w-5" />

                  <p>
                    Foreign exchange transactions related to travel bookings
                    shall be subject to applicable foreign exchange
                    regulations and requirements.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="overflow-hidden rounded-2xl border border-[#d9edf5] bg-white shadow-sm sm:rounded-3xl">

            {/* Section Header */}
            <div className="border-b border-[#d9edf5] bg-[#f0f9fd] px-4 py-4 sm:px-8 sm:py-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#062b4d] text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                  <CreditCard className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0b6ea8] sm:text-xs">
                    Booking & Payments
                  </p>

                  <h2 className="mt-0.5 text-lg font-bold text-[#062b4d] sm:mt-1 sm:text-2xl">
                    Payment Terms
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:space-y-8 sm:p-8 lg:p-10">

              {/* Standard Payment */}
              <PaymentCard
                icon={<Landmark className="h-5 w-5" />}
                title="Standard Payment Schedule"
              >
                All payments and booking agreements are governed by applicable
                Indian laws, including the Indian Contract Act, 1872, the
                Consumer Protection Act, 2019, and relevant guidelines issued
                by the Ministry of Tourism.
              </PaymentCard>

              {/* Hajj Umrah */}
              <PaymentCard
                icon={<Plane className="h-5 w-5" />}
                title="Hajj & Umrah Pilgrimage"
              >
                <div className="space-y-3 sm:space-y-4">

                  <div>
                    <h4 className="text-sm font-semibold text-[#062b4d] sm:text-base">
                      Immediate Package Allocation
                    </h4>

                    <p className="mt-0.5 sm:mt-1">
                      Due to visa window updates and requirements from the
                      Saudi Ministry of Hajj and Umrah, an initial down payment
                      of up to 50% of the package cost may be required during
                      peak seasons to secure visa processing, accommodation,
                      and related travel arrangements.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#062b4d] sm:text-base">
                      Final Clearance
                    </h4>

                    <p className="mt-0.5 sm:mt-1">
                      100% of the total package cost must be settled before
                      passport submission for visa stamping.
                    </p>
                  </div>

                </div>
              </PaymentCard>

              {/* Institutional Tours */}
              <PaymentCard
                icon={<Building2 className="h-5 w-5" />}
                title="Institutional Tours – Schools & Colleges"
              >
                <div className="space-y-3 sm:space-y-4">

                  <div>
                    <h4 className="text-sm font-semibold text-[#062b4d] sm:text-base">
                      Token Advance
                    </h4>

                    <p className="mt-0.5 sm:mt-1">
                      A flat, non-refundable token advance is required to
                      reserve group airline seats, private train coaches, or
                      other group travel arrangements.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#062b4d] sm:text-base">
                      Purchase Order & Milestone Payments
                    </h4>

                    <p className="mt-0.5 sm:mt-1">
                      Payment milestone dates may be aligned with school or
                      college board disbursement cycles, provided that 100% of
                      the package amount is cleared at least 20 days before
                      departure.
                    </p>
                  </div>

                </div>
              </PaymentCard>

              {/* Payment Methods */}
              <div className="rounded-2xl border border-[#cfeef8] bg-[#f5fbff] p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#062b4d] text-white sm:h-10 sm:w-10 sm:rounded-xl">
                    <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#062b4d] sm:text-base">
                      Accepted Payment Methods
                    </h3>

                    <p className="text-xs text-[#6b8494]">
                      We accept the following payment methods.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="flex items-center gap-3 rounded-xl border border-[#d9edf5] bg-white px-3 py-2.5 sm:px-4 sm:py-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0b6ea8]" />

                      <span className="text-xs font-medium text-[#062b4d] sm:text-sm">
                        {method}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Note */}
              <div className="rounded-2xl bg-[#062b4d] p-4 text-white sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#8ed6f0] sm:h-6 sm:w-6" />

                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">
                      Important Payment Information
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-white/70 sm:mt-2 sm:text-sm sm:leading-6">
                      All payments are subject to the applicable booking,
                      cancellation, refund, and payment policies of ZiyaGo
                      Holidays. Please ensure that all required payments are
                      completed within the specified timelines.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Contact */}
          <div className="mb-16 rounded-2xl bg-[#e9f7fc] p-5 text-center sm:rounded-3xl sm:p-8 sm:mb-0">
            <p className="text-xs font-medium text-[#4b6475] sm:text-sm">
              Have questions regarding our terms or payment policies?
            </p>

            <h3 className="mt-1.5 text-lg font-bold text-[#062b4d] sm:mt-2 sm:text-2xl">
              Contact ZiyaGo Holidays
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-[#6b8494] sm:mt-3 sm:text-sm">
              Our team will be happy to assist you with any questions related
              to bookings, payments, cancellations, or travel packages.
            </p>

            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r
                from-cyan-500
                to-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition
                duration-150
                hover:from-cyan-600
                hover:to-blue-700 sm:mt-5 sm:px-5 sm:py-3 sm:text-sm"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}

/* Reusable Payment Card */

type PaymentCardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function PaymentCard({
  icon,
  title,
  children,
}: PaymentCardProps) {
  return (
    <div className="rounded-2xl border border-[#d9edf5] bg-white p-4 sm:p-6">
      <div className="flex gap-3 sm:gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e9f7fc] text-[#062b4d] sm:h-11 sm:w-11 sm:rounded-xl">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#062b4d] sm:text-lg">
            {title}
          </h3>

          <div className="mt-2 text-xs leading-6 text-[#5d7484] sm:mt-3 sm:text-sm sm:leading-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
