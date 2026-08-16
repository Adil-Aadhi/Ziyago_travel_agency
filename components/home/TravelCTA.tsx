"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TravelCTA() {
  return (
    <section
      data-navbar-theme="light"
      className="px-3 py-6 sm:px-8 md:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">

        <div
          className="
            relative
            min-h-[360px]
            overflow-hidden
            rounded-2xl
            bg-gradient-to-r
            from-[#5db3d1]
            via-[#69bfdc]
            to-[#b9e8f5]
            sm:min-h-[400px]
            md:min-h-[430px]
          "
        >

          {/* Content */}
          <div
            className="
              relative
              z-10
              flex
              min-h-[360px]
              max-w-[55%]
              flex-col
              justify-center
              px-5
              py-8
              sm:min-h-[400px]
              sm:px-10
              md:min-h-[430px]
              md:max-w-xl
              md:px-12
              md:py-12
              lg:px-16
            "
          >

            {/* Heading */}
            <h2
              className="
                max-w-[210px]
                text-xl
                font-semibold
                leading-tight
                text-white
                sm:max-w-md
                sm:text-4xl
                md:text-4xl
                lg:text-5xl
              "
            >
              Plan Your Dream
              <br />
              Holiday With Us
            </h2>

            {/* Description */}
            <p
              className="
                mt-3
                max-w-[210px]
                text-[8px]
                leading-5
                text-white/90
                sm:mt-5
                sm:max-w-lg
                sm:text-sm
                sm:leading-6
                md:mt-6
                md:text-base
                md:leading-7
              "
            >
              Get customized travel packages, best prices, and expert
              guidance — all in one place.
            </p>

            {/* Small message */}
            <p
              className="
                mt-5
                max-w-[200px]
                text-[10px]
                leading-5
                text-white/90
                sm:mt-8
                sm:max-w-none
                sm:text-sm
                md:mt-12
                md:text-base
              "
            >
              Tell us your plan and we’ll take care of the rest.
            </p>

            {/* Button */}
            <div className="mt-5 sm:mt-6 md:mt-8">
              <Link
                href="/packages"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-[#062b4d]
                  px-4
                  py-2.5
                  text-[10px]
                  font-medium
                  text-white
                  transition-all
                  duration-500
                  ease-in-out
                  hover:bg-white
                  hover:text-black/90
                  hover:shadow-lg
                  sm:gap-2
                  sm:rounded-xl
                  sm:px-6
                  sm:py-3
                  sm:text-xs
                  md:px-8
                  md:py-4
                  md:text-sm
                "
              >
                Explore Our Tours
                <ArrowUpRight
                  size={14}
                  className="sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]"
                />
              </Link>
            </div>

          </div>

          {/* Couple Image */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="
                absolute
                right-[-8px]
                top-1/2
                h-[92%]
                w-[82%]
                -translate-y-1/2

                sm:right-[-12px]
                sm:h-[90%]
                sm:w-[78%]

                md:right-[-10px]
                md:bottom-0
                md:top-auto
                md:h-[100%]
                md:w-[72%]
                md:translate-y-0

                lg:right-[-8px]
                lg:h-[100%]
                lg:w-[70%]
              "
            >
              <Image
                src="/images/travel-couple.png"
                alt="Travel couple"
                fill
                priority
                className="
                  object-contain
                  object-right
                  md:object-right-bottom
                "
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}