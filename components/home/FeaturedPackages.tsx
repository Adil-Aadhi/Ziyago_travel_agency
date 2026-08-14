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
        pt-36
        pb-24
      "
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="font-semibold text-orange-500">
              Popular Packages
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Explore Our Best Tours
            </h2>
          </div>

          <Link
            href="/packages"
            className="font-semibold text-orange-500 hover:text-orange-600"
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
          <div className="grid gap-6 rounded-2xl sm:grid-cols-2 xl:grid-cols-4">

            {packages.map((item) => (
              <div
                key={item._id}
                className="
                  group
                  relative
                  h-[410px]
                  overflow-hidden
                  rounded-2xl
                  shadow-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >

                {/* Top Clear Image */}

                <div className="relative h-[60%] overflow-hidden">
                  <Image
                    src={item.mainImage}
                    alt={item.title}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1280px) 50vw,
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

                <div className="relative h-[40%] overflow-hidden">

                  {/* Same Image */}

                  <Image
                    src={item.mainImage}
                    alt=""
                    fill
                    sizes="25vw"
                    className="
                      rounded-2xl
                      object-cover
                      scale-125
                      blur-xl
                    "
                  />

                  {/* Dark Overlay */}

                  <div className="absolute inset-0 bg-black/45" />

                  {/* Glass Layer */}

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-2xl
                      border-t
                      border-white/20
                      bg-white/10
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      group-hover:bg-white/15
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
                      p-4
                    "
                  >

                    {/* Title */}

                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>

                    {/* Location & Rating */}

                    <div className="flex items-center justify-between text-xs">

                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin size={15} />

                        <span>
                          {item.destination}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-white">

                        <Star
                          size={15}
                          className="
                            fill-yellow-400
                            text-yellow-400
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

                    <div className="flex items-center gap-2 text-xs text-white/70">

                      <Clock3 size={15} />

                      <span>
                        {item.duration}
                      </span>

                    </div>

                    {/* Price */}

                    <div className="flex items-end justify-between">

                      <div>

                        <p className="text-xs text-white/60">
                          Starting From
                        </p>

                        <h4 className="text-xl font-bold text-orange-400">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </h4>

                      </div>

                      <Link
                        href={`/packages/${item._id}`}
                        className="
                          rounded-full
                          bg-orange-500
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-orange-600
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