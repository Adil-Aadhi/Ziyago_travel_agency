"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Packages", href: "/packages" },
  { name: "Videos", href: "/videos" },
  { name: "Upcoming Tours", href: "/upcoming-tours" },
  { name: "Contact Us", href: "/contact" },
];

const locations = [
  "Kochi",
  "Calicut",
  "Malappuram",
  "Bangalore",
];

export default function Footer() {
  return (
    <footer data-navbar-theme="dark" className="relative z-0 bg-[#17202a] pt-16 text-white md:pt-28">
      <div className="mx-auto max-w-7xl px-3 py-10 sm:px-8 sm:py-16 lg:px-12">

        {/* Main Footer */}
        <div className="grid grid-cols-3 gap-7 md:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* Logo / About */}
          <div className="col-span-full lg:col-span-1">

            <Link href="/" className="inline-block">
              <Image
                src="/logo/logo.svg"
                alt="Travel Agency"
                width={150}
                height={50}
                className="
                  h-auto
                  w-[150px]
                  sm:w-[190px]
                  lg:w-[250px]
                "
              />
            </Link>

            <p
              className="
                mt-3
                max-w-sm
                text-[10px]
                leading-5
                text-white/70
                sm:mt-5
                sm:text-xs
                sm:leading-6
                lg:mt-6
                lg:text-sm
                lg:leading-7
              "
            >
              Discover unforgettable journeys with carefully planned travel
              experiences, personalized packages, and reliable service from
              start to finish.
            </p>

            {/* Social Media */}
            <div className="mt-4 flex items-center gap-2 sm:mt-6 sm:gap-3 lg:mt-7">

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#cfeef8]
                  hover:bg-[#cfeef8]
                  hover:text-[#062b4d]
                  sm:h-9
                  sm:w-9
                  lg:h-10
                  lg:w-10
                "
              >
                <FaFacebookF
                  size={13}
                  className="sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
                />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#cfeef8]
                  hover:bg-[#cfeef8]
                  hover:text-[#062b4d]
                  sm:h-9
                  sm:w-9
                  lg:h-10
                  lg:w-10
                "
              >
                <FaInstagram
                  size={13}
                  className="sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
                />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white/70
                  transition-all
                  duration-300
                  hover:border-[#cfeef8]
                  hover:bg-[#cfeef8]
                  hover:text-[#062b4d]
                  sm:h-9
                  sm:w-9
                  lg:h-10
                  lg:w-10
                "
              >
                <FaYoutube
                  size={13}
                  className="sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
                />
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>

            <h3
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white
                sm:text-xs
                lg:text-sm
                lg:tracking-[0.15em]
              "
            >
              Quick Links
            </h3>

            <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-2.5 lg:mt-6 lg:space-y-3">

              {quickLinks.map((link) => (
                <li key={link.name}>

                  <Link
                    href={link.href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-0.5
                      text-[9px]
                      text-white/65
                      transition-colors
                      duration-300
                      hover:text-white
                      sm:text-[11px]
                      lg:gap-1
                      lg:text-sm
                    "
                  >
                    {link.name}

                    <ArrowUpRight
                      size={10}
                      className="
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:opacity-100
                        lg:h-[13px]
                        lg:w-[13px]
                      "
                    />
                  </Link>

                </li>
              ))}

            </ul>
          </div>


          {/* Locations */}
          <div>

            <h3
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white
                sm:text-xs
                lg:text-sm
                lg:tracking-[0.15em]
              "
            >
              Our Locations
            </h3>

            <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3 lg:mt-6 lg:space-y-4">

              {locations.map((location) => (
                <li
                  key={location}
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[9px]
                    text-white/65
                    sm:gap-2
                    sm:text-[11px]
                    lg:gap-3
                    lg:text-sm
                  "
                >
                  <MapPin
                    size={12}
                    className="
                      shrink-0
                      text-[#8ed8eb]
                      sm:h-3.5
                      sm:w-3.5
                      lg:h-[17px]
                      lg:w-[17px]
                    "
                  />

                  <span>{location}</span>
                </li>
              ))}

            </ul>
          </div>


          {/* Contact */}
          <div>

            <h3
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white
                sm:text-xs
                lg:text-sm
                lg:tracking-[0.15em]
              "
            >
              Get In Touch
            </h3>

            <div className="mt-3 space-y-3 sm:mt-5 sm:space-y-4 lg:mt-6 lg:space-y-5">

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="group flex items-start gap-1.5 sm:gap-2.5 lg:gap-3"
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-[#8ed8eb]
                    transition-all
                    duration-300
                    group-hover:bg-[#cfeef8]
                    group-hover:text-[#062b4d]
                    sm:h-8
                    sm:w-8
                    lg:h-10
                    lg:w-10
                  "
                >
                  <Phone
                    size={12}
                    className="sm:h-3.5 sm:w-3.5 lg:h-[17px] lg:w-[17px]"
                  />
                </span>

                <div className="min-w-0">

                  <p className="text-[8px] text-white/45 sm:text-[10px] lg:text-xs">
                    Call Us
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/80 sm:text-[10px] lg:mt-1 lg:text-sm">
                    +91 98765 43210
                  </p>

                </div>
              </a>


              {/* Email */}
              <a
                href="mailto:info@yourtravelagency.com"
                className="group flex items-start gap-1.5 sm:gap-2.5 lg:gap-3"
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-[#8ed8eb]
                    transition-all
                    duration-300
                    group-hover:bg-[#cfeef8]
                    group-hover:text-[#062b4d]
                    sm:h-8
                    sm:w-8
                    lg:h-10
                    lg:w-10
                  "
                >
                  <Mail
                    size={12}
                    className="sm:h-3.5 sm:w-3.5 lg:h-[17px] lg:w-[17px]"
                  />
                </span>

                <div className="min-w-0">

                  <p className="text-[8px] text-white/45 sm:text-[10px] lg:text-xs">
                    Email Us
                  </p>

                  <p className="mt-0.5 break-all text-[8px] text-white/80 sm:text-[10px] lg:mt-1 lg:text-sm">
                    info@yourtravelagency.com
                  </p>

                </div>
              </a>


              {/* Address */}
              <div className="flex items-start gap-1.5 sm:gap-2.5 lg:gap-3">

                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-[#8ed8eb]
                    sm:h-8
                    sm:w-8
                    lg:h-10
                    lg:w-10
                  "
                >
                  <MapPin
                    size={12}
                    className="sm:h-3.5 sm:w-3.5 lg:h-[17px] lg:w-[17px]"
                  />
                </span>

                <div>

                  <p className="text-[8px] text-white/45 sm:text-[10px] lg:text-xs">
                    Head Office
                  </p>

                  <p className="mt-0.5 text-[9px] leading-4 text-white/80 sm:text-[10px] lg:mt-1 lg:text-sm lg:leading-6">
                    Kerala, India
                  </p>

                </div>

              </div>

            </div>
          </div>

        </div>


        {/* Divider */}
        <div className="my-6 h-px bg-white/10 sm:my-8 lg:my-10" />


        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            gap-2
            text-center
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-left
            lg:gap-4
          "
        >

          <p className="text-[9px] text-white/45 sm:text-[10px] lg:text-xs">
            © {new Date().getFullYear()} Your Travel Agency. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">

            <Link
              href="/privacy"
              className="text-[9px] text-white/45 transition-colors duration-300 hover:text-white sm:text-[10px] lg:text-xs"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-[9px] text-white/45 transition-colors duration-300 hover:text-white sm:text-[10px] lg:text-xs"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}