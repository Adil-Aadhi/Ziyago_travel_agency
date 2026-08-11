"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import SearchSection from "@/components/home/SearchSection";
import PackageCard from "@/components/packages/PackageCard";
import Link from "next/link";

const packages = [
  {
    id: 1,
    image: "/images/packages/switzerland.jpg",
    title: "Switzerland Escape",
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: "₹1,25,000",
    rating: 4.9,
    type: "Adventure",
    region: "Europe",
  },
  {
    id: 2,
    image: "/images/packages/dubai.jpg",
    title: "Dubai Adventure",
    location: "Dubai",
    duration: "5 Days / 4 Nights",
    price: "₹85,000",
    rating: 4.8,
    type: "Adventure",
    region: "Middle East",
  },
  {
    id: 3,
    image: "/images/packages/maldives.jpg",
    title: "Maldives Paradise",
    location: "Maldives",
    duration: "5 Days / 4 Nights",
    price: "₹95,000",
    rating: 4.9,
    type: "Honeymoon",
    region: "Asia",
  },
  {
    id: 4,
    image: "/images/packages/paris.jpg",
    title: "Paris Getaway",
    location: "Paris, France",
    duration: "6 Days / 5 Nights",
    price: "₹1,10,000",
    rating: 4.7,
    type: "Family",
    region: "Europe",
  },
  {
    id: 5,
    image: "/images/packages/bali.jpg",
    title: "Bali Experience",
    location: "Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    price: "₹75,000",
    rating: 4.8,
    type: "Adventure",
    region: "Asia",
  },
  {
    id: 6,
    image: "/images/packages/singapore.jpg",
    title: "Singapore Explorer",
    location: "Singapore",
    duration: "5 Days / 4 Nights",
    price: "₹68,000",
    rating: 4.7,
    type: "Family",
    region: "Asia",
  },
  {
    id: 7,
    image: "/images/packages/italy.jpg",
    title: "Italian Journey",
    location: "Italy",
    duration: "8 Days / 7 Nights",
    price: "₹1,45,000",
    rating: 4.9,
    type: "Family",
    region: "Europe",
  },
  {
    id: 8,
    image: "/images/packages/thailand.jpg",
    title: "Thailand Escape",
    location: "Thailand",
    duration: "6 Days / 5 Nights",
    price: "₹72,000",
    rating: 4.6,
    type: "Adventure",
    region: "Asia",
  },
];

const regions = ["Europe", "Asia", "Middle East"];
const tourTypes = ["Adventure", "Family", "Honeymoon"];

export default function PackagesPage() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  let filteredPackages = packages.filter((pkg) => {
    const regionMatch =
      selectedRegions.length === 0 ||
      selectedRegions.includes(pkg.region);

    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.includes(pkg.type);

    return regionMatch && typeMatch;
  });

  if (sort === "rating") {
    filteredPackages = [...filteredPackages].sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "price-low") {
    filteredPackages = [...filteredPackages].sort(
      (a, b) =>
        Number(a.price.replace(/[₹,]/g, "")) -
        Number(b.price.replace(/[₹,]/g, ""))
    );
  }

  if (sort === "price-high") {
    filteredPackages = [...filteredPackages].sort(
      (a, b) =>
        Number(b.price.replace(/[₹,]/g, "")) -
        Number(a.price.replace(/[₹,]/g, ""))
    );
  }

  const PACKAGES_PER_PAGE = 8;

const totalPages = Math.ceil(
  filteredPackages.length / PACKAGES_PER_PAGE
);

const startIndex =
  (currentPage - 1) * PACKAGES_PER_PAGE;

const paginatedPackages = filteredPackages.slice(
  startIndex,
  startIndex + PACKAGES_PER_PAGE
);

  return (
    <main data-navbar-theme="light" className="bg-gradient-to-b from-white to-[#4eb8db] min-h-screen ">

      {/* Hero */}
      <section data-navbar-theme="light" className="  px-6 pb-20 pt-32">
        <div className="mt-10 mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Explore the world
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Find Your Perfect Journey
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Discover unforgettable destinations, handpicked experiences,
            and carefully designed travel packages.
          </p>
        </div>
      </section>

      {/* Search */}
      <section
        data-navbar-theme="light"
        className="relative z-20 -mt-10 -mb-14 px-6"
        >
        <div className="mx-auto max-w-7xl">
            <SearchSection />
        </div>
    </section>

      {/* Package section */}
   <section
        className="relative z-10 rounded-t-[70px] bg-gradient-to-b
                    from-white
                    via-[#fff4e9]
                    via-30%
                    via-[#ffe4cc]
                    via-65%
                    to-[#e8f7fc]
        px-6 pb-16 pt-28"
    >
        <div className="mx-auto max-w-7xl">

          {/* Heading + Sort */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-orange-500">
                OUR PACKAGES
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                Explore All Packages
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Showing {filteredPackages.length} of {packages.length} packages
              </p>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-orange-400"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="mt-15 grid gap-8 lg:grid-cols-[240px_1fr]">

            {/* Filters */}
            <aside className="h-fit lg:sticky lg:top-28">

              <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal size={19} className="text-orange-500" />

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
                  {regions.map((region) => (
                    <label
                      key={region}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        onChange={() =>
                          toggleFilter(region, setSelectedRegions)
                        }
                        className="h-4 w-4 accent-orange-500"
                      />

                      {region}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tour Type */}
              <div className="pt-6">
                <p className="mb-4 text-sm font-semibold text-gray-800">
                  Tour Type
                </p>

                <div className="space-y-3">
                  {tourTypes.map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() =>
                          toggleFilter(type, setSelectedTypes)
                        }
                        className="h-4 w-4 accent-orange-500"
                      />

                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(selectedRegions.length > 0 ||
                selectedTypes.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedRegions([]);
                    setSelectedTypes([]);
                  }}
                  className="mt-6 w-full rounded-xl border border-orange-200 py-2.5 text-sm font-medium text-orange-500 transition hover:bg-orange-50"
                >
                  Clear Filters
                </button>
              )}
            </aside>

            {/* Package Grid */}
            <div>
              {filteredPackages.length > 0 ? (
                <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      package={pkg}
                    />
                  ))}
                </div>
                 {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">

          {/* Previous */}
          <button
            onClick={() =>
              setCurrentPage((page) => Math.max(page - 1, 1))
            }
            disabled={currentPage === 1}
            className="
              rounded-xl
              border border-gray-200
              bg-white
              px-5 py-2.5
              text-sm font-medium
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

          {/* Page Number */}
          <div
            className="
              flex h-10 min-w-10
              items-center justify-center
              rounded-xl
              bg-orange-500
              px-4
              text-sm font-semibold
              text-white
            "
          >
            {currentPage}
          </div>

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="
              rounded-xl
              border border-gray-200
              bg-white
              px-5 py-2.5
              text-sm font-medium
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
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      No packages found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Try changing your filters.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}