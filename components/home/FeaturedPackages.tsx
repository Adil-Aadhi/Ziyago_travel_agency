"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  Clock3,
  Star,
  Loader2,
} from "lucide-react";

type PackageItem = {
  _id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  mainImage: string;
  rating: number;
};

export default function FeaturedPackages() {
  const [packages, setPackages] =
    useState<PackageItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/public/packages?limit=4&sort=rating",
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
      } catch (error) {
        console.error(
          "FETCH FEATURED PACKAGES ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  return (
    <section
      className="
        relative
        z-20
        -mt-24
        overflow-hidden
        rounded-t-[70px]
        py-20
        pt-24
        pb-16
        md:pt-36
        md:pb-24
      "
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

       <div className="mb-8 flex items-end justify-between gap-3 md:mb-14">
        <div>
          <p className="text-sm font-semibold text-blue-600 md:text-base">
            Popular Packages
          </p>

          <h2 className="mt-1 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:mt-2 md:text-4xl">
            Explore Our Best Tours
          </h2>
        </div>

        <Link
          href="/packages"
          className="
            shrink-0
            pb-0.5
            text-xs
            font-semibold
            text-blue-700
            hover:text-blue-800
            sm:text-sm
            md:text-base
          "
        >
          View All →
        </Link>
      </div>

        {/* Loading */}

        {loading && (
          <div className="flex min-h-[410px] items-center justify-center">
            <Loader2
              size={30}
              className="animate-spin text-orange-500"
            />
          </div>
        )}

        {/* No packages */}

        {!loading && packages.length === 0 && (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-sm text-gray-500">
              No packages available at the moment.
            </p>
          </div>
        )}

        {/* Cards */}

        {!loading && packages.length > 0 && (
         <div className="grid grid-cols-2 gap-3 rounded-2xl sm:gap-4 md:grid-cols-4 md:gap-6">

            {packages.map((item) => (
              <div
                key={item._id}
                className="
                  group
                  relative
                  h-[300px]
                  overflow-hidden
                  rounded-xl
                  shadow-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl
                  md:h-[410px]
                  md:rounded-2xl
                "
              >

                {/* Top Image */}
                <div className="relative h-[55%] overflow-hidden md:h-[60%]">
                  <Image
                    src={item.mainImage}
                    alt={item.title}
                    fill
                    sizes="
                      (max-width: 640px) 50vw,
                      (max-width: 1280px) 25vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* Bottom Blur Section */}
                <div className="relative h-[45%] overflow-hidden md:h-[40%]">

                  <Image
                    src={item.mainImage}
                    alt=""
                    fill
                    sizes="25vw"
                    className="
                      scale-125
                      rounded-xl
                      object-cover
                      blur-xl
                      md:rounded-2xl
                    "
                  />

                  <div className="absolute inset-0 bg-black/45" />

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-xl
                      border-t
                      border-white/20
                      bg-white/10
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      group-hover:bg-white/15
                      md:rounded-2xl
                    "
                  />

                  {/* Content */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-full
                      flex-col
                      justify-between
                      p-2.5
                      md:p-4
                    "
                  >

                    {/* Title */}
                    <h3
                      className="
                        line-clamp-2
                        text-[11px]
                        font-semibold
                        leading-tight
                        text-white
                        md:text-base
                      "
                    >
                      {item.title}
                    </h3>

                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-[9px] md:text-xs">

                      <div className="flex min-w-0 items-center gap-1 text-white/80 md:gap-2">
                        <MapPin
                          size={11}
                          className="shrink-0 md:h-[15px] md:w-[15px]"
                        />

                        <span className="truncate">
                          {item.destination}
                        </span>
                      </div>

                      <div className="ml-1 flex shrink-0 items-center gap-0.5 text-white">
                        <Star
                          size={11}
                          className="
                            fill-yellow-400
                            text-yellow-400
                            md:h-[15px]
                            md:w-[15px]
                          "
                        />

                        <span>
                          {item.rating > 0
                            ? item.rating.toFixed(1)
                            : "New"}
                        </span>
                      </div>

                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1 text-[9px] text-white/70 md:gap-2 md:text-xs">
                      <Clock3
                        size={11}
                        className="shrink-0 md:h-[15px] md:w-[15px]"
                      />

                      <span>{item.duration}</span>
                    </div>

                    {/* Price + Button */}
                    <div className="flex items-end justify-between">

                      <div>
                        <p className="text-[8px] text-white/60 md:text-xs">
                          Starting From
                        </p>

                        <h4 className="text-sm font-bold text-orange-400  md:mt-1 md:text-xl">
                          ₹{item.price.toLocaleString("en-IN")}
                        </h4>
                      </div>

                      <Link
                        href={`/packages/${item._id}`}
                        className="
                          rounded-full
                          bg-blue-900
                          px-2.5
                          py-1
                          text-[9px]
                          font-semibold
                          text-white
                          transition
                          hover:bg-blue-950
                          md:px-4
                          md:py-2
                          md:text-sm
                        "
                      >
                        View →
                      </Link>

                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}