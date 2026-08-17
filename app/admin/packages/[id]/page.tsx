"use client";

import AddPackageModal from "@/components/admin/AddPackageModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock3,
  Pencil,
  Check,
  X,
  Loader2,
  Package as PackageIcon,
  Star,
  Flag,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

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

  // NEW
  tourType: string;
  rating: number;

  description: string;
  mainImage: string;
  galleryImages: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  status: "Active" | "Draft";
};

export default function PackageDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [packageData, setPackageData] =
    useState<PackageData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ---------------------------------------------
     FETCH PACKAGE
  --------------------------------------------- */

  useEffect(() => {
    if (!id) return;

    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/packages/${id}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch package"
          );
        }

        setPackageData(data.package);
      } catch (error) {
        console.error(
          "FETCH PACKAGE ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch package"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  /* ---------------------------------------------
     LOADING
  --------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-screen">

          <AdminSidebar
            mobileOpen={mobileOpen}
            onClose={() =>
              setMobileOpen(false)
            }
          />

          <div className="flex flex-1 flex-col">

            <AdminHeader
              onMenuClick={() =>
                setMobileOpen(true)
              }
            />

            <main className="flex flex-1 items-center justify-center">

              <div className="text-center">

                <Loader2
                  size={30}
                  className="mx-auto animate-spin text-orange-500"
                />

                <p className="mt-3 text-sm text-gray-400">
                  Loading package...
                </p>

              </div>

            </main>

          </div>

        </div>
      </div>
    );
  }

  /* ---------------------------------------------
     ERROR
  --------------------------------------------- */

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-screen">

          <AdminSidebar
            mobileOpen={mobileOpen}
            onClose={() =>
              setMobileOpen(false)
            }
          />

          <div className="flex flex-1 flex-col">

            <AdminHeader
              onMenuClick={() =>
                setMobileOpen(true)
              }
            />

            <main className="flex flex-1 items-center justify-center p-6">

              <div className="text-center">

                <PackageIcon
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                  Package not found
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {error ||
                    "This package does not exist."}
                </p>

                <Link
                  href="/admin/packages"
                  className="
                    mt-5
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
                    hover:bg-orange-600
                  "
                >
                  <ArrowLeft size={17} />
                  Back to Packages
                </Link>

              </div>

            </main>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="flex min-h-screen">

        {/* ==========================================
            SIDEBAR
        ========================================== */}

        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        {/* ==========================================
            MAIN
        ========================================== */}

        <div className="flex min-w-0 flex-1 flex-col">

          <AdminHeader
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="flex-1 bg-white p-3 sm:p-5 md:p-8">

            <div className="mx-auto max-w-7xl">

              {/* ========================================
                  TOP BAR
              ======================================== */}

              <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:gap-4 sm:flex-row sm:items-center">

                <Link
                  href="/admin/packages"
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    font-medium
                    text-gray-500
                    transition
                    hover:text-blue-600
                    sm:gap-2
                    sm:text-sm
                  "
                >
                  <ArrowLeft size={14} className="sm:h-[17px] sm:w-[17px]" />
                  Back to Packages
                </Link>

                <button
                  type="button"
                  onClick={() => setShowEditModal(true)}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-3.5
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:from-cyan-600
                    hover:to-blue-700
                    sm:gap-2
                    sm:rounded-xl
                    sm:px-5
                    sm:py-3
                    sm:text-sm
                  "
                >
                  <Pencil size={14} className="sm:h-4 sm:w-4" />
                  Edit Package
                </button>

              </div>

              {/* ========================================
                  PACKAGE HEADER
              ======================================== */}

            <div className="mb-5 sm:mb-8">

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-600 sm:text-sm sm:tracking-[0.18em]">
                      Travel Package
                    </p>

                    <span
                      className={`
                        rounded-full
                        px-2
                        py-0.5
                        text-[9px]
                        font-semibold
                        sm:px-3
                        sm:py-1
                        sm:text-xs
                        ${
                          packageData.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {packageData.status}
                    </span>

                  </div>

                  <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 sm:mt-2 sm:text-4xl md:text-5xl">
                    {packageData.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">

                    {/* Destination */}
                    <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                      <MapPin size={13} className="text-blue-600 sm:h-4 sm:w-4" />
                      <span>{packageData.destination}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                      <Clock3 size={13} className="text-blue-600 sm:h-4 sm:w-4" />
                      <span>{packageData.duration}</span>
                    </div>

                    {/* Tour Type */}
                    <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-600 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                      <Flag size={13} className="sm:h-4 sm:w-4" />
                      <span>{packageData.tourType || "Not specified"}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1.5 text-xs font-semibold text-gray-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                      <Star
                        size={13}
                        className="fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4"
                      />
                      <span>
                        {typeof packageData.rating === "number" &&
                        packageData.rating > 0
                          ? packageData.rating.toFixed(1)
                          : "No rating"}
                      </span>
                    </div>

                  </div>
                </div>

              {/* ========================================
                  HERO IMAGE
              ======================================== */}

              <section className="overflow-hidden rounded-2xl sm:rounded-[28px]">

                <div className="relative h-[280px] sm:h-[380px] md:h-[480px]">

                  <img
                    src={packageData.mainImage}
                    alt={packageData.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 md:p-10">

                    <div className="flex flex-wrap items-end justify-between gap-5">

                      <div>

                        <p className="flex items-center gap-1.5 text-xs text-white/90 sm:gap-2 sm:text-sm">
                          <Clock3 size={14} className="sm:h-[17px] sm:w-[17px]" />
                          {packageData.duration}
                        </p>

                        <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl md:text-4xl">
                          {formatPrice(
                            packageData.price
                          )}
                        </p>

                        <p className="mt-1 text-sm text-white/70">
                          Package price
                        </p>

                      </div>

                      {/* Hero rating */}

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-xl
                          bg-black/30
                          px-3
                          py-2
                          backdrop-blur-md
                          sm:gap-2
                          sm:rounded-2xl
                          sm:px-4
                          sm:py-3
                        "
>
                        <Star
                          size={20}
                          className="
                            fill-yellow-400
                            text-yellow-400
                          "
                        />

                        <div>
                          <p className="text-lg font-bold text-white">
                            {typeof packageData.rating ===
                            "number" &&
                            packageData.rating > 0
                              ? packageData.rating.toFixed(
                                  1
                                )
                              : "N/A"}
                          </p>

                          <p className="text-xs text-white/70">
                            Rating
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </section>

              {/* ========================================
                  GALLERY
              ======================================== */}

              {packageData.galleryImages?.length > 0 && (
                  <section className="mt-3 sm:mt-4">

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">

                      {packageData.galleryImages.map(
                        (image, index) => (
                          <div
                            key={index}
                            className="
                              relative
                              aspect-[4/3]
                              overflow-hidden
                              rounded-lg
                              bg-gray-100
                              sm:rounded-xl
                            "
                          >
                            <img
                              src={image}
                              alt={`${packageData.title} ${index + 1}`}
                              className="
                                h-full
                                w-full
                                object-cover
                                transition
                                duration-300
                                hover:scale-105
                              "
                            />
                          </div>
                        )
                      )}

                    </div>

                  </section>
                )}

              {/* ========================================
                  CONTENT
              ======================================== */}

              <div className="mt-5 space-y-5 sm:mt-8 sm:space-y-8">

                {/* ----------------------------------------
                    OVERVIEW
                ---------------------------------------- */}

                <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7 md:p-9">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                    Overview
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                      About this journey
                    </h2>

                    <p className="mt-3 text-xs leading-6 text-gray-600 sm:mt-4 sm:text-sm sm:leading-7">
                      {packageData.description ||
                        "No description added for this package."}
                    </p>

                </section>

                {/* ----------------------------------------
                    HIGHLIGHTS
                ---------------------------------------- */}

                <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7 md:p-9">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                    Highlights
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                    What you'll experience
                  </h2>

                  {packageData.highlights?.length >
                  0 ? (
                    <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">

                      {packageData.highlights.map(
                        (
                          highlight,
                          index
                        ) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 sm:gap-3"
                          >

                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-6 sm:w-6">
                              <Check
                                size={12}
                                className="text-blue-600 sm:h-[14px] sm:w-[14px]"
                              />
                            </div>

                            <span className="text-xs text-gray-600 sm:text-sm">
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

                {/* ----------------------------------------
                    ITINERARY
                ---------------------------------------- */}

                <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7 md:p-9">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                    Itinerary
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                    Your journey day by day
                  </h2>

                  {packageData.itinerary?.length > 0 ? (
                    <div className="mt-5 space-y-5 sm:mt-8 sm:space-y-7">

                      {packageData.itinerary.map((day, index) => (
                        <div
                          key={`${day.day}-${index}`}
                          className="relative flex gap-3 sm:gap-5"
                        >

                          {/* Timeline */}
                          <div className="flex shrink-0 flex-col items-center">

                            <div
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-cyan-400
                                to-blue-600
                                text-xs
                                font-bold
                                text-white
                                sm:h-10
                                sm:w-10
                                sm:text-sm
                              "
                            >
                              {day.day}
                            </div>

                            {index !== packageData.itinerary.length - 1 && (
                              <div className="mt-2 min-h-10 w-px flex-1 bg-blue-100 sm:min-h-12" />
                            )}

                          </div>

                          {/* Content */}
                          <div className="min-w-0 pb-1 sm:pb-2">

                            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                              Day {day.day}
                            </p>

                            <h3 className="mt-0.5 text-sm font-semibold text-gray-900 sm:mt-1 sm:text-lg">
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

                {/* ----------------------------------------
                    INCLUDED / EXCLUDED
                ---------------------------------------- */}

                <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7 md:p-9">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                    Package Details
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl">
                    What's included
                  </h2>

                  <div className="mt-5 grid gap-5 sm:mt-7 sm:gap-8 md:grid-cols-2">

                    {/* INCLUDED */}

                    <div>

                      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:gap-2 sm:text-base">
                        <Check
                          size={16}
                          className="text-green-500 sm:h-[18px] sm:w-[18px]"
                        />
                        Included
                      </h3>

                      {packageData.included &&
                      packageData.included.length > 0 ? (
                        <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">

                          {packageData.included.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="
                                  flex
                                  items-start
                                  gap-2
                                  text-xs
                                  text-gray-600
                                  sm:gap-3
                                  sm:text-sm
                                "
                              >

                                <div
                                  className="
                                    mt-0.5
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-green-50
                                  "
                                >
                                  <Check
                                    size={10}
                                    className="text-green-500 sm:h-3 sm:w-3"
                                  />
                                </div>

                                <span className="leading-5 sm:leading-6">
                                  {item}
                                </span>

                              </div>
                            )
                          )}

                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
                          No inclusions added.
                        </p>
                      )}

                    </div>


                    {/* EXCLUDED */}

                    <div>

                      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:gap-2 sm:text-base">
                        <X
                          size={16}
                          className="text-red-400 sm:h-[18px] sm:w-[18px]"
                        />
                        Not Included
                      </h3>

                      {packageData.excluded &&
                      packageData.excluded.length > 0 ? (
                        <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">

                          {packageData.excluded.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="
                                  flex
                                  items-start
                                  gap-2
                                  text-xs
                                  text-gray-600
                                  sm:gap-3
                                  sm:text-sm
                                "
                              >

                                <div
                                  className="
                                    mt-0.5
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-50
                                  "
                                >
                                  <X
                                    size={10}
                                    className="text-red-400 sm:h-3 sm:w-3"
                                  />
                                </div>

                                <span className="leading-5 sm:leading-6">
                                  {item}
                                </span>

                              </div>
                            )
                          )}

                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-gray-400 sm:mt-4 sm:text-sm">
                          No exclusions added.
                        </p>
                      )}

                    </div>

                  </div>

                </section>

                {/* ----------------------------------------
                    PACKAGE ID
                ---------------------------------------- */}

                <div className="pb-2 text-center sm:pb-4">
                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Package ID:{" "}
                  <span className="font-mono text-gray-500">
                    {packageData._id}
                  </span>
                </p>
              </div>

              </div>

            </div>

          </main>

        </div>

      </div>

      {/* ==========================================
          EDIT MODAL
      ========================================== */}

      {showEditModal &&
        packageData && (
          <AddPackageModal
            editPackage={packageData}
            onClose={() =>
              setShowEditModal(false)
            }
            onSuccess={(updatedPackage) => {
              if (updatedPackage) {
                setPackageData(
                  updatedPackage
                );
              }

              setShowEditModal(false);
            }}
          />
        )}

    </div>
  );
}