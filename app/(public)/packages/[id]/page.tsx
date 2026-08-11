"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Clock3,
  Star,
  Check,
  X,
  CalendarDays,
  Users,
  Plane,
  Hotel,
  Utensils,
  ArrowLeft,
  CreditCard,
  FileText,
} from "lucide-react";

const packageData = {
  id: 1,

  // Main image
  image: "/images/packages/switzerland.jpg",

  // Gallery images
  images: [
    "/images/packages/switzerland.jpg",
    "/images/packages/switzerland-2.jpg",
    "/images/packages/switzerland-3.jpg",
    "/images/packages/switzerland-4.jpg",
    "/images/packages/switzerland-5.jpg",
  ],

  title: "Switzerland Escape",
  location: "Switzerland",
  duration: "7 Days / 6 Nights",
  price: "₹1,25,000",
  rating: 4.9,
  reviews: 128,

  description:
    "Experience the breathtaking beauty of Switzerland with a carefully planned journey through stunning alpine landscapes, charming cities, scenic train rides, and unforgettable experiences.",

  highlights: [
    "Explore the Swiss Alps",
    "Scenic train journey",
    "Visit beautiful mountain villages",
    "Experience Swiss culture and cuisine",
    "Professional tour assistance",
    "Comfortable accommodation",
  ],

  itinerary: [
    {
      day: "Day 1",
      title: "Arrival in Zurich",
      description:
        "Arrive in Zurich and meet our representative. Transfer to your hotel and spend the evening exploring the city.",
    },
    {
      day: "Day 2",
      title: "Zurich City Tour",
      description:
        "Explore Zurich's historic streets, beautiful lakefront, Old Town and major attractions.",
    },
    {
      day: "Day 3",
      title: "Lucerne & Mount Titlis",
      description:
        "Travel to Lucerne and enjoy the beautiful city before heading towards Mount Titlis for spectacular alpine views.",
    },
    {
      day: "Day 4",
      title: "Interlaken",
      description:
        "Travel to Interlaken, surrounded by mountains and lakes. Enjoy a relaxing day exploring the town.",
    },
    {
      day: "Day 5",
      title: "Jungfraujoch",
      description:
        "Experience one of Switzerland's most iconic destinations, Jungfraujoch, and enjoy breathtaking mountain scenery.",
    },
    {
      day: "Day 6",
      title: "Bern Exploration",
      description:
        "Visit Switzerland's capital city Bern and explore its historic old town and famous landmarks.",
    },
    {
      day: "Day 7",
      title: "Departure",
      description:
        "Enjoy breakfast at the hotel before transferring to the airport for your return journey.",
    },
  ],

  included: [
    "6 nights accommodation",
    "Daily breakfast",
    "Airport transfers",
    "Local transportation",
    "Sightseeing as mentioned",
    "Professional tour assistance",
  ],

  excluded: [
    "International airfare",
    "Travel insurance",
    "Personal expenses",
    "Lunch and dinner",
    "Optional activities",
  ],

  // Dummy map information
  mapLocation: "Zurich, Switzerland",

  terms: [
    "Package prices are subject to availability at the time of booking.",
    "The itinerary may be modified due to weather, local conditions, or operational requirements.",
    "Guests are responsible for carrying valid travel documents and passports.",
    "Cancellation charges will apply according to the cancellation policy.",
    "Any personal expenses not mentioned under inclusions are the responsibility of the traveler.",
  ],

  paymentTerms: [
    "A booking confirmation amount is required to reserve the package.",
    "The remaining balance must be paid before the specified departure date.",
    "Payments once made are subject to the applicable cancellation and refund policy.",
    "Package prices may change until the booking is confirmed.",
  ],
};

export default function PackageDetailsPage() {
  const pkg = packageData;

  const [selectedImage, setSelectedImage] = useState(pkg.images[0]);

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
                  <MapPin size={16} className="text-orange-500" />
                  {pkg.location}
                </span>

                <span className="h-1 w-1 rounded-full bg-gray-300" />

                <span className="flex items-center gap-2">
                  <Clock3 size={16} className="text-orange-500" />
                  {pkg.duration}
                </span>
              </div>
            </div>

          {/* Main Image */}
          <div className="relative h-[420px] overflow-hidden rounded-[32px] shadow-lg md:h-[500px]">


            <Image
              src={selectedImage}
              alt={pkg.title}
              fill
              priority
              className="object-cover transition-all duration-500"
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
                    className="fill-orange-500 text-orange-500"
                  />

                  {pkg.rating}

                  <span className="font-normal text-gray-500">
                    ({pkg.reviews} reviews)
                  </span>
                </span>

                {/* Location */}
                <span className="flex items-center gap-2 text-sm text-white/90">
                  <MapPin size={16} />
                  {pkg.location}
                </span>

              </div>

              {/* <h1 className="text-3xl font-bold md:text-5xl">
                {pkg.title}
              </h1> */}

              <p className="mt-3 flex items-center gap-2 text-white/85">
                <Clock3 size={17} />
                {pkg.duration}
              </p>

            </div>
          </div>

          {/* =====================================
              IMAGE GALLERY
          ====================================== */}

          <div className="mt-4 grid grid-cols-5 gap-3">

            {pkg.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
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

                {/* Selected overlay */}
                {selectedImage === image && (
                  <div className="absolute inset-0 bg-orange-500/10" />
                )}
              </button>
            ))}

          </div>

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
                  {pkg.description}
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

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {pkg.highlights.map((highlight) => (
                    <div
                      key={highlight}
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
                  ))}

                </div>

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

                <div className="mt-8 space-y-7">

                  {pkg.itinerary.map((day, index) => (
                    <div
                      key={day.day}
                      className="relative flex gap-5"
                    >

                      {/* Timeline */}
                      <div className="flex flex-col items-center">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        {index !== pkg.itinerary.length - 1 && (
                          <div className="mt-2 h-full w-px bg-orange-100" />
                        )}

                      </div>

                      {/* Content */}
                      <div className="pb-2">

                        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                          {day.day}
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-gray-900">
                          {day.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {day.description}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

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

                      {pkg.included.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm text-gray-600"
                        >
                          <Check
                            size={15}
                            className="shrink-0 text-green-500"
                          />

                          {item}
                        </div>
                      ))}

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

                      {pkg.excluded.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm text-gray-600"
                        >
                          <X
                            size={15}
                            className="shrink-0 text-red-400"
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
                    {pkg.mapLocation}
                  </div>

                </div>

                {/* Map placeholder */}
                <div className="relative h-[350px] bg-gray-100">

                  {/* Replace this with Google Maps later */}
                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
                        <MapPin
                          size={28}
                          className="text-orange-500"
                        />
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        {pkg.mapLocation}
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

                  {pkg.terms.map((term, index) => (
                    <div
                      key={term}
                      className="flex gap-3 text-sm leading-6 text-gray-600"
                    >
                      <span className="font-semibold text-orange-500">
                        {index + 1}.
                      </span>

                      <p>{term}</p>
                    </div>
                  ))}

                </div>

              </section>

              {/* =================================
                  PAYMENT TERMS
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

                  {pkg.paymentTerms.map((term, index) => (
                    <div
                      key={term}
                      className="flex gap-3 text-sm leading-6 text-gray-600"
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

              <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

                {/* Price */}
                <div className="p-7">

                  <p className="text-sm text-gray-400">
                    Starting from
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <span className="text-3xl font-bold text-gray-900">
                      {pkg.price}
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
                      <Users
                        size={19}
                        className="text-orange-500"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Group Size
                        </p>

                        <p className="text-sm font-medium text-gray-800">
                          Up to 20 people
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Plane
                        size={19}
                        className="text-orange-500"
                      />

                      <div>
                        <p className="text-xs text-gray-400">
                          Travel Style
                        </p>

                        <p className="text-sm font-medium text-gray-800">
                          Guided Tour
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Booking button */}
                  <button
                    className="
                      mt-6
                      w-full
                      rounded-xl
                      bg-orange-500
                      py-3.5
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

        </div>
      </section>
    </main>
  );
}