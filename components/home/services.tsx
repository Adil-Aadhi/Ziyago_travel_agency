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
      <div className="mx-auto max-w-7xl rounded-[24px] bg-white px-5 py-8 sm:px-4 sm:py-10 md:rounded-[40px] md:px-12 md:py-16 lg:px-16">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-block border-r-2 border-blue-500 pr-2 text-sm font-medium text-blue-600">
            World Class Services
          </span>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#11102d] md:text-4xl">
            Which Services We Provide
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div key={service.id} className="group relative">

                {/* Image */}
                <div className="relative h-[230px] overflow-hidden rounded-[16px] md:h-[320px] md:rounded-[18px]">
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
                    relative z-10 mx-auto -mt-12
                    min-h-[205px] w-[90%]
                    rounded-[16px] bg-white p-4
                    shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    group-hover:-translate-y-2
                    group-hover:bg-[#3989d4]
                    group-hover:shadow-[0_20px_45px_rgba(255,107,44,0.25)]
                    md:-mt-20
                    md:min-h-[255px]
                    md:w-[88%]
                    md:rounded-[18px]
                    md:p-6
                  "
                >
                  {/* Icon + Number */}
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg bg-orange-50
                        group-hover:bg-white/20
                        md:h-12 md:w-12 md:rounded-xl
                      "
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="text-blue-500 group-hover:text-white md:h-6 md:w-6"
                      />
                    </div>

                    <span
                      className="
                        text-4xl font-light leading-none
                        text-orange-100
                        group-hover:text-white/30
                        md:text-5xl
                      "
                    >
                      {service.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mt-3 text-lg font-bold text-[#11102d]
                      group-hover:text-white
                      md:mt-5 md:text-xl
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-1.5 text-xs leading-5 text-gray-500
                      group-hover:text-white/90
                      md:mt-2 md:text-sm md:leading-6
                    "
                  >
                    {service.description}
                  </p>

                  {/* Explore Button */}
                  <Link
                    href={service.href}
                    className="
                      mt-3 inline-flex items-center gap-1.5
                      text-xs font-semibold
                      text-blue-500
                      group-hover:text-white
                      md:mt-5 md:gap-2 md:text-sm
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