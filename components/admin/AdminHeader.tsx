"use client";

import { Menu, Bell } from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-100 bg-white px-5 md:px-8">
      
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-gray-400">
          Admin Panel
        </p>

        <h2 className="text-lg font-semibold text-gray-900">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-4">

        <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
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