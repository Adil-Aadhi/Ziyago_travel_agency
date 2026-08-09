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
    <footer className="relative z-0 bg-[#17202a] pt-28 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* Logo / About */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo/logo.svg"
                alt="Travel Agency"
                width={150}
                height={50}
                className="h-auto w-[250px]"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              Discover unforgettable journeys with carefully planned travel
              experiences, personalized packages, and reliable service from
              start to finish.
            </p>

            {/* Social Media */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#cfeef8] hover:bg-[#cfeef8] hover:text-[#062b4d]"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#cfeef8] hover:bg-[#cfeef8] hover:text-[#062b4d]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#cfeef8] hover:bg-[#cfeef8] hover:text-[#062b4d]"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Our Locations
            </h3>

            <ul className="mt-6 space-y-4">
              {locations.map((location) => (
                <li
                  key={location}
                  className="flex items-center gap-3 text-sm text-white/65"
                >
                  <MapPin
                    size={17}
                    className="shrink-0 text-[#8ed8eb]"
                  />

                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
              Get In Touch
            </h3>

            <div className="mt-6 space-y-5">

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#8ed8eb] transition-all duration-300 group-hover:bg-[#cfeef8] group-hover:text-[#062b4d]">
                  <Phone size={17} />
                </span>

                <div>
                  <p className="text-xs text-white/45">
                    Call Us
                  </p>

                  <p className="mt-1 text-sm text-white/80 transition-colors group-hover:text-white">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@yourtravelagency.com"
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#8ed8eb] transition-all duration-300 group-hover:bg-[#cfeef8] group-hover:text-[#062b4d]">
                  <Mail size={17} />
                </span>

                <div>
                  <p className="text-xs text-white/45">
                    Email Us
                  </p>

                  <p className="mt-1 break-all text-sm text-white/80 transition-colors group-hover:text-white">
                    info@yourtravelagency.com
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#8ed8eb]">
                  <MapPin size={17} />
                </span>

                <div>
                  <p className="text-xs text-white/45">
                    Head Office
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/80">
                    Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Your Travel Agency. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/45 transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-white/45 transition-colors duration-300 hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}