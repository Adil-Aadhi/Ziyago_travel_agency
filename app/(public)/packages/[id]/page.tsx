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
              bg-orange-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-orange-600
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

      <section className="px-6 pb-10 pt-12">

        <div className="mt-10 mx-auto max-w-7xl">

          {/* Back */}

          <Link
            href="/packages"
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:text-orange-500
            "
          >
            <ArrowLeft size={17} />
            Back to Packages
          </Link>

          {/* Package Title */}

          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              Travel Package
            </p>

            <h1
              className="
                mt-2
                text-4xl
                font-bold
                tracking-tight
                text-gray-900
                md:text-5xl
                lg:text-[52px]
              "
            >
              {pkg.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">

              <span className="flex items-center gap-2">
                <MapPin
                  size={16}
                  className="text-orange-500"
                />

                {pkg.destination}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-2">
                <Clock3
                  size={16}
                  className="text-orange-500"
                />

                {pkg.duration}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-2">
                <Flag
                  size={16}
                  className="text-orange-500"
                />

                {pkg.tourType}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5">
                <Star
                  size={16}
                  className="
                    fill-yellow-400
                    text-yellow-400
                  "
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
              h-[420px]
              overflow-hidden
              rounded-[32px]
              shadow-lg
              md:h-[500px]
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

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-10">

              <div className="mb-4 flex flex-wrap items-center gap-4">

                {/* Rating */}

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/95
                    px-3
                    py-1.5
                    text-sm
                    font-semibold
                    text-gray-800
                  "
                >
                  <Star
                    size={15}
                    className="
                      fill-orange-500
                      text-orange-500
                    "
                  />

                  {pkg.rating > 0
                    ? pkg.rating.toFixed(1)
                    : "New"}
                </span>

                {/* Location */}

                <span className="flex items-center gap-2 text-sm text-white/90">
                  <MapPin size={16} />

                  {pkg.destination}
                </span>

                {/* Tour Type */}

                <span className="flex items-center gap-2 text-sm text-white/90">
                  <Flag size={16} />

                  {pkg.tourType}
                </span>

              </div>

              <p className="mt-3 flex items-center gap-2 text-white/85">
                <Clock3 size={17} />

                {pkg.duration}
              </p>

            </div>

          </div>

          {/* =====================================
              IMAGE GALLERY
          ====================================== */}

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">

              {images.map(
                (image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`
                      relative
                      h-20
                      overflow-hidden
                      rounded-xl
                      transition-all
                      duration-200
                      md:h-24
                      ${
                        selectedImage === image
                          ? "ring-2 ring-orange-500 ring-offset-2"
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
                )
              )}

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

              <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

                <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                  Overview
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  About this journey
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  {pkg.description ||
                    "No description available."}
                </p>

              </section>

              {/* Highlights */}

              <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

                <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                  Highlights
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  What you'll experience
                </h2>

                {pkg.highlights?.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">

                    {pkg.highlights.map(
                      (highlight, index) => (
                        <div
                          key={`${highlight}-${index}`}
                          className="flex items-start gap-3"
                        >

                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50">

                            <Check
                              size={14}
                              className="text-orange-500"
                            />

                          </div>

                          <span className="text-sm text-gray-600">
                            {highlight}
                          </span>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <p className="mt-5 text-sm text-gray-400">
                    No highlights added.
                  </p>
                )}

              </section>

              {/* =================================
                  ITINERARY
              ================================= */}

              <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

                <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                  Itinerary
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Your journey day by day
                </h2>

                {pkg.itinerary?.length > 0 ? (
                  <div className="mt-8 space-y-7">

                    {pkg.itinerary.map(
                      (day, index) => (
                        <div
                          key={`${day.day}-${index}`}
                          className="relative flex gap-5"
                        >

                          {/* Timeline */}

                          <div className="flex flex-col items-center">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                              {index + 1}
                            </div>

                            {index !==
                              pkg.itinerary.length -
                                1 && (
                              <div className="mt-2 h-full w-px bg-orange-100" />
                            )}

                          </div>

                          {/* Content */}

                          <div className="pb-2">

                            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                              Day {day.day}
                            </p>

                            <h3 className="mt-1 text-lg font-semibold text-gray-900">
                              {day.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                              {day.description}
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <p className="mt-5 text-sm text-gray-400">
                    No itinerary added.
                  </p>
                )}

              </section>

              {/* =================================
                  INCLUDED / EXCLUDED
              ================================= */}

              <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

                <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                  Package Details
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  What's included
                </h2>

                <div className="mt-7 grid gap-8 md:grid-cols-2">

                  {/* Included */}

                  <div>

                    <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                      <Check
                        size={18}
                        className="text-green-500"
                      />

                      Included
                    </h3>

                    <div className="mt-4 space-y-3">

                      {pkg.included?.map(
                        (item, index) => (
                          <div
                            key={`${item}-${index}`}
                            className="
                              flex
                              items-center
                              gap-3
                              text-sm
                              text-gray-600
                            "
                          >

                            <Check
                              size={15}
                              className="
                                shrink-0
                                text-green-500
                              "
                            />

                            {item}

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  {/* Excluded */}

                  <div>

                    <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                      <X
                        size={18}
                        className="text-red-400"
                      />

                      Not Included
                    </h3>

                    <div className="mt-4 space-y-3">

                      {pkg.excluded?.map(
                        (item, index) => (
                          <div
                            key={`${item}-${index}`}
                            className="
                              flex
                              items-center
                              gap-3
                              text-sm
                              text-gray-600
                            "
                          >

                            <X
                              size={15}
                              className="
                                shrink-0
                                text-red-400
                              "
                            />

                            {item}

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================
                  MAP
              ================================= */}

              <section className="overflow-hidden rounded-3xl bg-white shadow-sm">

                <div className="p-7 md:p-9">

                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                    Location
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Where you'll be travelling
                  </h2>

                  <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">

                    <MapPin
                      size={19}
                      className="text-orange-500"
                    />

                    {pkg.destination}

                  </div>

                </div>

                {/* Map placeholder */}

                <div className="relative h-[350px] bg-gray-100">

                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">

                        <MapPin
                          size={28}
                          className="text-orange-500"
                        />

                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        {pkg.destination}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Interactive map will be displayed here.
                      </p>

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================
                  TERMS & CONDITIONS
                  STATIC
              ================================= */}

              <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">

                    <FileText
                      size={20}
                      className="text-orange-500"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                      Important Information
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      Terms & Conditions
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-4">

                  {terms.map(
                    (term, index) => (
                      <div
                        key={term}
                        className="
                          flex
                          gap-3
                          text-sm
                          leading-6
                          text-gray-600
                        "
                      >

                        <span className="font-semibold text-orange-500">
                          {index + 1}.
                        </span>

                        <p>{term}</p>

                      </div>
                    )
                  )}

                </div>

              </section>

              {/* =================================
                  PAYMENT TERMS
                  STATIC
              ================================= */}

              <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">

                    <CreditCard
                      size={20}
                      className="text-orange-500"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                      Payment Information
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      Payment Terms
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-4">

                  {paymentTerms.map(
                    (term) => (
                      <div
                        key={term}
                        className="
                          flex
                          gap-3
                          text-sm
                          leading-6
                          text-gray-600
                        "
                      >

                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                        <p>{term}</p>

                      </div>
                    )
                  )}

                </div>

              </section>

            </div>

            {/* =================================
                BOOKING CARD
            ================================= */}

            <aside className="lg:sticky lg:top-28 lg:h-fit">

              <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

                <div className="p-7">

                  <p className="text-sm text-gray-400">
                    Starting from
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(pkg.price)}
                    </span>

                    <span className="mb-1 text-sm text-gray-400">
                      / person
                    </span>

                  </div>

                  {/* Info */}

                  <div className="mt-6 space-y-4 border-y border-gray-100 py-5">

                    <div className="flex items-center gap-3">

                      <CalendarDays
                        size={19}
                        className="text-orange-500"
                      />

                      <div>

                        <p className="text-xs text-gray-400">
                          Duration
                        </p>

                        <p className="text-sm font-medium text-gray-800">
                          {pkg.duration}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <Flag
                        size={19}
                        className="text-orange-500"
                      />

                      <div>

                        <p className="text-xs text-gray-400">
                          Tour Type
                        </p>

                        <p className="text-sm font-medium text-gray-800">
                          {pkg.tourType}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <Star
                        size={19}
                        className="
                          fill-yellow-400
                          text-yellow-400
                        "
                      />

                      <div>

                        <p className="text-xs text-gray-400">
                          Rating
                        </p>

                        <p className="text-sm font-medium text-gray-800">
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
                        rounded-xl
                        bg-orange-500
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-orange-600
                      "
                    >
                      Book This Package
                    </button>

                  <p className="mt-3 text-center text-xs text-gray-400">
                    No payment required to send an enquiry
                  </p>

                </div>

                {/* Feature strip */}

                <div className="grid grid-cols-3 border-t border-gray-100">

                  <div className="flex flex-col items-center gap-1 px-2 py-4 text-center">

                    <Hotel
                      size={18}
                      className="text-orange-500"
                    />

                    <span className="text-[11px] text-gray-500">
                      Hotels
                    </span>

                  </div>

                  <div className="flex flex-col items-center gap-1 border-x border-gray-100 px-2 py-4 text-center">

                    <Utensils
                      size={18}
                      className="text-orange-500"
                    />

                    <span className="text-[11px] text-gray-500">
                      Breakfast
                    </span>

                  </div>

                  <div className="flex flex-col items-center gap-1 px-2 py-4 text-center">

                    <Plane
                      size={18}
                      className="text-orange-500"
                    />

                    <span className="text-[11px] text-gray-500">
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