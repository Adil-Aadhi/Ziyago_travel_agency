"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const galleryItems = [
  {
    id: 1,
    image: "/images/gallery/switzerland.jpg",
    title: "Swiss Alps",
    location: "Switzerland",
  },
  {
    id: 2,
    image: "/images/gallery/dubai.jpg",
    title: "Dubai Skyline",
    location: "Dubai",
  },
  {
    id: 3,
    image: "/images/gallery/maldives.jpg",
    title: "Maldives Escape",
    location: "Maldives",
  },
  {
    id: 4,
    image: "/images/gallery/paris.jpg",
    title: "Paris Streets",
    location: "France",
  },
  {
    id: 5,
    image: "/images/gallery/bali.jpg",
    title: "Bali Experience",
    location: "Indonesia",
  },
  {
    id: 6,
    image: "/images/gallery/singapore.jpg",
    title: "Singapore City",
    location: "Singapore",
  },
  {
    id: 7,
    image: "/images/gallery/italy.jpg",
    title: "Italian Journey",
    location: "Italy",
  },
  {
    id: 8,
    image: "/images/gallery/thailand.jpg",
    title: "Thailand Escape",
    location: "Thailand",
  },
  {
    id: 9,
    image: "/images/gallery/turkey.jpg",
    title: "Cappadocia",
    location: "Turkey",
  },
  {
    id: 10,
    image: "/images/gallery/greece.jpg",
    title: "Greek Islands",
    location: "Greece",
  },
  {
    id: 11,
    image: "/images/gallery/london.jpg",
    title: "London",
    location: "United Kingdom",
  },
  {
    id: 12,
    image: "/images/gallery/japan.jpg",
    title: "Tokyo Nights",
    location: "Japan",
  },
];

const ITEMS_PER_PAGE = 8;

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    galleryItems.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = galleryItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

      {/* Hero */}
      <section className="px-6 pb-20 pt-24">
        <div className="mx-auto max-w-7xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Our Gallery
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Moments From Our Journeys
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Explore beautiful moments, destinations, and experiences
            captured during our journeys around the world.
          </p>

        </div>
      </section>

      {/* Gallery */}
      <section className="relative z-10 px-6 pb-20 pt-10">
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="mb-10">
            <p className="text-sm font-medium text-orange-500">
              TRAVEL MOMENTS
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Explore Our Gallery
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Discover places we've explored with our travelers.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/60
                      via-black/10
                      to-transparent
                      opacity-80
                    "
                  />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/80">
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">

              {/* Previous */}
              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                className="
                  flex
                  items-center
                  gap-2
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
                <ChevronLeft size={17} />
                Previous
              </button>

              {/* Page */}
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
                  flex
                  items-center
                  gap-2
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
                <ChevronRight size={17} />
              </button>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}