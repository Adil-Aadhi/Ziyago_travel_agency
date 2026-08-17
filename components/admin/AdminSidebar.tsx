"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Images,
  MessageSquare,
  LogOut,
  X,
  Star,
} from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import ConfirmModal from "../ui/ConfirmModal";

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
    name: "Booking",
    href: "/admin/bookings",
    icon: MessageSquare,
  },
  {
    name: "Contact-enquiry",
    href: "/admin/contact-enquiries",
    icon: MessageSquare,
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
];

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to logout"
        );
      }

      setShowLogoutModal(false);
      onClose?.();

      toast.success("Logged out successfully");

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to logout"
      );
    } finally {
      setLoggingOut(false);
    }
  };

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
          w-60
          flex-col
          border-r
          border-gray-100
          bg-white
          transition-transform
          duration-300
          sm:w-64
          lg:sticky
          lg:top-0
          lg:h-screen
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4 sm:h-20 sm:px-6">

          <div>
            <Image
              src="/logo/logo.svg"
              alt="ZiyaGo"
              width={120}
              height={25}
              className="h-auto w-[120px] object-contain sm:w-[140px]"
              priority
            />
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 sm:p-2 lg:hidden"
          >
            <X size={17} className="sm:h-[19px] sm:w-[19px]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-2.5 py-4 sm:space-y-1 sm:px-4 sm:py-6">

          <p className="mb-2 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:mb-3 sm:px-3 sm:text-[11px]">
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
                  gap-2.5
                  rounded-lg
                  px-2.5
                  py-2.5
                  text-xs
                  font-medium
                  transition-all
                  duration-200
                  sm:gap-3
                  sm:rounded-xl
                  sm:px-3
                  sm:py-3
                  sm:text-sm
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-600
                        text-white
                        shadow-md
                        shadow-blue-200/60
                      `
                      : `
                        text-gray-600
                        hover:bg-blue-50
                        hover:text-blue-600
                      `
                  }
                `}
              >
                <Icon
                  size={17}
                  className="shrink-0 sm:h-[19px] sm:w-[19px]"
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-2.5 sm:p-4">

          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="
              flex
              w-full
              items-center
              gap-2.5
              rounded-lg
              px-2.5
              py-2.5
              text-xs
              font-medium
              text-gray-500
              transition
              hover:bg-red-50
              hover:text-red-500
              sm:gap-3
              sm:rounded-xl
              sm:px-3
              sm:py-3
              sm:text-sm
            "
          >
            <LogOut
              size={17}
              className="sm:h-[19px] sm:w-[19px]"
            />

            Logout
          </button>

        </div>
      </aside>
      <ConfirmModal
        open={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout from the admin panel?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmClassName="bg-red-500 hover:bg-red-600"
        loading={loggingOut}
        onConfirm={handleLogout}
        onCancel={() => {
          if (!loggingOut) {
            setShowLogoutModal(false);
          }
        }}
      />
    </>
  );
}