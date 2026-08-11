"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Images,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Packages",
    href: "/admin/packages",
    icon: Package,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    name: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
];

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-64
          flex-col
          border-r
          border-gray-100
          bg-white
          transition-transform
          duration-300
          lg:static
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Ziya<span className="text-orange-500">Go</span>
            </h1>

            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              Admin Panel
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Management
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-orange-50 text-orange-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-4">
          <button
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-gray-500
              transition
              hover:bg-red-50
              hover:text-red-500
            "
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}