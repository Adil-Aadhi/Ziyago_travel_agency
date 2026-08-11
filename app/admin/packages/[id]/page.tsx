"use client";
import AddPackageModal from "@/components/admin/AddPackageModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock3,
  CalendarDays,
  Pencil,
  Image as ImageIcon,
  Check,
  X,
  CheckCircle2,
  Loader2,
  Package as PackageIcon,
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
  const [showEditModal, setShowEditModal] =useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [packageData, setPackageData] =
    useState<PackageData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            data.message || "Failed to fetch package"
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
            onClose={() => setMobileOpen(false)}
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
            onClose={() => setMobileOpen(false)}
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
          onClose={() => setMobileOpen(false)}
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

          <main className="flex-1 bg-white p-5 md:p-8">

            <div className="mx-auto max-w-7xl">

              {/* ========================================
                  TOP BAR
              ======================================== */}

              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <Link
                  href="/admin/packages"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gray-500
                    transition
                    hover:text-orange-500
                  "
                >
                  <ArrowLeft size={17} />
                  Back to Packages
                </Link>

                <button
                  type="button"
                  onClick={() => setShowEditModal(true)}
                  className="
                    inline-flex
                    items-center
                    justify-center
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
                  <Pencil size={16} />
                  Edit Package
                </button>

              </div>

              {/* ========================================
                  PACKAGE HEADER
              ======================================== */}

              <div className="mb-8">

                <div className="flex flex-wrap items-center gap-3">

                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                    Travel Package
                  </p>

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${
                        packageData.status ===
                        "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {packageData.status}
                  </span>

                </div>

                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                  {packageData.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">

                  <span className="flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-orange-500"
                    />

                    {packageData.destination}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-gray-300" />

                  <span className="flex items-center gap-2">
                    <Clock3
                      size={16}
                      className="text-orange-500"
                    />

                    {packageData.duration}
                  </span>

                </div>

              </div>

              {/* ========================================
                  HERO IMAGE
              ======================================== */}

              <section className="overflow-hidden rounded-[28px]">

                <div className="relative h-[380px] md:h-[480px]">

                  <img
                    src={packageData.mainImage}
                    alt={packageData.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">

                    <p className="flex items-center gap-2 text-sm text-white/90">
                      <Clock3 size={17} />
                      {packageData.duration}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white md:text-4xl">
                      {formatPrice(
                        packageData.price
                      )}
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      Package price
                    </p>

                  </div>

                </div>

              </section>

              {/* ========================================
                  GALLERY
              ======================================== */}

              {packageData.galleryImages?.length >
                0 && (
                <section className="mt-4">

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                    {packageData.galleryImages.map(
                      (image, index) => (
                        <div
                          key={index}
                          className="
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                          "
                        >
                          <img
                            src={image}
                            alt={`${packageData.title} ${
                              index + 1
                            }`}
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

              <div className="mt-8 space-y-8">

                {/* ----------------------------------------
                    OVERVIEW
                ---------------------------------------- */}

                <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">

                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                    Overview
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    About this journey
                  </h2>

                  <p className="mt-4 max-w-4xl leading-7 text-gray-600">
                    {packageData.description ||
                      "No description added for this package."}
                  </p>

                </section>

                {/* ----------------------------------------
                    HIGHLIGHTS
                ---------------------------------------- */}

                <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">

                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                    Highlights
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    What you'll experience
                  </h2>

                  {packageData.highlights?.length >
                  0 ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">

                      {packageData.highlights.map(
                        (highlight, index) => (
                          <div
                            key={index}
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

                {/* ----------------------------------------
                    ITINERARY
                ---------------------------------------- */}

                <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">

                  <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                    Itinerary
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Your journey day by day
                  </h2>

                  {packageData.itinerary?.length >
                  0 ? (
                    <div className="mt-8 space-y-7">

                      {packageData.itinerary.map(
                        (day, index) => (
                          <div
                            key={`${day.day}-${index}`}
                            className="relative flex gap-5"
                          >

                            <div className="flex flex-col items-center">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                                {day.day}
                              </div>

                              {index !==
                                packageData
                                  .itinerary
                                  .length -
                                  1 && (
                                <div className="mt-2 h-full w-px bg-orange-100" />
                              )}

                            </div>

                            <div className="pb-2">

                              <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                                Day {day.day}
                              </p>

                              <h3 className="mt-1 text-lg font-semibold text-gray-900">
                                {day.title}
                              </h3>

                              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
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

                {/* ----------------------------------------
                      INCLUDED / EXCLUDED
                  ---------------------------------------- */}

                  <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">

                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                      Package Details
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      What's included
                    </h2>

                    <div className="mt-7 grid gap-8 md:grid-cols-2">

                      {/* INCLUDED */}

                      <div>

                        <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                          <Check
                            size={18}
                            className="text-green-500"
                          />
                          Included
                        </h3>

                        {packageData.included &&
                        packageData.included.length > 0 ? (
                          <div className="mt-4 space-y-3">

                            {packageData.included.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3 text-sm text-gray-600"
                                >
                                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                                    <Check
                                      size={12}
                                      className="text-green-500"
                                    />
                                  </div>

                                  <span>{item}</span>
                                </div>
                              )
                            )}

                          </div>
                        ) : (
                          <p className="mt-4 text-sm text-gray-400">
                            No inclusions added.
                          </p>
                        )}

                      </div>


                      {/* EXCLUDED */}

                      <div>

                        <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                          <X
                            size={18}
                            className="text-red-400"
                          />
                          Not Included
                        </h3>

                        {packageData.excluded &&
                        packageData.excluded.length > 0 ? (
                          <div className="mt-4 space-y-3">

                            {packageData.excluded.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3 text-sm text-gray-600"
                                >
                                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50">
                                    <X
                                      size={12}
                                      className="text-red-400"
                                    />
                                  </div>

                                  <span>{item}</span>
                                </div>
                              )
                            )}

                          </div>
                        ) : (
                          <p className="mt-4 text-sm text-gray-400">
                            No exclusions added.
                          </p>
                        )}

                      </div>

                    </div>

                  </section>

                {/* ----------------------------------------
                    PACKAGE ID
                ---------------------------------------- */}

                <div className="pb-4 text-center">

                  <p className="text-xs text-gray-400">

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

      {showEditModal && packageData && (
        <AddPackageModal
          editPackage={packageData}
          onClose={() => setShowEditModal(false)}
          onSuccess={(updatedPackage) => {
            if (updatedPackage) {
              setPackageData(updatedPackage);
            }

            setShowEditModal(false);
          }}
        />
)}

    </div>
  );
}