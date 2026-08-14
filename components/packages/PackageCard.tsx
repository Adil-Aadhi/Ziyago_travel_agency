"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock3, Star } from "lucide-react";

type PackageCardProps = {
  package: {
    _id: string;
    title: string;
    destination: string;
    duration: string;
    price: number;
    mainImage: string;
    rating?: number;
    tourType: string;
  };
};

export default function PackageCard({
  package: pkg,
}: PackageCardProps) {
  // Format price
  const formattedPrice = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(pkg.price);

  return (
    <Link
      href={`/packages/${pkg._id}`}
      className="
        group
        relative
        block
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
      {/* ================================
          TOP IMAGE
      ================================= */}

      <div className="relative h-[60%] overflow-hidden">
        <Image
          src={pkg.mainImage}
          alt={pkg.title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />
      </div>

      {/* ================================
          BOTTOM GLASS SECTION
      ================================= */}

      <div className="relative h-[40%] overflow-hidden">

        {/* Same image as blurred background */}
        <Image
          src={pkg.mainImage}
          alt=""
          fill
          className="
            scale-125
            rounded-2xl
            object-cover
            blur-xl
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Glass layer */}
        <div
          className="
            absolute
            inset-0
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
            {pkg.title}
          </h3>

          {/* Location + Rating */}
          <div className="flex items-center justify-between text-xs">

            {/* Location */}
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={15} />

              <span>
                {pkg.destination}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-white">
              <Star
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>
                {typeof pkg.rating === "number"
                  ? pkg.rating.toFixed(1)
                  : "New"}
              </span>
            </div>

          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-xs text-white/70">
            <Clock3 size={15} />

            <span>
              {pkg.duration}
            </span>
          </div>

          {/* Price + View */}
          <div className="flex items-end justify-between">

            {/* Price */}
            <div>
              <p className="text-xs text-white/60">
                Starting From
              </p>

              <h4 className="text-xl font-bold text-orange-400">
                {formattedPrice}
              </h4>
            </div>

            {/* View */}
            <span
              className="
                rounded-full
                bg-orange-500
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                group-hover:bg-orange-600
              "
            >
              View →
            </span>

          </div>

        </div>
      </div>
    </Link>
  );
}