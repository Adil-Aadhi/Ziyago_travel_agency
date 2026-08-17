"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

import {
  Home,
  Info,
  Briefcase,
  PlayCircle,
  Phone,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    name: "Packages",
    href: "/packages",
    icon: Briefcase,
  },
  {
    name: "Gallery",
    href: "/gallery",
    icon: PlayCircle,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
  },
];

const desktopExpandedLinks = navLinks.filter(
  (link) => link.name !== "Contact"
);

const mobileLinks = navLinks.filter(
  (link) => link.name !== "Contact"
);

export default function Navbar() {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] =
    useState(false);

  const [hovered, setHovered] =
    useState(false);

  const [lightBackground, setLightBackground] =
    useState(false);

  /* --------------------------------
     Scroll detection
  -------------------------------- */

  useMotionValueEvent(
    scrollY,
    "change",
    (latest) => {
      setScrolled(latest > 50);
    }
  );

  /* --------------------------------
     Detect background theme
  -------------------------------- */

  useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll(
      "[data-navbar-theme]"
    );

    let isLight = false;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (
        rect.top <= 80 &&
        rect.bottom >= 80
      ) {
        const theme = section.getAttribute(
          "data-navbar-theme"
        );

        if (theme === "light") {
          isLight = true;
        }
      }
    });

    // Mobile only:
    // If footer is visible anywhere in the viewport,
    // force dark navbar.
    if (window.innerWidth < 1024) {
      const footer = document.querySelector("footer");

      if (footer) {
        const rect = footer.getBoundingClientRect();

        const footerVisible =
          rect.top < window.innerHeight &&
          rect.bottom > 0;

        if (footerVisible) {
          isLight = false;
        }
      }
    }

    setLightBackground(isLight);
  };

  handleScroll();

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    handleScroll
  );

  return () => {
    window.removeEventListener(
      "scroll",
      handleScroll
    );

    window.removeEventListener(
      "resize",
      handleScroll
    );
  };
}, []);

  const collapsed =
    scrolled && !hovered;

  /* --------------------------------
     Desktop colors
  -------------------------------- */

  const textColor = lightBackground
    ? "text-[#11102d]"
    : "text-white/80";

  const hoverTextColor = lightBackground
    ? "hover:text-[#11102d]"
    : "hover:text-white";

  const hoverBackground = lightBackground
    ? "hover:bg-black/5"
    : "hover:bg-white/10";

  /* --------------------------------
     Mobile glass styles
  -------------------------------- */

  const mobileTextColor = lightBackground
    ? "text-gray-800"
    : "text-white";

  const mobileMutedTextColor =
    lightBackground
      ? "text-gray-900"
      : "text-white/100";

  const mobileGlass = lightBackground
    ? `
      border-black/10
      bg-white/30
      shadow-xl
    `
    : `
      border-white/20
      bg-white/15
      shadow-2xl
    `;

  const mobileHover =
    lightBackground
      ? "hover:bg-black/5"
      : "hover:bg-white/10";

  return (
    <>
      {/* =================================================
          DESKTOP NAVBAR
      ================================================= */}

      <motion.header
        className="
          fixed
          left-0
          top-0
          z-50
          hidden
          w-full
          lg:block
        "
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 35,
            mass: 0.5,
          }}
          className={`
            mx-auto
            mt-5
            flex
            h-16
            items-center
            rounded-full
            border
            transition-colors
            duration-200

            ${
              collapsed
                ? "w-fit px-3"
                : "w-[calc(100%-48px)] max-w-6xl px-6"
            }

            ${
              lightBackground
                ? "border-black/10 bg-white/30 shadow-lg backdrop-blur-2xl"
                : "border-white/20 bg-white/15 shadow-2xl backdrop-blur-2xl"
            }
          `}
        >
          {/* Logo */}

          <Link
            href="/"
            aria-label="Travel Agency"
            className="shrink-0"
          >
            <motion.div
              animate={{
                scale: collapsed
                  ? 0.85
                  : 1,
              }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              className="flex items-center"
            >
              <img
                src="/logo/logo.svg"
                alt="Travel Agency Logo"
                className={`
                  ${
                    collapsed
                      ? "h-18"
                      : "h-20"
                  }
                  w-auto
                  transition-all
                  duration-200
                `}
              />
            </motion.div>
          </Link>

          {/* Navigation */}

          <nav
            className={`
              overflow-hidden
              transition-all
              duration-150

              ${
                collapsed
                  ? "ml-3"
                  : "absolute left-1/2 -translate-x-1/2"
              }
            `}
          >
            <ul
              className={`
                flex items-center

                ${
                  collapsed
                    ? "gap-2"
                    : "justify-center gap-6"
                }
              `}
            >
              {(collapsed
                    ? navLinks
                    : desktopExpandedLinks
                    ).map((link) => {
                const Icon = link.icon;

                return (
                  <li
                    key={link.name}
                    className="shrink-0"
                  >
                    <Link
                      href={link.href}
                      title={
                        collapsed
                          ? link.name
                          : undefined
                      }
                      className={`
                        group
                        flex
                        items-center
                        rounded-full
                        px-3
                        py-2
                        ${textColor}
                        ${hoverTextColor}
                        ${hoverBackground}
                        transition-colors
                        duration-150
                      `}
                    >
                      {collapsed ? (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0.7,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.12,
                            ease: "easeOut",
                          }}
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.8}
                          />
                        </motion.div>
                      ) : (
                        <motion.span
                          initial={{
                            opacity: 0,
                            x: -5,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.12,
                            ease: "easeOut",
                          }}
                          className="whitespace-nowrap font-medium"
                        >
                          {link.name}
                        </motion.span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact Now */}

          <motion.div
            layout
            initial={false}
            animate={{
              width: collapsed
                ? 0
                : "auto",
              opacity: collapsed
                ? 0
                : 1,
              marginLeft: collapsed
                ? 0
                : "auto",
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <Link
              href="/contact"
              className="
                ml-4
                block
                whitespace-nowrap
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-7
                py-2
                font-medium
                text-white
                transition
                duration-150
                hover:from-cyan-600
                hover:to-blue-700
              "
            >
              Contact Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      <div className="lg:hidden">

        {/* ===============================================
            MOBILE TOP HEADER
        =============================================== */}

        <header
          className={`
            fixed
            left-1/2
            top-3
            z-50
            flex
            h-12
            w-[80%]
            -translate-x-1/2
            items-center
            justify-between
            rounded-2xl
            border
            px-4
            backdrop-blur-2xl
            transition-all
            duration-300
            ${mobileGlass}
                `}
        >
          {/* Logo */}

          <Link
            href="/"
            aria-label="Travel Agency"
            className="shrink-0"
          >
            <img
              src="/logo/logo.svg"
              alt="Travel Agency Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Book Now */}

        <Link
            href="/contact"
            className="
            flex
            h-7
            items-center
            justify-center
            rounded-lg
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-3
            text-[11px]
            font-semibold
            text-white
            shadow-sm
            transition
            hover:from-cyan-600
            hover:to-blue-700
          "
          >
            Contact
          </Link>
        </header>

        {/* ===============================================
            MOBILE BOTTOM NAVIGATION
        =============================================== */}

        <nav
          className="
            fixed
            bottom-0
            left-1/2
            z-50
            w-[80%]
            -translate-x-1/2
            pb-[calc(0.75rem+env(safe-area-inset-bottom))]
                "
        >
          <div
            className={`
              mx-auto
              flex
              h-[55px]
              max-w-md
              items-center
              justify-center
              rounded-2xl
              border
              px-1
              backdrop-blur-2xl
              transition-all
              duration-300
              ${mobileGlass}
            `}
          >
            {mobileLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                   group
                    flex
                    w-[68px]
                    flex-col
                    items-center
                    justify-center
                    gap-0.5
                    rounded-xl
                    px-1
                    py-1.5
                    transition-all
                    duration-200
                    ${mobileMutedTextColor}
                    ${mobileHover}
                    hover:text-orange-500
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  />

                  <span className="truncate text-[10px] font-medium">
                    {link.name === "About Us"
                      ? "About"
                      : link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

      </div>
    </>
  );
}