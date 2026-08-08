"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock3, Star } from "lucide-react";

const packages = [
  {
    id: 1,
    image: "/images/packages/switzerland.jpg",
    title: "Switzerland Escape",
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: "₹1,25,000",
    rating: 4.9,
  },
  {
    id: 2,
    image: "/images/packages/japan.jpg",
    title: "Japan Sakura Tour",
    location: "Japan",
    duration: "6 Days / 5 Nights",
    price: "₹98,000",
    rating: 4.8,
  },
  {
    id: 3,
    image: "/images/packages/dubai.jpg",
    title: "Luxury Dubai",
    location: "Dubai",
    duration: "5 Days / 4 Nights",
    price: "₹72,000",
    rating: 4.7,
  },
  {
    id: 4,
    image: "/images/packages/iceland.jpg",
    title: "Luxury iceland",
    location: "Iceland",
    duration: "5 Days / 4 Nights",
    price: "₹72,000",
    rating: 4.7,
  },
];
export default function FeaturedPackages() {
  return (
    <section 
        className="
            relative
            z-20
            -mt-24
            rounded-t-[70px]
            py-20
            pt-36
            pb-24
            overflow-hidden
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

        {/* Cards */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {packages.map((item) => (

        <div
            key={item.id}
            className="
            group
            relative
            h-[410px]
            overflow-hidden
            shadow-xl
            rounded-2xl
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-2xl
            "
        >

            {/* ---------------- Top Clear Image ---------------- */}
            <div className="relative h-[60%] overflow-hidden">

            <Image
                src={item.image}
                alt={item.title}
                fill
                className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
                "
            />

            </div>

            {/* ---------------- Bottom Blur Section ---------------- */}
            <div className="relative h-[40%] overflow-hidden">

            {/* SAME IMAGE AGAIN */}
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="
                object-cover
                scale-125
                blur-xl
                rounded-2xl
                "
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Glass Layer */}
            <div
                className="
                absolute
                inset-0
                bg-white/10
                backdrop-blur-xl
                border-t
                border-white/20
                transition-all
                duration-300
                group-hover:bg-white/15
                "
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-4">

                {/* Title */}
                <h3 className="text-base font-semibold text-white">
                {item.title}
                </h3>

                {/* Location & Rating */}
                <div className="flex items-center justify-between text-xs">

                <div className="flex items-center gap-2 text-white/80">
                    <MapPin size={15} />
                    <span>{item.location}</span>
                </div>

                <div className="flex items-center gap-1 text-white">
                    <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                    />
                    <span>{item.rating}</span>
                </div>

                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-xs text-white/70">

                <Clock3 size={15} />

                <span>{item.duration}</span>

                </div>

                {/* Price */}
                <div className="flex items-end justify-between">

                <div>

                    <p className="text-xs text-white/60">
                    Starting From
                    </p>

                    <h4 className="text-xl font-bold text-orange-400">
                    {item.price}
                    </h4>

                </div>

                <button
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
                    hover:cursor-pointer
                    "
                >
                    View →
                </button>

                </div>

            </div>

            </div>

        </div>

        ))}

        </div>

      </div>
    </section>
  );
}