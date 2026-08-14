"use client";

import { useCallback, useEffect, useState } from "react";
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
        className="px-6 pb-20 pt-32"
      >
        <div className="mx-auto mt-10 max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Explore the world
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Find Your Perfect Journey
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
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
              <p className="text-sm font-medium text-orange-500">
                OUR PACKAGES
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
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

          <div className="mt-15 grid gap-8 lg:grid-cols-[240px_1fr]">

            {/* -------------------------------- */}
            {/* Filters */}
            {/* -------------------------------- */}

            <aside className="h-fit lg:sticky lg:top-28">

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
              <div className="border-b border-gray-100 pb-6">
                <p className="mb-4 text-sm font-semibold text-gray-800">
                  Destination
                </p>

                <div className="space-y-3">
                  {destinations.map(
                    (item) => (
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
                          name="destination"
                          checked={
                            destination ===
                            item
                          }
                          onChange={() => {
                            handleDestinationChange(
                              item
                            );
                          }}
                          className="h-4 w-4 accent-orange-500"
                        />

                        {item}
                      </label>
                    )
                  )}

                  {/* All destinations */}
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
                      name="destination"
                      checked={
                        destination === ""
                      }
                      onChange={() =>
                        handleDestinationChange(
                          ""
                        )
                      }
                      className="h-4 w-4 accent-orange-500"
                    />

                    All Destinations
                  </label>
                </div>
              </div>

              {/* Tour Type */}
              <div className="border-b border-gray-100 py-6">
                <p className="mb-4 text-sm font-semibold text-gray-800">
                  Tour Type
                </p>

                <div className="space-y-3">
                  {tourTypes.map(
                    (type) => (
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
                          name="tourType"
                          checked={
                            tourType ===
                            type
                          }
                          onChange={() => {
                            handleTourTypeChange(
                              type
                            );
                          }}
                          className="h-4 w-4 accent-orange-500"
                        />

                        {type}
                      </label>
                    )
                  )}

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
                      name="tourType"
                      checked={
                        tourType === ""
                      }
                      onChange={() =>
                        handleTourTypeChange(
                          ""
                        )
                      }
                      className="h-4 w-4 accent-orange-500"
                    />

                    All Tours
                  </label>
                </div>
              </div>

              {/* Budget */}
              <div className="border-b border-gray-100 py-6">
                <p className="mb-4 text-sm font-semibold text-gray-800">
                  Budget
                </p>

                <div className="space-y-3">
                  {budgetOptions.map(
                    (budget) => (
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
                          name="budget"
                          checked={
                            minPrice ===
                              budget.min &&
                            maxPrice ===
                              budget.max
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
                    )
                  )}

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
                      name="budget"
                      checked={
                        minPrice === "" &&
                        maxPrice === ""
                      }
                      onChange={() =>
                        handleBudgetChange(
                          "",
                          ""
                        )
                      }
                      className="h-4 w-4 accent-orange-500"
                    />

                    Any Budget
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
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

              {/* Loading */}
              {loading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({
                    length: 8,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="
                        h-[380px]
                        animate-pulse
                        rounded-3xl
                        bg-white/70
                      "
                    />
                  ))}
                </div>
              )}

              {/* Error */}
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

              {/* No packages */}
              {!loading &&
                !error &&
                packages.length === 0 && (
                  <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        No packages found
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Try changing your
                        search or filters.
                      </p>

                      {hasFilters && (
                        <button
                          type="button"
                          onClick={
                            clearFilters
                          }
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

              {/* Packages */}
              {!loading &&
                !error &&
                packages.length > 0 && (
                  <>
                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-6
                        sm:grid-cols-2
                        xl:grid-cols-4
                      "
                    >
                      {packages.map(
                        (pkg) => (
                          <PackageCard
                            key={pkg._id}
                            package={pkg}
                          />
                        )
                      )}
                    </div>

                    {/* -------------------------------- */}
                    {/* Pagination */}
                    {/* -------------------------------- */}

                    {pagination.totalPages >
                      1 && (
                      <div className="mt-10 flex items-center justify-center gap-3">

                        {/* Previous */}
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              (page) =>
                                Math.max(
                                  page - 1,
                                  1
                                )
                            )
                          }
                          disabled={
                            !pagination.hasPreviousPage
                          }
                          className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:border-orange-400
                            hover:text-orange-500
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          Previous
                        </button>

                        {/* Current page */}
                        <div
                          className="
                            flex
                            h-10
                            min-w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-orange-500
                            px-4
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          {pagination.page}
                        </div>

                        {/* Next */}
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              (page) =>
                                page + 1
                            )
                          }
                          disabled={
                            !pagination.hasNextPage
                          }
                          className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:border-orange-400
                            hover:text-orange-500
                            disabled:cursor-not-allowed
                            disabled:opacity-40
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
        </div>
      </section>
    </main>
  );
}