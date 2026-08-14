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
        <section className="px-6 py-20">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-12 text-center">
                    <span className="inline-block rounded-full bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-500 shadow-sm">
                        Featured Destinations
                    </span>

                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#11102d] md:text-5xl">
                        The Journey of Destinations
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500">
                        Discover breathtaking destinations and unforgettable
                        experiences waiting for your next adventure.
                    </p>
                </div>

                {/* Collage */}
                <div className="grid auto-rows-[180px] grid-cols-3 gap-3">

                    {destinations.map((destination) => (
                        <Link
                            key={destination.id}
                            href="/packages"
                            className={`group relative overflow-hidden rounded-xl ${destination.className}`}
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
                                    p-4
                                    transition-all
                                    duration-500
                                    group-hover:-translate-y-1
                                "
                            >
                                <div className="flex items-end justify-between gap-3">

                                    <div>
                                        {/* Destination name */}
                                        <h3 className="text-lg font-semibold text-white drop-shadow-md">
                                            {destination.name}
                                        </h3>

                                        {/* Category */}
                                        <p
                                            className="
                                                mt-0.5
                                                text-xs
                                                text-white/80
                                                drop-shadow-md
                                            "
                                        >
                                            {destination.category}
                                        </p>

                                        {/* Price - appears on hover */}
                                        <p
                                            className="
                                                mt-2
                                                text-sm
                                                font-semibold
                                                text-white
                                                opacity-0
                                                translate-y-2
                                                transition-all
                                                duration-300
                                                group-hover:translate-y-0
                                                group-hover:opacity-100
                                            "
                                        >
                                            From {destination.price}
                                        </p>
                                    </div>

                                    {/* View button */}
                                    <div
                                        className="
                                            flex h-9 w-9 shrink-0
                                            items-center justify-center
                                            rounded-full
                                            bg-white/30
                                            backdrop-blur-md
                                            transition-all
                                            duration-300
                                            group-hover:bg-white
                                        "
                                    >
                                        <ArrowUpRight
                                            size={17}
                                            className="
                                                text-white
                                                transition-colors
                                                duration-300
                                                group-hover:text-sky-500
                                            "
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Explore badge - appears on hover */}
                            <div
                                className="
                                    absolute left-4 top-4
                                    rounded-full
                                    bg-white/20
                                    px-3 py-1
                                    text-[10px]
                                    font-medium
                                    text-white
                                    opacity-0
                                    backdrop-blur-md
                                    -translate-y-2
                                    transition-all
                                    duration-300
                                    group-hover:translate-y-0
                                    group-hover:opacity-100
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