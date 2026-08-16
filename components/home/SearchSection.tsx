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
    <div className="rounded-3xl bg-white p-3 md:p-5 shadow-2xl">

      <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-1 md:gap-4 md:grid-cols-[1fr_1fr_auto]">

        {/* =================================
            DESTINATION
        ================================= */}

        <div className="relative border-r px-2 md:px-4">

          <button
            type="button"
            onClick={() =>
              setDestinationOpen(
                (open) => !open
              )
            }
            className="flex w-full items-center gap-2 text-left md:gap-4"
          >

            <MapPin
              className="shrink-0 text-blue-500 md:size-[24px]"
            />

            <div className="min-w-0 flex-1">

              <p className="text-[10px] text-gray-500 md:text-sm">
                  Where
                </p>

                <p className="truncate text-xs font-medium text-gray-900 md:text-base">
                  {selectedDestination || (
                    <>
                      <span className="md:hidden">Destination</span>
                      <span className="hidden md:inline">Select Destination</span>
                    </>
                  )}
                </p>

            </div>

            <ChevronDown
              size={14}
              className="shrink-0 text-gray-400 md:size-[18px]"
            />

          </button>

          {destinationOpen && (
            <div className="absolute left-0 top-full z-50 mt-3 w-[180px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl md:left-4 md:right-4 md:w-auto">

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
                      hover:bg-blue-50
                      hover:text-blue-500
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

        <div className="relative px-2 md:px-4">

          <button
            type="button"
            onClick={() =>
              setTourTypeOpen(
                (open) => !open
              )
            }
            className="flex w-full items-center gap-1 text-left md:gap-4"
          >

            <Flag
              className="shrink-0 text-blue-500 md:size-[24px]"
            />

            <div className="min-w-0 flex-1">

              <p className="text-[10px] text-gray-500 md:text-sm">
                Tour Type
              </p>

              <p className="truncate text-xs font-medium text-gray-900 md:text-base">
                {selectedTourType || "All Tours"}
              </p>

            </div>

            <ChevronDown
              size={14}
              className="shrink-0 text-gray-400 md:size-[18px]"
            />

          </button>

          {tourTypeOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-[150px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl md:left-4 md:right-4 md:w-auto">

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
                      hover:bg-blue-50
                      hover:text-blue-500
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
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-900
              p-0
              text-white
              transition
              hover:bg-blue-950
              hover:cursor-pointer

              md:h-14
              md:w-auto
              md:shrink
              md:gap-2
              md:rounded-2xl
              md:px-6
          "
        >

          <Search size={16} className="md:size-[21px]" />

        </button>

      </div>

    </div>
  );
}