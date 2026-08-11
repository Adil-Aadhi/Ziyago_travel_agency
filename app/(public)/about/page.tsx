import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Footer from "@/components/home/Footer";

const values = [
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description:
      "Every traveler is different. We create experiences based on your interests, preferences, and travel style.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Reliable",
    description:
      "From planning to the final day of your trip, our team is committed to providing dependable travel support.",
  },
  {
    icon: Sparkles,
    title: "Memorable Experiences",
    description:
      "We focus on creating meaningful journeys filled with memorable places, experiences, and moments.",
  },
  {
    icon: Compass,
    title: "Travel Expertise",
    description:
      "Our team brings destination knowledge and practical experience to help you travel with confidence.",
  },
];

const reasons = [
  "Customized travel packages",
  "Experienced travel professionals",
  "Competitive pricing",
  "Complete travel assistance",
  "Handpicked destinations and experiences",
  "Support before and during your journey",
];

export default function AboutPage() {
  return (
    <>
      <main data-navbar-theme="light" className="
      relative
      z-10
      -mb-16
      overflow-hidden
      rounded-b-[70px]
      bg-gradient-to-b
      from-[#cfeef8]
      via-[#e8f7fc]
      to-white
    ">

      {/* Hero */}
      <section  className="px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-12">

          {/* Content */}
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#167a9b]">
              About Us
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#17202a] sm:text-5xl lg:text-6xl">
              We Turn Travel Plans Into{" "}
              <span className="text-[#167a9b]">
                Beautiful Memories
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600">
              We are passionate about creating unforgettable travel
              experiences. From discovering new destinations to planning every
              little detail, we are here to make your journey simple,
              comfortable, and memorable.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-xl bg-[#062b4d] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:scale-105 hover:bg-white hover:text-[#062b4d] hover:shadow-lg"
              >
                Explore Our Packages
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-[#167a9b]/30 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#167a9b] transition-all duration-300 hover:bg-white"
              >
                Talk To Us
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto h-[360px] w-full max-w-lg sm:h-[440px]">
            <div className="absolute inset-0 rounded-[40px] bg-[#a9dfed]" />

            <div className="absolute inset-3 overflow-hidden rounded-[34px]">
              <Image
                src="/images/about/about-travel.jpg"
                alt="Travel experience"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          {/* Image */}
          <div className="relative h-[380px] overflow-hidden rounded-[30px] bg-[#e8f7fc] sm:h-[480px]">
            <Image
              src="/images/about/about-team.jpg"
              alt="Our travel team"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#4daecb]">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#17202a] sm:text-4xl">
              More Than Just A Travel Agency
            </h2>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              We believe travel is more than visiting a destination. It is
              about discovering new cultures, spending quality time with
              people you love, and creating stories that stay with you.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Our goal is to take away the stress of planning so you can focus
              on enjoying your journey. Whether you are looking for a relaxing
              holiday, a family adventure, or an unforgettable international
              trip, we help bring your travel ideas to life.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#4daecb]"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-b from-[#f4fbfd] to-[#cfeef8] px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#167a9b]">
            Our Mission
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#17202a] sm:text-4xl">
            Making Every Journey Feel Effortless
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-600 sm:text-base">
            Our mission is simple — to make travel easier, more accessible,
            and more enjoyable for everyone. We combine thoughtful planning,
            trusted services, and personalized support to create journeys
            that travelers can truly enjoy.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4daecb]">
              What Matters To Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#17202a] sm:text-4xl">
              Why Travelers Choose Us
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              We focus on the things that make a travel experience genuinely
              enjoyable.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#cfeef8] text-[#167a9b]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-[#17202a]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-gradient-to-r from-[#5db3d1] via-[#69bfdc] to-[#b9e8f5] px-8 py-14 sm:px-12 lg:px-16">

          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                Ready To Travel?
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Your Next Adventure Starts Here
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                Tell us where you want to go and let our team help you plan
                the perfect journey.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#17202a] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-500 hover:scale-105 hover:bg-white hover:text-[#17202a] hover:shadow-lg"
            >
              Plan My Trip
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      
    </main>
    {/* Footer */}
      <Footer />
    </>
  );
}