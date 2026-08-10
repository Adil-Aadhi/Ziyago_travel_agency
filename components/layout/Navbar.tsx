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
    CalendarDays,
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
    // {
    //     name: "Upcoming",
    //     href: "/upcoming",
    //     icon: CalendarDays,
    // },
    {
        name: "Contact",
        href: "/contact",
        icon: Phone,
    },
];

export default function Navbar() {
    const { scrollY } = useScroll();

    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [lightBackground, setLightBackground] = useState(false);

    /* --------------------------------
       Detect scroll
    -------------------------------- */
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    /* --------------------------------
       Detect background behind navbar
    -------------------------------- */
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll(
                "[data-navbar-theme]"
            );

            let isLight = false;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                // Check the area where navbar is located
                if (rect.top <= 80 && rect.bottom >= 80) {
                    const theme =
                        section.getAttribute("data-navbar-theme");

                    if (theme === "light") {
                        isLight = true;
                    }
                }
            });

            setLightBackground(isLight);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* --------------------------------
       Collapse only when:
       scrolled + mouse outside
    -------------------------------- */
    const collapsed = scrolled && !hovered;

    /* --------------------------------
       Dynamic colors
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

    return (
        <motion.header
            className="fixed left-0 top-0 z-50 w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
                {/* =========================
                    LOGO
                ========================== */}

                <Link
                    href="/"
                    aria-label="Travel Agency"
                    className="shrink-0"
                >
                    <motion.div
                        animate={{
                            scale: collapsed ? 0.85 : 1,
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
                                    collapsed? "h-18": "h-20"
                                }
                                w-auto
                                transition-all
                                duration-200
                            `}
                        />
                    </motion.div>
                </Link>

                {/* =========================
                    NAVIGATION
                ========================== */}

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
                    <ul className={`
                        flex items-center
                        ${
                            collapsed
                                ? "gap-2"
                                : "justify-center gap-6"
                        }
                    `}>
                        {navLinks.map((link) => {
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
                                                    initial={{ opacity: 0, scale: 0.7 }}
                                                    animate={{ opacity: 1, scale: 1 }}
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
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
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

                {/* =========================
                    BOOK NOW
                ========================== */}

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
                            bg-orange-600
                            px-7
                            py-2
                            font-medium
                            text-white
                            transition
                            duration-150
                            hover:bg-orange-700
                        "
                    >
                        Book Now
                    </Link>
                </motion.div>
            </motion.div>
        </motion.header>
    );
}