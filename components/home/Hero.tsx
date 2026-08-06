"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero/switzerland.jpg",
    country: "Switzerland",
    title: "Explore Switzerland",
    subtitle:
      "Breathtaking alpine landscapes, crystal-clear lakes, and unforgettable adventures await.",
  },
  {
    id: 2,
    image: "/images/hero/japan.jpg",
    country: "Japan",
    title: "Experience Japan",
    subtitle:
      "Discover timeless traditions, vibrant cities, and breathtaking cherry blossoms.",
  },
  {
    id: 3,
    image: "/images/hero/iceland.jpg",
    country: "Iceland",
    title: "Discover Iceland",
    subtitle:
      "Witness waterfalls, glaciers, volcanoes, and the magical northern lights.",
  },
  {
    id: 4,
    image: "/images/hero/dubai.jpg",
    country: "Dubai",
    title: "Luxury in Dubai",
    subtitle:
      "Experience world-class luxury, iconic skylines, and unforgettable desert adventures.",
  },
  {
    id: 5,
    image: "/images/hero/italy.jpg",
    country: "Italy",
    title: "Fall in Love with Italy",
    subtitle:
      "Explore charming streets, historic landmarks, and authentic Mediterranean beauty.",
  },
  {
    id: 6,
    image: "/images/hero/uk.jpg",
    country: "United Kingdom",
    title: "Discover the United Kingdom",
    subtitle:
      "From historic castles to vibrant cities, every journey tells a story.",
  },
];

export default function Hero() {

const [activeSlide, setActiveSlide] = useState(0);

return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full w-full">
        <div className="relative h-screen w-full overflow-hidden">

            <motion.div
            key={slide.id}
            initial={{ scale: 1 }}
            animate={{
                scale: activeSlide === slide.id - 1 ? 1.1 : 1,
            }}
            transition={{
                duration: 5,
                ease: "linear",
            }}
            className="absolute inset-0"
            >
            <Image
                src={slide.image}
                alt={slide.country}
                fill
                priority={slide.id === 1}
                className="object-cover"
            />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        </div>
        </SwiperSlide>
        ))}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-xl">
            {slides.map((_, index) => (
                <div
                key={index}
                className="h-1 w-14 overflow-hidden rounded-full bg-white/20"
                >
                <motion.div
                    key={activeSlide === index ? index : `inactive-${index}`}
                    initial={{ width: 0 }}
                    animate={{
                    width: activeSlide === index ? "100%" : "0%",
                    }}
                    transition={{
                    duration: 5,
                    ease: "linear",
                    }}
                    className="h-full bg-white"
                />
                </div>
            ))}
        </div>
      </Swiper>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="mx-auto max-w-5xl px-6 text-center text-white">

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-xl"
            >
            🌍 Luxury Travel Experiences
            </motion.div>

            <motion.h1
            key={activeSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold leading-tight md:text-7xl"
            >
            {slides[activeSlide].title}
            </motion.h1>

            <motion.p
            key={`subtitle-${activeSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl"
            >
            {slides[activeSlide].subtitle}
            </motion.p>

            <Link
            href="/packages"
            className="mt-10 inline-flex rounded-full border border-white/20 bg-white/10 px-10 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
            Explore Tours →
            </Link>

        </div>
        </div>
    </section>
  );
}