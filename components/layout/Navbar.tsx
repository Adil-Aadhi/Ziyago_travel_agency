"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Packages", href: "/packages" },
    { name: "Videos", href: "/videos" },
    { name: "Upcoming", href: "/upcoming" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {

const { scrollY } = useScroll();

const [scrolled, setScrolled] = useState(false);

useMotionValueEvent(scrollY, "change", (latest) => {
  setScrolled(latest > 50);
});

    return (
        <motion.header
            transition={{
                duration: 0.35,
            }}
            className="fixed top-0 left-0 z-50 w-full"
            >
            <div
                className={`
                    mx-auto
                    mt-5
                    flex
                    max-w-7xl
                    items-center
                    justify-between
                    rounded-full
                    border
                    px-8
                    transition-all
                    duration-500

                    ${
                    scrolled
                        ? "border-white/20 bg-white/15 backdrop-blur-2xl shadow-2xl"
                        : "border-white/10 bg-white/5 backdrop-blur-xl"
                    }
                `}
                >
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                <motion.div
                animate={{
                    scale: scrolled ? 0.9 : 1,
                }}
                >
                    Travel Agency
                </motion.div>   
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="font-medium text-white/60 transition-colors hover:text-white/100"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA Button */}
                <Link
                    href="/contact"
                    className="rounded-full bg-orange-600 px-8 py-2 m-1.5 font-medium text-white transition hover:bg-orange-700"
                >
                    Book Now
                </Link>
            </div>
        </motion.header>
    );
}