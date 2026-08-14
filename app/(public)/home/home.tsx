"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Services from "@/components/home/services";
import Destinations from "@/components/home/Destinations";
import FeedbackSection from "@/components/home/FeedbackSection";
import TravelCTA from "@/components/home/TravelCTA";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  const router = useRouter();

  const [destination, setDestination] =
    useState("");

  const [tourType, setTourType] =
    useState("");

  const handleSearch = (
    selectedDestination: string,
    selectedTourType: string
    ) => {
    const params = new URLSearchParams();

    if (selectedDestination) {
        params.set(
        "destination",
        selectedDestination
        );
    }

    if (selectedTourType) {
        params.set(
        "tourType",
        selectedTourType
        );
    }

    const query = params.toString();

    router.push(
        query
        ? `/packages?${query}`
        : "/packages"
    );
    };

  return (
    <main>
      <Hero />

      {/* Search */}
      <div
        data-navbar-theme="light"
        className="
          absolute
          left-1/2
          bottom-[20px]
          z-30
          w-full
          max-w-6xl
          -translate-x-1/2
          px-6
        "
      >
        <SearchSection
          destination={destination}
          tourType={tourType}
          onDestinationChange={
            setDestination
          }
          onTourTypeChange={
            setTourType
          }
          onSearch={handleSearch}
        />
      </div>

      {/* Main content */}
      <div
        data-navbar-theme="light"
        className="
          relative
          z-20
          -mt-16
          rounded-t-[70px]
          bg-gradient-to-b
          from-white
          via-[#fff4e9]
          via-30%
          via-[#ffe4cc]
          via-65%
          via-[#e8f7fc]
          to-[#cfeef8]
        "
      >
        <FeaturedPackages />

        <Services />

        <Destinations />
      </div>

      <FeedbackSection />

      <TravelCTA />

      <FAQSection />

      <Footer />
    </main>
  );
}