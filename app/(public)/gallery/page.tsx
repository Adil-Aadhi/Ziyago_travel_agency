"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Play,
} from "lucide-react";

type GalleryItem = {
  _id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  createdAt: string;
};

type PaginationData = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const ITEMS_PER_PAGE = 8;

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<
    GalleryItem[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] =
    useState<PaginationData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  /* -------------------------------------------------------
     Fetch Gallery
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/public/gallery?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch gallery"
          );
        }

        setGalleryItems(data.gallery || []);

        setPagination(data.pagination || null);
      } catch (error) {
        console.error(
          "FETCH GALLERY ERROR:",
          error
        );

        setError(
          "Unable to load gallery. Please try again later."
        );

        setGalleryItems([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [currentPage]);

  /* -------------------------------------------------------
     Close Modal with Escape
  ------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.addEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  /* -------------------------------------------------------
     Previous Page
  ------------------------------------------------------- */

  const handlePrevious = () => {
    if (loading) return;

    if (pagination?.hasPreviousPage) {
      setCurrentPage((page) =>
        Math.max(page - 1, 1)
      );
    }
  };

  /* -------------------------------------------------------
     Next Page
  ------------------------------------------------------- */

  const handleNext = () => {
    if (loading) return;

    if (pagination?.hasNextPage) {
      setCurrentPage((page) => page + 1);
    }
  };

  /* -------------------------------------------------------
     Video Thumbnail
  ------------------------------------------------------- */

  const getVideoThumbnail = (url: string) => {
    return url
      .replace(
        "/video/upload/",
        "/video/upload/so_0/"
      )
      .replace(/\.(mp4|webm|mov|avi|mkv)$/i, ".jpg");
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
      {/* -------------------------------------------------------
          Hero
      ------------------------------------------------------- */}

      <section className="px-6 pb-20 pt-24">
        <div className="mx-auto max-w-7xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Our Gallery
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Moments From Our Journeys
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Explore beautiful moments, destinations, and
            experiences captured during our journeys around
            the world.
          </p>

        </div>
      </section>

      {/* -------------------------------------------------------
          Gallery
      ------------------------------------------------------- */}

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
              Discover places we've explored with our
              travelers.
            </p>
          </div>

          {/* -------------------------------------------------------
              Loading
          ------------------------------------------------------- */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500">
                <Loader2
                  size={22}
                  className="animate-spin"
                />

                <span className="text-sm">
                  Loading gallery...
                </span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------
              Error
          ------------------------------------------------------- */}

          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="rounded-2xl border border-red-200 bg-red-50 px-8 py-6 text-center">
                <p className="font-medium text-red-600">
                  {error}
                </p>

                <button
                  onClick={() =>
                    setCurrentPage((page) => page)
                  }
                  className="
                    mt-4
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

          {/* -------------------------------------------------------
              Empty State
          ------------------------------------------------------- */}

          {!loading &&
            !error &&
            galleryItems.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="rounded-2xl border border-gray-200 bg-white px-8 py-10 text-center shadow-sm">
                  <p className="text-lg font-semibold text-gray-800">
                    No gallery items yet
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Beautiful travel moments will appear
                    here soon.
                  </p>
                </div>
              </div>
            )}

          {/* -------------------------------------------------------
              Gallery Grid
          ------------------------------------------------------- */}

          {!loading &&
            !error &&
            galleryItems.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {galleryItems.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() =>
                      setSelectedItem(item)
                    }
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      text-left
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      focus:outline-none
                      focus:ring-2
                      focus:ring-orange-400
                      focus:ring-offset-2
                    "
                  >
                    {/* Media */}

                    <div className="relative h-60 overflow-hidden bg-gray-100">

                      {/* Image */}

                      {item.type === "image" && (
                        <Image
                          src={item.url}
                          alt={item.title}
                          fill
                          className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                          sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1280px) 50vw,
                            25vw
                          "
                        />
                      )}

                      {/* Video Thumbnail */}

                      {item.type === "video" && (
                        <>
                          <Image
                            src={getVideoThumbnail(
                              item.url
                            )}
                            alt={item.title}
                            fill
                            className="
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                            sizes="
                              (max-width: 640px) 100vw,
                              (max-width: 1280px) 50vw,
                              25vw
                            "
                          />

                          {/* Play Button */}

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-full
                                bg-black/55
                                text-white
                                backdrop-blur-sm
                                transition-transform
                                duration-300
                                group-hover:scale-110
                              "
                            >
                              <Play
                                size={23}
                                fill="currentColor"
                                className="ml-1"
                              />
                            </div>
                          </div>
                        </>
                      )}

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

                        {item.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-white/80">
                            {item.description}
                          </p>
                        )}

                      </div>

                    </div>
                  </button>
                ))}

              </div>
            )}

          {/* -------------------------------------------------------
              Pagination
          ------------------------------------------------------- */}

          {!loading &&
            !error &&
            pagination &&
            pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">

                {/* Previous */}

                <button
                  onClick={handlePrevious}
                  disabled={
                    loading ||
                    !pagination.hasPreviousPage
                  }
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

                {/* Current Page */}

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
                  {pagination.currentPage}
                </div>

                {/* Next */}

                <button
                  onClick={handleNext}
                  disabled={
                    loading ||
                    !pagination.hasNextPage
                  }
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

      {/* -------------------------------------------------------
          Media Modal
      ------------------------------------------------------- */}

      {selectedItem && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/80
            p-4
            backdrop-blur-sm
            md:p-8
          "
          onClick={() => setSelectedItem(null)}
        >
          {/* Modal Content */}

          <div
            className="
              relative
              flex
              max-h-[90vh]
              w-full
              max-w-6xl
              flex-col
              overflow-hidden
              rounded-2xl
              bg-black
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Close Button */}

            <button
              type="button"
              onClick={() =>
                setSelectedItem(null)
              }
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                backdrop-blur-sm
                transition
                hover:bg-black/80
              "
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>

            {/* Media */}

            <div className="relative flex max-h-[75vh] min-h-[300px] items-center justify-center bg-black">

              {/* Full Image */}

              {selectedItem.type === "image" && (
                <div className="relative h-[70vh] w-full">
                  <Image
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}

              {/* Full Video */}

              {selectedItem.type === "video" && (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  playsInline
                  className="
                    max-h-[75vh]
                    max-w-full
                    object-contain
                  "
                />
              )}

            </div>

            {/* Modal Information */}

            <div className="bg-white px-6 py-5">

              <h2 className="text-xl font-semibold text-gray-900">
                {selectedItem.title}
              </h2>

              {selectedItem.description && (
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedItem.description}
                </p>
              )}

            </div>
          </div>
        </div>
      )}
    </main>
  );
}