import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Services from "@/components/home/services";
import Destinations from "@/components/home/Destinations";

export default function HomePage() {
    return (
        <main>
            <Hero />

            {/* Search */}
            <div data-navbar-theme="light" className="absolute left-1/2 bottom-[20px] z-30 w-full max-w-6xl -translate-x-1/2 px-6">
                <SearchSection />
            </div>

            {/* Main content */}
            <div data-navbar-theme="light"
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
        </main>
    );
}