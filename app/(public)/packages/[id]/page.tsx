"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  Clock3,
  Star,
  Check,
  X,
  CalendarDays,
  Plane,
  Hotel,
  Utensils,
  ArrowLeft,
  CreditCard,
  FileText,
  Loader2,
  Flag,
} from "lucide-react";
import BookingEnquiryModal from "@/components/packages/BookingEnquiryModal";

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

type PackageData = {
  _id: string;

  title: string;
  destination: string;
  duration: string;
  price: number;

  description: string;

  mainImage: string;
  galleryImages: string[];

  highlights: string[];

  included: string[];
  excluded: string[];

  itinerary: ItineraryDay[];

  tourType: string;
  rating: number;

  status: "Active" | "Draft";
  isActive: boolean;
};

const terms = [
  "Package prices are subject to availability at the time of booking.",
  "The itinerary may be modified due to weather, local conditions, or operational requirements.",
  "Guests are responsible for carrying valid travel documents and passports.",
  "Cancellation charges will apply according to the cancellation policy.",
  "Any personal expenses not mentioned under inclusions are the responsibility of the traveler.",
];

const paymentTerms = [
  "A booking confirmation amount is required to reserve the package.",
  "The remaining balance must be paid before the specified departure date.",
  "Payments once made are subject to the applicable cancellation and refund policy.",
  "Package prices may change until the booking is confirmed.",
];

export default function PackageDetailsPage() {
  const [pkg, setPkg] = useState<PackageData | null>(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showBookingModal, setShowBookingModal] =
    useState(false);
  /* =====================================
      GET PACKAGE ID FROM URL
  ====================================== */

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError("");

        /*
          Example:

          /packages/68abc123

          pathname:
          /packages/68abc123
        */

        const pathname = window.location.pathname;

        const id = pathname
          .split("/")
          .filter(Boolean)
          .pop();

        if (!id) {
          throw new Error(
            "Package ID not found"
          );
        }

        /* ================================
           FETCH PUBLIC PACKAGE
        ================================= */

        const response = await fetch(
          `/api/public/packages/${id}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch package"
          );
        }

        const packageData: PackageData =
          data.package;

        setPkg(packageData);

        setSelectedImage(
          packageData.mainImage
        );
      } catch (error) {
        console.error(
          "FETCH PACKAGE ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load package"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, []);

  /* =====================================
      LOADING
  ====================================== */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-gradient-to-b
          from-[#cfeef8]
          via-[#e8f7fc]
          to-white
        "
      >
        <div className="text-center">

          <Loader2
            size={34}
            className="
              mx-auto
              animate-spin
              text-orange-500
            "
          />

          <p className="mt-4 text-sm text-gray-500">
            Loading package...
          </p>

        </div>
      </main>
    );
  }

  /* =====================================
      ERROR
  ====================================== */

  if (error || !pkg) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-gradient-to-b
          from-[#cfeef8]
          via-[#e8f7fc]
          to-white
          px-6
        "
      >
        <div className="text-center">

          <h1 className="text-2xl font-bold text-gray-900">
            Package not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error ||
              "This package is no longer available."}
          </p>

          <Link
            href="/packages"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-900
            "
          >
            <ArrowLeft size={17} />
            Back to Packages
          </Link>

        </div>
      </main>
    );
  }

  /* =====================================
      HELPERS
  ====================================== */

  const images = [
    pkg.mainImage,
    ...(pkg.galleryImages || []),
  ];

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
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

      {/* =====================================
          HERO
      ====================================== */}

      <section className="px-6 pb-10 md:pt-12">

        <div className="mt-10 mx-auto max-w-7xl">

          {/* Back */}

        <Link
          href="/packages"
          className="
            mb-6
            inline-flex
            items-center
            gap-1.5
            text-xs
            sm:gap-2
            sm:text-sm
            font-medium
            text-gray-600
            transition
            hover:text-orange-500
          "
        >
          <ArrowLeft size={15} className="sm:w-[17px] sm:h-[17px]" />
          Back to Packages
        </Link>

          {/* Package Title */}

          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">
              Travel Package
            </p>

            <h1
              className="
                mt-2
                text-2xl
                font-bold
                tracking-tight
                text-gray-900
                md:text-5xl
                lg:text-[52px]
              "
            >
              {pkg.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500 sm:gap-x-5 sm:gap-y-2 sm:text-sm">

              <span className="flex items-center gap-1.5 sm:gap-2">
                <MapPin
                  size={14}
                  className="shrink-0 text-orange-500 sm:h-4 sm:w-4"
                />
                {pkg.destination}
              </span>

              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5 sm:gap-2">
                <Clock3
                  size={14}
                  className="shrink-0 text-orange-500 sm:h-4 sm:w-4"
                />
                {pkg.duration}
              </span>

              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5 sm:gap-2">
                <Flag
                  size={14}
                  className="shrink-0 text-orange-500 sm:h-4 sm:w-4"
                />
                {pkg.tourType}
              </span>

              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1 sm:gap-1.5">
                <Star
                  size={14}
                  className="shrink-0 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4"
                />

                {pkg.rating > 0
                  ? pkg.rating.toFixed(1)
                  : "New"}
              </span>

            </div>

          </div>

          {/* Main Image */}

          <div
            className="
              relative
              h-[320px]
              overflow-hidden
              rounded-[24px]
              shadow-lg
              sm:h-[380px]
              sm:rounded-[28px]
              md:h-[500px]
              md:rounded-[32px]
            "
          >
            <Image
              src={selectedImage || pkg.mainImage}
              alt={pkg.title}
              fill
              priority
              className="
                object-cover
                transition-all
                duration-500
              "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Hero content */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-4
                text-white
                sm:p-6
                md:p-10
              "
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-4">

                {/* Rating */}
                <span
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-white/95
                    px-2.5
                    py-1
                    text-xs
                    font-semibold
                    text-gray-800
                    sm:gap-1.5
                    sm:px-3
                    sm:py-1.5
                    sm:text-sm
                  "
                >
                  <Star
                    size={13}
                    className="fill-orange-500 text-orange-500 sm:h-[15px] sm:w-[15px]"
                  />

                  {pkg.rating > 0
                    ? pkg.rating.toFixed(1)
                    : "New"}
                </span>

                {/* Location */}
                <span className="flex items-center gap-1.5 text-xs text-white/90 sm:gap-2 sm:text-sm">
                  <MapPin size={14} className="shrink-0 sm:h-4 sm:w-4" />
                  {pkg.destination}
                </span>

                {/* Tour Type */}
                <span className="flex items-center gap-1.5 text-xs text-white/90 sm:gap-2 sm:text-sm">
                  <Flag size={14} className="shrink-0 sm:h-4 sm:w-4" />
                  {pkg.tourType}
                </span>

              </div>

              <p className="flex items-center gap-1.5 text-xs text-white/85 sm:gap-2 sm:text-base">
                <Clock3 size={15} className="shrink-0 sm:h-[17px] sm:w-[17px]" />
                {pkg.duration}
              </p>
            </div>
          </div>

          {/* =====================================
              IMAGE GALLERY
          ====================================== */}

          {images.length > 1 && (
            <div
              className="
                mt-3
                flex
                gap-2
                overflow-x-auto
                pb-1
                scrollbar-hide
                md:mt-4
                md:grid
                md:grid-cols-5
                md:gap-3
                md:overflow-visible
                md:pb-0
              "
            >
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`
                    relative
                    h-16
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    transition-all
                    duration-200
                    md:h-24
                    md:w-auto
                    md:rounded-xl
                    ${
                      selectedImage === image
                        ? "ring-2 ring-orange-500 ring-offset-1 md:ring-offset-2"
                        : "opacity-75 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt={`${pkg.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />

                  {selectedImage === image && (
                    <div className="absolute inset-0 bg-orange-500/10" />
                  )}
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <section className="px-6 pb-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

            {/* =================================
                LEFT CONTENT
            ================================= */}

            <div className="space-y-8">

              {/* Overview */}

             <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-9">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                  Overview
                </p>

                <h2 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                  About this journey
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
                  {pkg.description || "No description available."}
                </p>

              </section>

              {/* Highlights */}

              <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-9">

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                    Highlights
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                    What you'll experience
                  </h2>

                  {pkg.highlights?.length > 0 ? (
                    <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">

                      {pkg.highlights.map((highlight, index) => (
                        <div
                          key={`${highlight}-${index}`}
                          className="flex items-start gap-2.5 sm:gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 sm:h-6 sm:w-6">
                            <Check
                              size={12}
                              className="text-blue-500 sm:h-[14px] sm:w-[14px]"
                            />
                          </div>

                          <span className="text-xs leading-5 text-gray-600 sm:text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}

                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-gray-400 sm:mt-5 sm:text-sm">
                      No highlights added.
                    </p>
                  )}

                </section>

              {/* =================================
                  ITINERARY
              ================================= */}

              <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-9">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                  Itinerary
                </p>

                <h2 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                  Your journey day by day
                </h2>

                {pkg.itinerary?.length > 0 ? (
                  <div className="mt-5 space-y-5 sm:mt-8 sm:space-y-7">

                    {pkg.itinerary.map((day, index) => (
                      <div
                        key={`${day.day}-${index}`}
                        className="relative flex gap-3 sm:gap-5"
                      >

                        {/* Timeline */}
                        <div className="flex flex-col items-center">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
                            {index + 1}
                          </div>

                          {index !== pkg.itinerary.length - 1 && (
                            <div className="mt-2 h-full w-px bg-orange-100" />
                          )}

                        </div>

                        {/* Content */}
                        <div className="pb-1 sm:pb-2">

                          <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                            Day {day.day}
                          </p>

                          <h3 className="mt-0.5 text-base font-semibold text-gray-900 sm:mt-1 sm:text-lg">
                            {day.title}
                          </h3>

                          <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm sm:leading-6">
                            {day.description}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="mt-4 text-xs text-gray-400 sm:mt-5 sm:text-sm">
                    No itinerary added.
                  </p>
                )}

              </section>

              {/* =================================
                  INCLUDED / EXCLUDED
              ================================= */}

              <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-9">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                  Package Details
                </p>

                <h2 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                  What's included
                </h2>

                <div className="mt-5 grid gap-5 sm:mt-7 sm:gap-8 md:grid-cols-2">

                  {/* Included */}
                  <div>

                    <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:gap-2 sm:text-base">
                      <Check
                        size={16}
                        className="text-green-500 sm:h-[18px] sm:w-[18px]"
                      />
                      Included
                    </h3>

                    <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">

                      {pkg.included?.map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-center gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm"
                        >
                          <Check
                            size={13}
                            className="shrink-0 text-green-500 sm:h-[15px] sm:w-[15px]"
                          />
                          {item}
                        </div>
                      ))}

                    </div>

                  </div>

                  {/* Excluded */}
                  <div>

                    <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:gap-2 sm:text-base">
                      <X
                        size={16}
                        className="text-red-400 sm:h-[18px] sm:w-[18px]"
                      />
                      Not Included
                    </h3>

                    <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">

                      {pkg.excluded?.map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-center gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm"
                        >
                          <X
                            size={13}
                            className="shrink-0 text-red-400 sm:h-[15px] sm:w-[15px]"
                          />
                          {item}
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================
                  MAP
              ================================= */}

              {/* <section className="overflow-hidden rounded-2xl bg-white shadow-sm sm:rounded-3xl">

                  <div className="p-4 sm:p-6 md:p-9">

                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 sm:text-sm">
                      Location
                    </p>

                    <h2 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                      Where you'll be travelling
                    </h2>

                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 sm:mt-6 sm:gap-3 sm:text-sm">

                      <MapPin
                        size={16}
                        className="shrink-0 text-orange-500 sm:h-[19px] sm:w-[19px]"
                      />

                      {pkg.destination}

                    </div>

                  </div>

                  {/* Map placeholder */}

                  {/* <div className="relative h-[250px] bg-gray-100 sm:h-[300px] md:h-[350px]">

                    <div className="absolute inset-0 flex items-center justify-center">

                      <div className="px-4 text-center">

                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 sm:h-14 sm:w-14">

                          <MapPin
                            size={22}
                            className="text-orange-500 sm:h-7 sm:w-7"
                          />

                        </div>

                        <h3 className="mt-3 text-base font-semibold text-gray-900 sm:mt-4 sm:text-lg">
                          {pkg.destination}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          Interactive map will be displayed here.
                        </p>

                      </div>

                    </div>

                  </div>

                </section> */}

              {/* =================================
                  TERMS & CONDITIONS
                  STATIC
              ================================= */}

              <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-9">

                  <div className="flex items-start gap-3 sm:gap-4">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 sm:h-11 sm:w-11 sm:rounded-xl">

                      <FileText
                        size={17}
                        className="text-blue-500 sm:h-5 sm:w-5"
                      />

                    </div>

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                        Important Information
                      </p>

                      <h2 className="mt-0.5 text-xl font-bold text-gray-900 sm:mt-1 sm:text-2xl">
                        Terms & Conditions
                      </h2>

                    </div>

                  </div>

                  <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">

                    {terms.map((term, index) => (
                      <div
                        key={term}
                        className="flex gap-2 text-xs leading-5 text-gray-600 sm:gap-3 sm:text-sm sm:leading-6"
                      >

                        <span className="shrink-0 font-semibold text-orange-500">
                          {index + 1}.
                        </span>

                        <p>{term}</p>

                      </div>
                    ))}

                  </div>

                </section>

              {/* =================================
                  PAYMENT TERMS
                  STATIC
              ================================= */}

              <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-9">

              <div className="flex items-start gap-3 sm:gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 sm:h-11 sm:w-11 sm:rounded-xl">

                  <CreditCard
                    size={17}
                    className="text-blue-500 sm:h-5 sm:w-5"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                    Payment Information
                  </p>

                  <h2 className="mt-0.5 text-xl font-bold text-gray-900 sm:mt-1 sm:text-2xl">
                    Payment Terms
                  </h2>

                </div>

              </div>

              <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">

                {paymentTerms.map((term) => (
                  <div
                    key={term}
                    className="flex gap-2 text-xs leading-5 text-gray-600 sm:gap-3 sm:text-sm sm:leading-6"
                  >

                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                    <p>{term}</p>

                  </div>
                ))}

              </div>

            </section>

            </div>

            {/* =================================
                BOOKING CARD
            ================================= */}

            <aside className="lg:sticky lg:top-28 lg:h-fit">

             <div className="overflow-hidden rounded-2xl bg-white shadow-lg sm:rounded-3xl">

                <div className="p-4 sm:p-7">

                  <p className="text-xs text-gray-400 sm:text-sm">
                    Starting from
                  </p>

                  <div className="mt-0.5 flex items-end gap-1.5 sm:mt-1 sm:gap-2">

                    <span className="text-2xl font-bold text-orange-500 sm:text-3xl">
                      {formatPrice(pkg.price)}
                    </span>

                    <span className="mb-0.5 text-xs text-gray-400 sm:mb-1 sm:text-sm">
                      / person
                    </span>

                  </div>

                  {/* Info */}

                  <div className="mt-4 space-y-3 border-y border-gray-100 py-4 sm:mt-6 sm:space-y-4 sm:py-5">

                    <div className="flex items-center gap-2.5 sm:gap-3">

                      <CalendarDays
                        size={17}
                        className="shrink-0 text-orange-500 sm:h-[19px] sm:w-[19px]"
                      />

                      <div>
                        <p className="text-[11px] text-gray-400 sm:text-xs">
                          Duration
                        </p>

                        <p className="text-xs font-medium text-gray-800 sm:text-sm">
                          {pkg.duration}
                        </p>
                      </div>

                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3">

                      <Flag
                        size={17}
                        className="shrink-0 text-orange-500 sm:h-[19px] sm:w-[19px]"
                      />

                      <div>
                        <p className="text-[11px] text-gray-400 sm:text-xs">
                          Tour Type
                        </p>

                        <p className="text-xs font-medium text-gray-800 sm:text-sm">
                          {pkg.tourType}
                        </p>
                      </div>

                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3">

                      <Star
                        size={17}
                        className="shrink-0 fill-yellow-400 text-yellow-400 sm:h-[19px] sm:w-[19px]"
                      />

                      <div>
                        <p className="text-[11px] text-gray-400 sm:text-xs">
                          Rating
                        </p>

                        <p className="text-xs font-medium text-gray-800 sm:text-sm">
                          {pkg.rating > 0
                            ? pkg.rating.toFixed(1)
                            : "New"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Booking button */}

                  <button
                    type="button"
                    onClick={() => setShowBookingModal(true)}
                   className="
                    w-full
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
                    sm:rounded-xl
                    sm:px-6
                    sm:py-3
                    sm:text-sm
                  "
                  >
                    Book This Package
                  </button>

                  <p className="mt-2 text-center text-[10px] text-gray-400 sm:mt-3 sm:text-xs">
                    No payment required to send an enquiry
                  </p>

                </div>

                {/* Feature strip */}

                <div className="grid grid-cols-3 border-t border-gray-100">

                  <div className="flex flex-col items-center gap-0.5 px-1.5 py-3 text-center sm:gap-1 sm:px-2 sm:py-4">

                    <Hotel
                      size={16}
                      className="text-blue-500 sm:h-[18px] sm:w-[18px]"
                    />

                    <span className="text-[10px] text-gray-500 sm:text-[11px]">
                      Hotels
                    </span>

                  </div>

                  <div className="flex flex-col items-center gap-0.5 border-x border-gray-100 px-1.5 py-3 text-center sm:gap-1 sm:px-2 sm:py-4">

                    <Utensils
                      size={16}
                      className="text-blue-500 sm:h-[18px] sm:w-[18px]"
                    />

                    <span className="text-[10px] text-gray-500 sm:text-[11px]">
                      Breakfast
                    </span>

                  </div>

                  <div className="flex flex-col items-center gap-0.5 px-1.5 py-3 text-center sm:gap-1 sm:px-2 sm:py-4">

                    <Plane
                      size={16}
                      className="text-blue-500 sm:h-[18px] sm:w-[18px]"
                    />

                    <span className="text-[10px] text-gray-500 sm:text-[11px]">
                      Transfers
                    </span>

                  </div>

                </div>

              </div>

            </aside>

          </div>

          {showBookingModal && pkg && (
            <BookingEnquiryModal
              packageId={pkg._id}
              packageTitle={pkg.title}
              onClose={() => setShowBookingModal(false)}
            />
          )}

        </div>

        

      </section>

    </main>
  );
}