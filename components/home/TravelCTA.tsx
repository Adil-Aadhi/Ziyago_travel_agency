"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TravelCTA() {
  return (
    <section data-navbar-theme="light" className="px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[430px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#5db3d1] via-[#69bfdc] to-[#b9e8f5]">
          
          {/* Content */}
          <div className="relative z-10 flex h-full min-h-[430px] max-w-xl flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
            
            <h2 className="max-w-md text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Plan Your Dream
              <br />
              Holiday With Us
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/90 sm:text-base">
              Get customized travel packages, best prices, and expert
              guidance — all in one place.
            </p>

            <p className="mt-12 text-sm text-white/90 sm:text-base">
              Tell us your plan and we’ll take care of the rest.
            </p>

            <div className="mt-8">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-xl bg-[#062b4d] px-8 py-4 text-sm font-medium text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-black/90 hover:shadow-lg"
              >
                Explore Our Tours
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          {/* Couple Image */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-16 -bottom-30 h-[135%] w-[75%]">
                <Image
                src="/images/travel-couple.png"
                alt="Travel couple"
                fill
                priority
                className="object-contain object-right-bottom"
                />
            </div>
        </div>
        </div>
      </div>
    </section>
  );
}