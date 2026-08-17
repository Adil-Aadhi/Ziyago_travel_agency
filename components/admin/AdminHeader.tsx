"use client";

import { Menu, Bell } from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-14
        items-center
        justify-between
        border-b
        border-gray-100
        bg-white
        px-3
        shadow-sm
        sm:h-16
        sm:px-5
        md:h-20
        md:px-8
      "
    >

      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="
          rounded-lg
          p-1.5
          text-gray-600
          hover:bg-gray-100
          sm:rounded-xl
          sm:p-2
          lg:hidden
        "
      >
        <Menu
          size={19}
          className="sm:h-[22px] sm:w-[22px]"
        />
      </button>

     {/* Desktop */}
      <div className="hidden lg:block">
        <p className="text-sm text-gray-400">
          Admin Panel
        </p>

        <h2 className="text-lg font-semibold text-gray-900">
          Dashboard
        </h2>
      </div>

      {/* Mobile */}
      <div className="ml-[2px] lg:hidden">
        <p className="text-[9px] text-gray-400">
          Admin Panel
        </p>

        <h2 className="text-xs font-semibold text-gray-900">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4">

        <div className="flex items-center gap-2 border-l border-gray-100 pl-2 sm:gap-3 sm:pl-4">

          {/* Avatar */}
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              text-xs
              font-bold
              text-white
              shadow-sm
              sm:h-9
              sm:w-9
              sm:text-sm
            "
          >
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>

            <p className="text-xs text-gray-400">
              Administrator
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}