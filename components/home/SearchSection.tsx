"use client";

import { MapPin, CalendarDays, Flag, Search } from "lucide-react";

export default function SearchSection() {
    return (
            <div className="rounded-3xl bg-white p-5 shadow-2xl">
                <div className="grid grid-cols-4 items-center gap-4">

                    {/* Destination */}
                    <div className="flex items-center gap-4 border-r px-4">
                        <MapPin className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Where</p>
                            <p className="font-medium">Select Destination</p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-4 border-r px-4">
                        <CalendarDays className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">When</p>
                            <p className="font-medium">Choose Date</p>
                        </div>
                    </div>

                    {/* Tour Type */}
                    <div className="flex items-center gap-4 px-4">
                        <Flag className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Tour Type</p>
                            <p className="font-medium">All Tours</p>
                        </div>
                    </div>

                    {/* Button */}
                    <button className="ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white transition hover:bg-orange-600">
                        <Search size={22} />
                    </button>

                </div>
            </div>
    );
}