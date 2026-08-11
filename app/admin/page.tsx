"use client";

import { useState } from "react";
import {
  Package,
  Images,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const stats = [
  {
    title: "Total Packages",
    value: "12",
    change: "+3 this month",
    icon: Package,
  },
  {
    title: "Gallery Images",
    value: "24",
    change: "+8 this month",
    icon: Images,
  },
  {
    title: "Enquiries",
    value: "18",
    change: "+5 this week",
    icon: MessageSquare,
  },
  {
    title: "Active Packages",
    value: "10",
    change: "83% active",
    icon: TrendingUp,
  },
];

const recentPackages = [
  {
    title: "Switzerland Escape",
    location: "Switzerland",
    price: "₹1,25,000",
    status: "Active",
  },
  {
    title: "Japan Sakura Tour",
    location: "Japan",
    price: "₹98,000",
    status: "Active",
  },
  {
    title: "Luxury Dubai",
    location: "Dubai",
    price: "₹72,000",
    status: "Active",
  },
  {
    title: "Iceland Adventure",
    location: "Iceland",
    price: "₹1,45,000",
    status: "Draft",
  },
];

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafb]">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">

          <AdminHeader
            onMenuClick={() => setMobileOpen(true)}
          />

          <main className="flex-1 p-5 md:p-8">

            {/* Welcome */}
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium text-orange-500">
                  OVERVIEW
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                  Welcome back, Admin
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Here's what's happening with your travel agency.
                </p>
              </div>

              <a
                href="/admin/packages/add"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-orange-600
                "
              >
                <Plus size={18} />
                Add Package
              </a>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="
                      rounded-2xl
                      border
                      border-gray-100
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-md
                    "
                  >
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-sm text-gray-500">
                          {stat.title}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Icon size={21} />
                      </div>

                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600">
                      <ArrowUpRight size={14} />
                      {stat.change}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Content */}
            <div className="mt-8 grid gap-6 xl:grid-cols-3">

              {/* Recent Packages */}
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Recent Packages
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      Recently added travel packages
                    </p>
                  </div>

                  <a
                    href="/admin/packages"
                    className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                  >
                    View all
                  </a>

                </div>

                <div className="divide-y divide-gray-100">

                  {recentPackages.map((pkg) => (
                    <div
                      key={pkg.title}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-800">
                          {pkg.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          {pkg.location}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {pkg.price}
                        </p>

                        <span
                          className={`
                            mt-1
                            inline-block
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            ${
                              pkg.status === "Active"
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            }
                          `}
                        >
                          {pkg.status}
                        </span>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <h2 className="font-semibold text-gray-900">
                  Quick Actions
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Manage your website content
                </p>

                <div className="mt-6 space-y-3">

                  <a
                    href="/admin/packages/add"
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-orange-200
                      hover:bg-orange-50
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-orange-50 p-2 text-orange-500">
                        <Package size={18} />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        Add Package
                      </span>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-gray-400"
                    />
                  </a>

                  <a
                    href="/admin/gallery"
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-orange-200
                      hover:bg-orange-50
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-orange-50 p-2 text-orange-500">
                        <Images size={18} />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        Manage Gallery
                      </span>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-gray-400"
                    />
                  </a>

                  <a
                    href="/admin/enquiries"
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-gray-100
                      p-4
                      transition
                      hover:border-orange-200
                      hover:bg-orange-50
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-orange-50 p-2 text-orange-500">
                        <MessageSquare size={18} />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        View Enquiries
                      </span>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-gray-400"
                    />
                  </a>

                </div>

              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}