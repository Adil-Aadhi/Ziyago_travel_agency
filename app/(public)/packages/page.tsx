"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

import SearchSection from "@/components/home/SearchSection";
import PackageCard from "@/components/packages/PackageCard";

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
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  tourType: string;
  rating: number;
  status: "Active" | "Draft";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

const destinations = [
  "Dubai",
  "Maldives",
  "Switzerland",
  "Paris",
  "Bali",
  "Singapore",
  "Italy",
  "Thailand",
];

const tourTypes = [
  "Adventure",
  "Family",
  "Honeymoon",
];

const budgetOptions = [
  {
    label: "Under ₹50,000",
    min: "",
    max: "50000",
  },
  {
    label: "₹50,000 – ₹1,00,000",
    min: "50000",
    max: "100000",
  },
  {
    label: "₹1,00,000 – ₹1,50,000",
    min: "100000",
    max: "150000",
  },
  {
    label: "Above ₹1,50,000",
    min: "150000",
    max: "",
  },
];

export default function PackagesPage() {
  // -----------------------------------------
  // Packages
  // -----------------------------------------

  const searchParams = useSearchParams();

  const [packages, setPackages] = useState<PackageData[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // -----------------------------------------
  // Search / Filters
  // -----------------------------------------

  const [destination, setDestination] =
    useState(
      () => searchParams.get("destination") || ""
    );

const [tourType, setTourType] =
    useState(
      () => searchParams.get("tourType") || ""
    );


  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  // -----------------------------------------
  // Pagination
  // -----------------------------------------

  const [currentPage, setCurrentPage] =
    useState(1);

  const [pagination, setPagination] =
    useState<PaginationData>({
      page: 1,
      limit: 8,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  // -----------------------------------------
  // Fetch packages
  // -----------------------------------------

  const fetchPackages = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set(
          "page",
          currentPage.toString()
        );

        params.set("limit", "8");

        // Destination
        if (destination) {
          params.set(
            "destination",
            destination
          );
        }

        // Tour type
        if (tourType) {
          params.set(
            "tourType",
            tourType
          );
        }

        // Budget
        if (minPrice) {
          params.set(
            "minPrice",
            minPrice
          );
        }

        if (maxPrice) {
          params.set(
            "maxPrice",
            maxPrice
          );
        }

        // Sorting
        params.set("sort", sort);

        const response = await fetch(
          `/api/public/packages?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch packages"
          );
        }

        setPackages(data.packages || []);

        setPagination(
          data.pagination || {
            page: currentPage,
            limit: 8,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          }
        );
      } catch (error) {
        console.error(
          "FETCH PUBLIC PACKAGES ERROR:",
          error
        );

        setPackages([]);

        setError(
          "Unable to load packages. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      currentPage,
      destination,
      tourType,
      minPrice,
      maxPrice,
      sort,
    ]
  );

  // -----------------------------------------
  // Fetch when filters/page change
  // -----------------------------------------

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // -----------------------------------------
  // Search button
  // -----------------------------------------

  const handleSearch = () => {
    setCurrentPage(1);

    // SearchSection already updates
    // destination/tourType.
    //
    // The useEffect will automatically
    // fetch the updated packages.
  };

  // -----------------------------------------
  // Destination change
  // -----------------------------------------

  const handleDestinationChange = (
    value: string
  ) => {
    setDestination(value);
    setCurrentPage(1);
  };

  // -----------------------------------------
  // Tour type change
  // -----------------------------------------

  const handleTourTypeChange = (
    value: string
  ) => {
    setTourType(value);
    setCurrentPage(1);
  };

  // -----------------------------------------
  // Budget change
  // -----------------------------------------

  const handleBudgetChange = (
    min: string,
    max: string
  ) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  };

  // -----------------------------------------
  // Clear filters
  // -----------------------------------------

  const clearFilters = () => {
    setDestination("");
    setTourType("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setCurrentPage(1);
  };

  const hasFilters =
    destination !== "" ||
    tourType !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sort !== "newest";

  return (
    <main
      data-navbar-theme="light"
      className="min-h-screen bg-gradient-to-b from-white to-[#4eb8db]"
    >
      {/* ---------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------- */}

      <section
        data-navbar-theme="light"
        className="px-6 pb-20 pt-24 md:pt-32"
      >
        <div className="mx-auto mt-10 max-w-7xl">
          <p className="mb-3 text-xs md:text-sm font-semibold uppercase tracking-widest text-blue-500">
            Explore the world
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Find Your Perfect Journey
          </h1>

          <p className="mt-4 text-xs md:text-lg md:max-w-2xl text-gray-500">
            Discover unforgettable destinations,
            handpicked experiences, and carefully
            designed travel packages.
          </p>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* Search */}
      {/* ---------------------------------- */}

      <section
        data-navbar-theme="light"
        className="relative z-20 -mb-14 -mt-10 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <SearchSection
            destination={destination}
            tourType={tourType}
            onDestinationChange={
              handleDestinationChange
            }
            onTourTypeChange={
              handleTourTypeChange
            }
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* Packages */}
      {/* ---------------------------------- */}

      <section
        className="
          relative z-10
          rounded-t-[70px]
          bg-gradient-to-b
          from-white
          via-[#fff4e9]
          via-30%
          via-[#ffe4cc]
          via-65%
          to-[#e8f7fc]
          px-6
          pb-16
          pt-28
        "
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading + Sort */}
          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p className="text-sm font-medium text-blue-500">
                OUR PACKAGES
              </p>

              <h2 className="mt-1 text-2xl md:text-3xl font-bold text-gray-900">
                Explore All Packages
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {loading
                  ? "Loading packages..."
                  : `Showing ${packages.length} of ${pagination.total} packages`}
              </p>
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
                outline-none
                transition
                focus:border-orange-400
              "
            >
              <option value="newest">
                Newest
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="oldest">
                Oldest
              </option>
            </select>
          </div>

          {/* ---------------------------------- */}
          {/* Main layout */}
          {/* ---------------------------------- */}

          <div className="mt-15">

            {/* ================================= */}
            {/* MOBILE FILTER BAR */}
            {/* ================================= */}

            <div className="mb-5 flex items-center justify-between lg:hidden">

              <div>
                <p className="text-xs font-semibold text-gray-900">
                  Filter Packages
                </p>

                <p className="mt-0.5 text-[10px] text-gray-500">
                  Find your perfect trip
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-orange-600
                "
              >
                <SlidersHorizontal size={15} />

                Filters

                {hasFilters && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-orange-500">
                    !
                  </span>
                )}
              </button>

            </div>


            {/* ================================= */}
            {/* DESKTOP + PACKAGE GRID */}
            {/* ================================= */}

            <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

              {/* -------------------------------- */}
              {/* Desktop Filters */}
              {/* -------------------------------- */}

              <aside className="hidden h-fit lg:sticky lg:top-28 lg:block">

                <div className="mb-6 flex items-center gap-2">
                  <SlidersHorizontal
                    size={19}
                    className="text-orange-500"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Filters
                  </h3>
                </div>


                {/* Destination */}
                <div className="border-b border-gray-100 py-6">
                  <p className="mb-4 text-sm font-semibold text-gray-800">
                    Destination
                  </p>

                  <div className="space-y-3">
                    {destinations.map((item) => (
                      <label
                        key={item}
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          text-sm
                          text-gray-600
                        "
                      >
                        <input
                          type="radio"
                          name="desktop-destination"
                          checked={destination === item}
                          onChange={() =>
                            handleDestinationChange(item)
                          }
                          className="h-4 w-4 accent-orange-500"
                        />

                        {item}
                      </label>
                    ))}

                    <label
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        text-sm
                        text-gray-600
                      "
                    >
                      <input
                        type="radio"
                        name="desktop-destination"
                        checked={destination === ""}
                        onChange={() =>
                          handleDestinationChange("")
                        }
                        className="h-4 w-4 accent-orange-500"
                      />

                      All Destinations
                    </label>
                  </div>
                </div>


                {/* Budget */}
                <div className="border-b border-gray-100 py-6">

                  <p className="mb-4 text-sm font-semibold text-gray-800">
                    Budget
                  </p>

                  <div className="space-y-3">
                    {budgetOptions.map((budget) => (
                      <label
                        key={budget.label}
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          text-sm
                          text-gray-600
                        "
                      >
                        <input
                          type="radio"
                          name="desktop-budget"
                          checked={
                            minPrice === budget.min &&
                            maxPrice === budget.max
                          }
                          onChange={() =>
                            handleBudgetChange(
                              budget.min,
                              budget.max
                            )
                          }
                          className="h-4 w-4 accent-orange-500"
                        />

                        {budget.label}
                      </label>
                    ))}

                    <label
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        text-sm
                        text-gray-600
                      "
                    >
                      <input
                        type="radio"
                        name="desktop-budget"
                        checked={
                          minPrice === "" &&
                          maxPrice === ""
                        }
                        onChange={() =>
                          handleBudgetChange("", "")
                        }
                        className="h-4 w-4 accent-orange-500"
                      />

                      Any Budget
                    </label>
                  </div>
                </div>


                {/* Tour Type */}
                <div className="border-b border-gray-100 py-6">

                  <p className="mb-4 text-sm font-semibold text-gray-800">
                    Tour Type
                  </p>

                  <div className="space-y-3">

                    {tourTypes.map((type) => (
                      <label
                        key={type}
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          text-sm
                          text-gray-600
                        "
                      >
                        <input
                          type="radio"
                          name="desktop-tourType"
                          checked={tourType === type}
                          onChange={() =>
                            handleTourTypeChange(type)
                          }
                          className="h-4 w-4 accent-orange-500"
                        />

                        {type}
                      </label>
                    ))}

                    <label
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        text-sm
                        text-gray-600
                      "
                    >
                      <input
                        type="radio"
                        name="desktop-tourType"
                        checked={tourType === ""}
                        onChange={() =>
                          handleTourTypeChange("")
                        }
                        className="h-4 w-4 accent-orange-500"
                      />

                      All Tours
                    </label>

                  </div>
                </div>


                {/* Clear */}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      mt-6
                      w-full
                      rounded-xl
                      border
                      border-orange-200
                      py-2.5
                      text-sm
                      font-medium
                      text-orange-500
                      transition
                      hover:bg-orange-50
                    "
                  >
                    Clear Filters
                  </button>
                )}

              </aside>


              {/* -------------------------------- */}
              {/* Package Grid */}
              {/* -------------------------------- */}

              <div>

                {/* Keep your existing loading/error/no packages/packages code here */}

                {loading && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="
                          h-[285px]
                          animate-pulse
                          rounded-xl
                          bg-white/70
                          sm:h-[330px]
                          lg:h-[380px]
                        "
                      />
                    ))}
                  </div>
                )}

                {!loading && error && (
                  <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Something went wrong
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={fetchPackages}
                        className="
                          mt-5
                          rounded-xl
                          bg-orange-500
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-orange-600
                        "
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {!loading &&
                  !error &&
                  packages.length === 0 && (
                    <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          No packages found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          Try changing your search or filters.
                        </p>

                        {hasFilters && (
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="
                              mt-5
                              rounded-xl
                              border
                              border-orange-200
                              px-5
                              py-2.5
                              text-sm
                              font-medium
                              text-orange-500
                              transition
                              hover:bg-orange-50
                            "
                          >
                            Clear Filters
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                {!loading &&
                  !error &&
                  packages.length > 0 && (
                    <>
                      <div
                        className="
                          grid
                          grid-cols-2
                          gap-3
                          sm:grid-cols-2
                          sm:gap-6
                          xl:grid-cols-4
                        "
                      >
                        {packages.map((pkg) => (
                          <PackageCard
                            key={pkg._id}
                            package={pkg}
                          />
                        ))}
                      </div>

                      {pagination.totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-2 sm:mt-10 sm:gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPage((page) =>
                                Math.max(page - 1, 1)
                              )
                            }
                            disabled={!pagination.hasPreviousPage}
                            className="
                              rounded-lg
                              border
                              border-gray-200
                              bg-white
                              px-3
                              py-1.5
                              text-[10px]
                              font-medium
                              text-gray-700
                              transition
                              hover:border-orange-400
                              hover:text-orange-500
                              disabled:cursor-not-allowed
                              disabled:opacity-40
                              sm:rounded-xl
                              sm:px-5
                              sm:py-2.5
                              sm:text-sm
                            "
                          >
                            Previous
                          </button>

                          <div
                            className="
                              flex
                              h-8
                              min-w-8
                              items-center
                              justify-center
                              rounded-lg
                              bg-orange-500
                              px-3
                              text-[10px]
                              font-semibold
                              text-white
                              sm:h-10
                              sm:min-w-10
                              sm:rounded-xl
                              sm:px-4
                              sm:text-sm
                            "
                          >
                            {pagination.page}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPage((page) =>
                                page + 1
                              )
                            }
                            disabled={!pagination.hasNextPage}
                            className="
                              rounded-lg
                              border
                              border-gray-200
                              bg-white
                              px-3
                              py-1.5
                              text-[10px]
                              font-medium
                              text-gray-700
                              transition
                              hover:border-orange-400
                              hover:text-orange-500
                              disabled:cursor-not-allowed
                              disabled:opacity-40
                              sm:rounded-xl
                              sm:px-5
                              sm:py-2.5
                              sm:text-sm
                            "
                          >
                            Next
                          </button>

                        </div>
                      )}

                    </>
                  )}

              </div>

            </div>


            {/* ================================= */}
            {/* MOBILE FILTER MODAL */}
            {/* ================================= */}

            {isFilterOpen && (
             typeof document !== "undefined" &&
              createPortal(
                <div
                  className="
                    fixed
                    inset-0
                    z-[99999]
                    flex
                    items-end
                    justify-center
                    bg-black/50
                    px-2
                    backdrop-blur-sm
                    lg:hidden
                    sm:px-4
                  "
                  onClick={() => setIsFilterOpen(false)}
                >
                  <div
                    className="
                      relative
                      z-[100000]
                      max-h-[82vh]
                      w-full
                      overflow-y-auto
                      rounded-t-2xl
                      bg-white
                      p-3.5
                      shadow-2xl
                      sm:max-h-[88vh]
                      sm:max-w-lg
                      sm:rounded-3xl
                      sm:p-5
                      sm:mb-4
                    "
                    onClick={(event) =>
                      event.stopPropagation()
                    }
      >

                  {/* Modal Header */}
                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                        Filter Packages
                      </h3>

                      <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                        Choose what you're looking for
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        text-xs
                        text-gray-500
                        sm:h-8
                        sm:w-8
                      "
                    >
                      ✕
                    </button>

                  </div>


                  {/* Destination */}
                  <div className="mt-4 sm:mt-6">

                    <p className="mb-2 text-xs font-semibold text-gray-800 sm:mb-3 sm:text-sm">
                      Destination
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">

                      {destinations.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            handleDestinationChange(item)
                          }
                          className={`
                            rounded-lg
                            border
                            px-2.5
                            py-2
                            text-left
                            text-[10px]
                            transition
                            sm:rounded-xl
                            sm:px-3
                            sm:py-2.5
                            sm:text-xs
                            ${
                              destination === item
                                ? "border-orange-500 bg-orange-50 font-semibold text-orange-600"
                                : "border-gray-200 text-gray-600"
                            }
                          `}
                        >
                          {item}
                        </button>
                      ))}

                    </div>

                  </div>


                  {/* Budget */}
                  <div className="mt-4 sm:mt-6">

                    <p className="mb-2 text-xs font-semibold text-gray-800 sm:mb-3 sm:text-sm">
                      Budget
                    </p>

                    <div className="space-y-1.5 sm:space-y-2">

                      {budgetOptions.map((budget) => {
                        const active =
                          minPrice === budget.min &&
                          maxPrice === budget.max;

                        return (
                          <button
                            key={budget.label}
                            type="button"
                            onClick={() =>
                              handleBudgetChange(
                                budget.min,
                                budget.max
                              )
                            }
                            className={`
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-lg
                              border
                              px-2.5
                              py-2
                              text-left
                              text-[10px]
                              transition
                              sm:rounded-xl
                              sm:px-3
                              sm:py-2.5
                              sm:text-xs
                              ${
                                active
                                  ? "border-orange-500 bg-orange-50 font-semibold text-orange-600"
                                  : "border-gray-200 text-gray-600"
                              }
                            `}
                          >
                            {budget.label}

                            {active && (
                              <span className="text-xs text-orange-500">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() =>
                          handleBudgetChange("", "")
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-lg
                          border
                          px-2.5
                          py-2
                          text-left
                          text-[10px]
                          transition
                          sm:rounded-xl
                          sm:px-3
                          sm:py-2.5
                          sm:text-xs
                          ${
                            minPrice === "" &&
                            maxPrice === ""
                              ? "border-orange-500 bg-orange-50 font-semibold text-orange-600"
                              : "border-gray-200 text-gray-600"
                          }
                        `}
                      >
                        Any Budget

                        {minPrice === "" &&
                          maxPrice === "" && (
                            <span className="text-xs text-orange-500">
                              ✓
                            </span>
                          )}
                      </button>

                    </div>

                  </div>


                  {/* Tour Type */}
                  <div className="mt-4 sm:mt-6">

                    <p className="mb-2 text-xs font-semibold text-gray-800 sm:mb-3 sm:text-sm">
                      Tour Type
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">

                      {tourTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            handleTourTypeChange(type)
                          }
                          className={`
                            rounded-lg
                            border
                            px-2.5
                            py-2
                            text-left
                            text-[10px]
                            transition
                            sm:rounded-xl
                            sm:px-3
                            sm:py-2.5
                            sm:text-xs
                            ${
                              tourType === type
                                ? "border-orange-500 bg-orange-50 font-semibold text-orange-600"
                                : "border-gray-200 text-gray-600"
                            }
                          `}
                        >
                          {type}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          handleTourTypeChange("")
                        }
                        className={`
                          rounded-lg
                          border
                          px-2.5
                          py-2
                          text-left
                          text-[10px]
                          transition
                          sm:rounded-xl
                          sm:px-3
                          sm:py-2.5
                          sm:text-xs
                          ${
                            tourType === ""
                              ? "border-orange-500 bg-orange-50 font-semibold text-orange-600"
                              : "border-gray-200 text-gray-600"
                          }
                        `}
                      >
                        All Tours
                      </button>

                    </div>

                  </div>


                  {/* Bottom Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3">

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="
                        rounded-lg
                        border
                        border-gray-200
                        py-2.5
                        text-[10px]
                        font-semibold
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        sm:rounded-xl
                        sm:py-3
                        sm:text-xs
                      "
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="
                        rounded-lg
                        bg-orange-500
                        py-2.5
                        text-[10px]
                        font-semibold
                        text-white
                        transition
                        hover:bg-orange-600
                        sm:rounded-xl
                        sm:py-3
                        sm:text-xs
                      "
                    >
                      Apply Filters
                    </button>

                  </div>

                </div>

              </div>,
              document.body
            ))}

          </div>
        </div>
      </section>
    </main>
  );
}