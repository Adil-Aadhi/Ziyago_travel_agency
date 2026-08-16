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
      <section  className="px-6 md:pb-20 pt-20 mb:pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto grid min-h-[420px] max-w-7xl grid-cols-2 items-center gap-3 px-3 py-10 sm:min-h-[460px] sm:gap-6 sm:px-6 sm:py-14 lg:min-h-[520px] lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-20">

        {/* Content */}
        <div className="max-w-xl">

          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#167a9b] sm:mb-3 sm:text-xs lg:mb-4 lg:text-sm lg:tracking-[0.2em]">
            About Us
          </p>

          <h1 className="text-xl font-bold leading-[1.15] tracking-tight text-[#17202a] sm:text-3xl lg:text-6xl">
            We Turn Travel Plans Into{" "}
            <span className="text-[#167a9b]">
              Beautiful Memories
            </span>
          </h1>

          <p className="mt-3 max-w-lg text-[10px] leading-5 text-gray-600 sm:mt-4 sm:text-xs sm:leading-6 lg:mt-6 lg:text-base lg:leading-8">
            We are passionate about creating unforgettable travel
            experiences. From discovering new destinations to planning every
            little detail, we are here to make your journey simple,
            comfortable, and memorable.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3 lg:mt-8 lg:gap-4">

            <Link
              href="/packages"
              className="
                inline-flex
                items-center
                gap-1
                rounded-lg
                bg-[#062b4d]
                px-3
                py-2
                text-[9px]
                font-semibold
                text-white
                transition-all
                duration-500
                ease-in-out
                hover:scale-105
                hover:bg-white
                hover:text-[#062b4d]
                hover:shadow-lg
                sm:gap-1.5
                sm:px-4
                sm:py-2.5
                sm:text-[10px]
                lg:gap-2
                lg:rounded-xl
                lg:px-7
                lg:py-3.5
                lg:text-sm
              "
            >
              Explore Packages
              <ArrowUpRight
                size={12}
                className="sm:h-3.5 sm:w-3.5 lg:h-[17px] lg:w-[17px]"
              />
            </Link>

            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                rounded-lg
                border
                border-[#167a9b]/30
                bg-white/60
                px-3
                py-2
                text-[9px]
                font-semibold
                text-[#167a9b]
                transition-all
                duration-300
                hover:bg-white
                sm:px-4
                sm:py-2.5
                sm:text-[10px]
                lg:rounded-xl
                lg:px-7
                lg:py-3.5
                lg:text-sm
              "
            >
              Talk To Us
            </Link>

          </div>
        </div>


        {/* Image */}
        <div className="relative mx-auto h-[230px] w-full max-w-lg sm:h-[300px] lg:h-[440px]">

          <div className="absolute inset-0 rounded-[22px] bg-[#a9dfed] sm:rounded-[30px] lg:rounded-[40px]" />

          <div className="absolute inset-2 overflow-hidden rounded-[18px] sm:inset-2.5 sm:rounded-[25px] lg:inset-3 lg:rounded-[34px]">
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
   <section className="mb-10 px-3 py-10 sm:px-6 sm:py-14 lg:mb-0 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-2 lg:gap-14">

        {/* Mobile Heading */}
        <div className="col-span-2 lg:hidden">
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4daecb] sm:mb-2 sm:text-xs">
            Who We Are
          </p>

          <h2 className="text-lg font-bold leading-tight text-[#17202a] sm:text-2xl">
            More Than Just A Travel Agency
          </h2>
        </div>


        {/* Image */}
        <div className="relative h-[250px] overflow-hidden rounded-[18px] bg-[#e8f7fc] sm:h-[350px] sm:rounded-[24px] lg:h-[480px] lg:rounded-[30px]">
          <Image
            src="/images/about/about-team.jpg"
            alt="Our travel team"
            fill
            className="object-cover"
          />
        </div>


        {/* Content */}
        <div>

          {/* Desktop Heading */}
          <div className="hidden lg:block">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#4daecb]">
              Who We Are
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#17202a]">
              More Than Just A Travel Agency
            </h2>
          </div>

          {/* Description */}
          <p className="mt-0 text-[10px] leading-5 text-gray-600 sm:text-xs sm:leading-6 lg:mt-6 lg:text-base lg:leading-7">
            We believe travel is more than visiting a destination. It is
            about discovering new cultures, spending quality time with
            people you love, and creating stories that stay with you.
          </p>

          <p className="mt-2.5 text-[10px] leading-5 text-gray-600 sm:text-xs sm:leading-6 lg:mt-4 lg:text-base lg:leading-7">
            Our goal is to take away the stress of planning so you can focus
            on enjoying your journey. Whether you are looking for a relaxing
            holiday, a family adventure, or an unforgettable international
            trip, we help bring your travel ideas to life.
          </p>

          {/* Desktop Reasons */}
          <div className="mt-4 hidden grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-4">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-1.5 sm:gap-2 lg:gap-3"
              >
                <CheckCircle2
                  size={14}
                  className="
                    mt-0.5
                    shrink-0
                    text-[#4daecb]
                    sm:h-4
                    sm:w-4
                    lg:h-[19px]
                    lg:w-[19px]
                  "
                />

                <span className="text-[9px] font-medium leading-4 text-gray-700 sm:text-xs sm:leading-5 lg:text-sm">
                  {reason}
                </span>
              </div>
            ))}
          </div>

        </div>


        {/* Mobile Reasons */}
        <div className="col-span-2 grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
          {reasons.map((reason) => (
            <div
              key={reason}
              className="flex items-start gap-1.5 sm:gap-2"
            >
              <CheckCircle2
                size={14}
                className="
                  mt-0.5
                  shrink-0
                  text-[#4daecb]
                  sm:h-4
                  sm:w-4
                "
              />

              <span className="text-[9px] font-medium leading-4 text-gray-700 sm:text-xs sm:leading-5">
                {reason}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>

      {/* Mission */}
     <section className="bg-gradient-to-b from-[#f4fbfd] to-[#cfeef8] px-3 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#167a9b] sm:text-xs lg:text-sm lg:tracking-[0.2em]">
            Our Mission
          </p>

          <h2 className="mt-1.5 text-xl font-bold leading-tight text-[#17202a] sm:mt-2 sm:text-2xl lg:mt-3 lg:text-4xl">
            Making Every Journey Feel Effortless
          </h2>

          <p className="mx-auto mt-3 max-w-[300px] text-[10px] leading-5 text-gray-600 sm:mt-4 sm:max-w-2xl sm:text-xs sm:leading-6 lg:mt-6 lg:text-base lg:leading-8">
            Our mission is simple — to make travel easier, more accessible,
            and more enjoyable for everyone. We combine thoughtful planning,
            trusted services, and personalized support to create journeys
            that travelers can truly enjoy.
          </p>

        </div>
      </section>

      {/* Values */}
     <section className="px-3 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#4daecb] sm:text-xs lg:text-sm lg:tracking-[0.2em]">
              What Matters To Us
            </p>

            <h2 className="mt-1.5 text-xl font-bold leading-tight text-[#17202a] sm:mt-2 sm:text-2xl lg:mt-3 lg:text-4xl">
              Why Travelers Choose Us
            </h2>

            <p className="mt-2 text-[10px] leading-5 text-gray-600 sm:mt-3 sm:text-xs sm:leading-6 lg:mt-4 lg:text-base lg:leading-7">
              We focus on the things that make a travel experience genuinely
              enjoyable.
            </p>

          </div>

          {/* Values */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="
                    rounded-xl
                    border
                    border-gray-100
                    bg-white
                    p-3
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    sm:rounded-2xl
                    sm:p-5
                    lg:p-7
                  "
                >

                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#cfeef8]
                      text-[#167a9b]
                      sm:h-11
                      sm:w-11
                      sm:rounded-xl
                      lg:h-12
                      lg:w-12
                    "
                  >
                    <Icon
                      size={17}
                      className="sm:h-5 sm:w-5 lg:h-[23px] lg:w-[23px]"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mt-3
                      text-sm
                      font-semibold
                      leading-tight
                      text-[#17202a]
                      sm:mt-4
                      sm:text-base
                      lg:mt-6
                      lg:text-lg
                    "
                  >
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-1.5
                      text-[9px]
                      leading-4
                      text-gray-600
                      sm:mt-2
                      sm:text-xs
                      sm:leading-5
                      lg:mt-3
                      lg:text-sm
                      lg:leading-7
                    "
                  >
                    {value.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-15 sm:px-6 sm:pb-14 lg:px-12 lg:pb-20">
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-2xl
            bg-gradient-to-r
            from-[#5db3d1]
            via-[#69bfdc]
            to-[#b9e8f5]
            px-4
            py-8
            sm:rounded-[24px]
            sm:px-8
            sm:py-10
            lg:rounded-[30px]
            lg:px-16
            lg:py-14
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-5
              text-center
              sm:gap-6
              lg:flex-row
              lg:gap-8
              lg:text-left
            "
          >

            {/* Content */}
            <div>

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white/80
                  sm:text-xs
                  lg:text-sm
                  lg:tracking-[0.2em]
                "
              >
                Ready To Travel?
              </p>

              <h2
                className="
                  mt-1.5
                  text-xl
                  font-bold
                  leading-tight
                  text-white
                  sm:mt-2
                  sm:text-2xl
                  lg:mt-3
                  lg:text-4xl
                "
              >
                Your Next Adventure Starts Here
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[280px]
                  text-[10px]
                  leading-5
                  text-white/80
                  sm:mt-3
                  sm:max-w-xl
                  sm:text-xs
                  sm:leading-6
                  lg:mx-0
                  lg:text-sm
                  lg:leading-7
                "
              >
                Tell us where you want to go and let our team help you plan
                the perfect journey.
              </p>

            </div>

            {/* Button */}
            <Link
              href="/contact"
              className="
                inline-flex
                shrink-0
                items-center
                gap-1.5
                rounded-lg
                bg-[#17202a]
                px-4
                py-2.5
                text-[10px]
                font-semibold
                text-white
                transition-all
                duration-500
                hover:scale-105
                hover:bg-white
                hover:text-[#17202a]
                hover:shadow-lg
                sm:gap-2
                sm:rounded-xl
                sm:px-5
                sm:py-3
                sm:text-xs
                lg:px-7
                lg:py-3.5
                lg:text-sm
              "
            >
              Plan My Trip

              <ArrowUpRight
                size={13}
                className="sm:h-4 sm:w-4 lg:h-[17px] lg:w-[17px]"
              />
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