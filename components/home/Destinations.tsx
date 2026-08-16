"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Destination {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
    className: string;
}

const destinations: Destination[] = [
    {
        id: 1,
        name: "Bali",
        category: "Tropical Paradise",
        price: "₹ 29,299",
        image: "/images/destinations/bali.jpg",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        name: "Kerala",
        category: "Alappuzha River",
        price: "₹ 12,499",
        image: "/images/destinations/kerala.jpg",
        className: "col-span-1",
    },
    {
        id: 3,
        name: "London",
        category: "Cultural Adventure",
        price: "₹ 20,199",
        image: "/images/destinations/london.jpg",
        className: "col-span-1",
    },
    {
        id: 4,
        name: "Spain",
        category: "Rich History",
        price: "₹ 17,899",
        image: "/images/destinations/spain.jpg",
        className: "col-span-1",
    },
    {
        id: 5,
        name: "Canada",
        category: "Natural Wonders",
        price: "₹ 22,799",
        image: "/images/destinations/canada.jpg",
        className: "col-span-1",
    },
    {
        id: 6,
        name: "Singapore",
        category: "Modern City Escape",
        price: "₹ 15,999",
        image: "/images/destinations/singapur.jpg",
        className: "col-span-1",
    },
];

export default function Destinations() {
    return (
        <section className="px-6 py-10 md:py-20">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-12 text-center">
                    <span className="inline-block rounded-full bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-500 shadow-sm">
                        Featured Destinations
                    </span>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#11102d] md:text-4xl">
                        The Journey of Destinations
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-xs md:text-sm leading-6 text-gray-500">
                        Discover breathtaking destinations and unforgettable
                        experiences waiting for your next adventure.
                    </p>
                </div>

                {/* Collage */}
                <div className="grid grid-cols-2 gap-2.5 auto-rows-[140px] md:grid-cols-3 md:auto-rows-[180px] md:gap-3">

                {destinations.map((destination) => (
                    <Link
                    key={destination.id}
                    href="/packages"
                    className={`group relative overflow-hidden rounded-lg md:rounded-xl ${destination.className}`}
                    >
                    {/* Image */}
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                        "
                    />

                    {/* Content */}
                    <div
                        className="
                        absolute inset-x-0 bottom-0
                        p-2.5
                        transition-all
                        duration-500
                        group-hover:-translate-y-1
                        md:p-4
                        "
                    >
                        <div className="flex items-end justify-between gap-2 md:gap-3">

                        <div className="min-w-0">

                            {/* Destination name */}
                            <h3 className="truncate text-sm font-semibold text-white drop-shadow-md md:text-lg">
                            {destination.name}
                            </h3>

                            {/* Category */}
                            <p
                            className="
                                mt-0.5
                                truncate
                                text-[10px]
                                text-white/80
                                drop-shadow-md
                                md:text-xs
                            "
                            >
                            {destination.category}
                            </p>

                            {/* Price */}
                            <p
                            className="
                                mt-1
                                text-[11px]
                                font-semibold
                                text-white
                                opacity-0
                                translate-y-2
                                transition-all
                                duration-300
                                group-hover:translate-y-0
                                group-hover:opacity-100
                                md:mt-2
                                md:text-sm
                            "
                            >
                            From {destination.price}
                            </p>

                        </div>

                        {/* View button */}
                        <div
                            className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-white/30
                            backdrop-blur-md
                            transition-all
                            duration-300
                            group-hover:bg-white
                            md:h-9
                            md:w-9
                            "
                        >
                            <ArrowUpRight
                            size={14}
                            className="
                                text-white
                                transition-colors
                                duration-300
                                group-hover:text-sky-500
                                md:h-[17px]
                                md:w-[17px]
                            "
                            />
                        </div>

                        </div>
                    </div>

                    {/* Explore badge */}
                    <div
                        className="
                        absolute left-2.5 top-2.5
                        rounded-full
                        bg-white/20
                        px-2 py-0.5
                        text-[9px]
                        font-medium
                        text-white
                        opacity-0
                        backdrop-blur-md
                        -translate-y-2
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        md:left-4
                        md:top-4
                        md:px-3
                        md:py-1
                        md:text-[10px]
                        "
                    >
                        Explore
                    </div>
                    </Link>
                ))}

                </div>
            </div>
        </section>
    );
}