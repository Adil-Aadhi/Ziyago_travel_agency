"use client";

import Image from "next/image";
import Link from "next/link";
import { Map, Plane, Backpack, LucideIcon } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  href: string;
}

const services: Service[] = [
  {
    id: "01",
    title: "Group Travel Planning",
    description:
      "Plan unforgettable group journeys with carefully arranged tours and experiences.",
    image: "/images/services/group-travel.jpg",
    icon: Map,
    href: "/packages",
  },
  {
    id: "02",
    title: "Transport Solutions",
    description:
      "Comfortable and reliable transportation solutions for your journey around the world.",
    image: "/images/services/transport.jpg",
    icon: Plane,
    href: "/packages",
  },
  {
    id: "03",
    title: "Expert Guidance",
    description:
      "Our professional travel experts are always ready to guide you throughout your journey.",
    image: "/images/services/guidance.jpg",
    icon: Backpack,
    href: "/packages",
  },
];

export default function Services() {
  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-7xl rounded-[40px] bg-white px-6 py-16 md:px-12 lg:px-16">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-block border-r-2 border-orange-400 pr-2 text-sm font-medium text-orange-500">
            World Class Services
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#11102d] md:text-5xl">
            Which Services We Provide
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-14 md:grid-cols-3 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div key={service.id} className="group relative">

                {/* Image */}
                <div className="relative h-[320px] overflow-hidden rounded-[18px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card */}
                <div
                  className="
                    relative z-10 mx-auto -mt-20
                    min-h-[255px] w-[88%]
                    rounded-[18px] bg-white p-6
                    shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    group-hover:-translate-y-2
                    group-hover:bg-[#ff6b2c]
                    group-hover:shadow-[0_20px_45px_rgba(255,107,44,0.25)]
                  "
                >
                  {/* Icon + Number */}
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-12 w-12 items-center justify-center
                        rounded-xl bg-orange-50
                        group-hover:bg-white/20
                      "
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.8}
                        className="text-orange-500 group-hover:text-white"
                      />
                    </div>

                    <span
                      className="
                        text-5xl font-light leading-none
                        text-orange-100
                        group-hover:text-white/30
                      "
                    >
                      {service.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mt-5 text-xl font-bold text-[#11102d]
                      group-hover:text-white
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-2 text-sm leading-6 text-gray-500
                      group-hover:text-white/90
                    "
                  >
                    {service.description}
                  </p>

                  {/* Explore Button */}
                  <Link
                    href={service.href}
                    className="
                      mt-5 inline-flex items-center gap-2
                      text-sm font-semibold
                      text-orange-500
                      group-hover:text-white
                    "
                  >
                    Explore Packages
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}