"use client";

import { useState } from "react";
import {
  MapPin,
  Flag,
  Search,
  ChevronDown,
} from "lucide-react";

type SearchSectionProps = {
  destination: string;
  tourType: string;
  onDestinationChange: (value: string) => void;
  onTourTypeChange: (value: string) => void;
  onSearch: (
    destination: string,
    tourType: string
  ) => void;
};

const destinations = [
  "All Destinations",
  "Dubai",
  "Maldives",
  "Switzerland",
  "Paris",
  "Bali",
  "Singapore",
  "Italy",
  "Thailand",
];

const tourTypes = [
  "All Tours",
  "Adventure",
  "Family",
  "Honeymoon",
];

export default function SearchSection({
  destination,
  tourType,
  onDestinationChange,
  onTourTypeChange,
  onSearch,
}: SearchSectionProps) {
  const [destinationOpen, setDestinationOpen] =
    useState(false);

  const [tourTypeOpen, setTourTypeOpen] =
    useState(false);

  // Temporary selections
  const [selectedDestination, setSelectedDestination] =
    useState(destination);

  const [selectedTourType, setSelectedTourType] =
    useState(tourType);

  const handleSearch = () => {
    // Apply selected values only when Search is clicked
    onDestinationChange(
      selectedDestination
    );

    onTourTypeChange(
      selectedTourType
    );

    onSearch(
      selectedDestination,
      selectedTourType
    );
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-2xl">

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_1fr_auto]">

        {/* =================================
            DESTINATION
        ================================= */}

        <div className="relative border-r px-4">

          <button
            type="button"
            onClick={() =>
              setDestinationOpen(
                (open) => !open
              )
            }
            className="flex w-full items-center gap-4 text-left"
          >

            <MapPin
              className="shrink-0 text-orange-500"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm text-gray-500">
                Where
              </p>

              <p className="truncate font-medium text-gray-900">
                {selectedDestination ||
                  "Select Destination"}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-gray-400"
            />

          </button>

          {destinationOpen && (
            <div className="absolute left-4 right-4 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">

              {destinations.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {

                      setSelectedDestination(
                        item ===
                          "All Destinations"
                          ? ""
                          : item
                      );

                      setDestinationOpen(
                        false
                      );
                    }}
                    className="
                      w-full
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      text-gray-700
                      transition
                      hover:bg-orange-50
                      hover:text-orange-500
                    "
                  >
                    {item}
                  </button>
                )
              )}

            </div>
          )}

        </div>

        {/* =================================
            TOUR TYPE
        ================================= */}

        <div className="relative px-4">

          <button
            type="button"
            onClick={() =>
              setTourTypeOpen(
                (open) => !open
              )
            }
            className="flex w-full items-center gap-4 text-left"
          >

            <Flag
              className="shrink-0 text-orange-500"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm text-gray-500">
                Tour Type
              </p>

              <p className="truncate font-medium text-gray-900">
                {selectedTourType ||
                  "All Tours"}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-gray-400"
            />

          </button>

          {tourTypeOpen && (
            <div className="absolute left-4 right-4 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">

              {tourTypes.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {

                      setSelectedTourType(
                        item ===
                          "All Tours"
                          ? ""
                          : item
                      );

                      setTourTypeOpen(
                        false
                      );
                    }}
                    className="
                      w-full
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      text-gray-700
                      transition
                      hover:bg-orange-50
                      hover:text-orange-500
                    "
                  >
                    {item}
                  </button>
                )
              )}

            </div>
          )}

        </div>

        {/* =================================
            SEARCH BUTTON
        ================================= */}

        <button
          type="button"
          onClick={handleSearch}
          className="
            flex
            h-14
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-orange-500
            px-6
            text-white
            transition
            hover:bg-orange-600
          "
        >

          <Search size={21} />

          <span className="font-medium md:hidden">
            Search
          </span>

        </button>

      </div>

    </div>
  );
}