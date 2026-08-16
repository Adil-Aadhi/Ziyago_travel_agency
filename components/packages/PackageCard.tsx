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
        h-[285px]
        overflow-hidden
        rounded-xl
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
        sm:h-[330px]
        sm:rounded-2xl
        lg:h-[350px]
        lg:shadow-xl
        lg:hover:-translate-y-2
        lg:hover:shadow-2xl
      "
    >

      {/* ================================
          TOP IMAGE
      ================================= */}
      <div className="relative h-[56%] overflow-hidden">
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
      <div className="relative h-[44%] overflow-hidden">

        {/* Blurred background */}
        <Image
          src={pkg.mainImage}
          alt=""
          fill
          className="
            scale-125
            rounded-xl
            object-cover
            blur-xl
            sm:rounded-2xl
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Glass */}
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
            p-2.5
            sm:p-3.5
            lg:p-4
          "
        >

          {/* Title */}
          <h3
            className="
              line-clamp-1
              text-[11px]
              font-semibold
              leading-tight
              text-white
              sm:text-sm
              lg:text-base
            "
          >
            {pkg.title}
          </h3>


          {/* Location + Rating */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-2
              text-[9px]
              sm:text-[10px]
              lg:text-xs
            "
          >

            {/* Location */}
            <div className="flex min-w-0 items-center gap-1 text-white/80 sm:gap-1.5 lg:gap-2">
              <MapPin
                size={11}
                className="shrink-0 sm:h-3 sm:w-3 lg:h-[15px] lg:w-[15px]"
              />

              <span className="truncate">
                {pkg.destination}
              </span>
            </div>


            {/* Rating */}
            <div className="flex shrink-0 items-center gap-0.5 text-white sm:gap-1">
              <Star
                size={11}
                className="
                  fill-yellow-400
                  text-yellow-400
                  sm:h-3
                  sm:w-3
                  lg:h-[15px]
                  lg:w-[15px]
                "
              />

              <span>
                {typeof pkg.rating === "number"
                  ? pkg.rating.toFixed(1)
                  : "New"}
              </span>
            </div>

          </div>


          {/* Duration */}
          <div
            className="
              flex
              items-center
              gap-1
              text-[9px]
              text-white/70
              sm:gap-1.5
              sm:text-[10px]
              lg:gap-2
              lg:text-xs
            "
          >
            <Clock3
              size={11}
              className="sm:h-3 sm:w-3 lg:h-[15px] lg:w-[15px]"
            />

            <span>
              {pkg.duration}
            </span>
          </div>


          {/* Price + View */}
          <div className="flex items-end justify-between gap-2">

            {/* Price */}
            <div className="min-w-0">
              <p className="text-[8px] text-white/60 sm:text-[9px] lg:text-xs">
                Starting From
              </p>

              <h4
                className="
                  text-sm
                  font-bold
                  text-orange-400
                  sm:text-base
                  lg:text-lg
                "
              >
                {formattedPrice}
              </h4>
            </div>


            {/* View */}
            <span
              className="
                shrink-0
                rounded-full
                bg-blue-900
                px-2.5
                py-1.5
                text-[9px]
                font-semibold
                text-white
                transition
                group-hover:bg-blue-950
                sm:px-3
                sm:py-1.5
                sm:text-[10px]
                lg:px-4
                lg:py-2
                lg:text-xs
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