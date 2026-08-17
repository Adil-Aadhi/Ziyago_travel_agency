"use client";

import { useState, useEffect } from "react";
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



type DashboardStats = {
  totalPackages: number;
  galleryItems: number;
  enquiries: number;
  activePackages: number;
};

type RecentPackage = {
  _id: string;
  title: string;
  destination: string;
  price: number;
  status: string;
  isActive: boolean;
  createdAt: string;
};

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [recentPackages, setRecentPackages] =
    useState<RecentPackage[]>([]);

  const [loading, setLoading] =
    useState(true);

    useEffect(() => {
      const fetchDashboard = async () => {
        try {
          setLoading(true);

          const response = await fetch(
            "/api/admin/dashboard",
            {
              method: "GET",
              cache: "no-store",
            }
          );

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(
              data.message ||
                "Failed to fetch dashboard data"
            );
          }

          setStats(data.stats);
          setRecentPackages(
            data.recentPackages || []
          );
        } catch (error) {
          console.error(
            "FETCH DASHBOARD ERROR:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

      fetchDashboard();
    }, []);

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

        <main className="flex-1 p-3 sm:p-5 md:p-8">

          {/* Welcome */}
          <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium text-blue-600 sm:text-sm">
                OVERVIEW
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back, Admin
              </h1>

              <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
                Here's what's happening with your travel agency.
              </p>
            </div>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">

            {/* Total Packages */}

            <div
              className="
                rounded-xl
                border
                border-cyan-100
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                p-3
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                sm:rounded-2xl
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-2">

                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white/80 sm:text-sm">
                    Total Packages
                  </p>

                  <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                    {loading
                      ? "—"
                      : stats?.totalPackages ?? 0}
                  </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm sm:h-11 sm:w-11 sm:rounded-xl">
                  <Package size={17} className="sm:h-[21px] sm:w-[21px]" />
                </div>

              </div>
            </div>


            {/* Gallery */}

            <div
              className="
                rounded-xl
                border
                border-emerald-100
                bg-gradient-to-br
                from-emerald-400
                to-green-600
                p-3
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                sm:rounded-2xl
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-2">

                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white/80 sm:text-sm">
                    Gallery Images
                  </p>

                  <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                    {loading
                      ? "—"
                      : stats?.galleryItems ?? 0}
                  </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm sm:h-11 sm:w-11 sm:rounded-xl">
                  <Images size={17} className="sm:h-[21px] sm:w-[21px]" />
                </div>

              </div>
            </div>


            {/* Enquiries */}

            <div
              className="
                rounded-xl
                border
                border-violet-100
                bg-gradient-to-br
                from-violet-400
                to-purple-600
                p-3
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                sm:rounded-2xl
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-2">

                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white/80 sm:text-sm">
                    Enquiries
                  </p>

                  <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                    {loading
                      ? "—"
                      : stats?.enquiries ?? 0}
                  </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm sm:h-11 sm:w-11 sm:rounded-xl">
                  <MessageSquare
                    size={17}
                    className="sm:h-[21px] sm:w-[21px]"
                  />
                </div>

              </div>
            </div>


            {/* Active Packages */}

            <div
              className="
                rounded-xl
                border
                border-sky-100
                bg-gradient-to-br
                from-sky-400
                to-indigo-600
                p-3
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                sm:rounded-2xl
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-2">

                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white/80 sm:text-sm">
                    Active Packages
                  </p>

                  <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                    {loading
                      ? "—"
                      : stats?.activePackages ?? 0}
                  </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm sm:h-11 sm:w-11 sm:rounded-xl">
                  <TrendingUp
                    size={17}
                    className="sm:h-[21px] sm:w-[21px]"
                  />
                </div>

              </div>
            </div>

          </div>


          {/* Content */}

          <div className="mt-5 grid gap-4 sm:mt-8 sm:gap-6 xl:grid-cols-3">

            {/* Recent Packages */}

            <div className="rounded-xl border border-gray-100 bg-white shadow-sm sm:rounded-2xl xl:col-span-2">

              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">

                <div>
                  <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                    Recent Packages
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                    Recently added travel packages
                  </p>
                </div>

                <a
                  href="/admin/packages"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 sm:text-sm"
                >
                  View all
                </a>

              </div>

              <div className="divide-y divide-gray-100">

                {recentPackages.map((pkg) => (
                  <div
                    key={pkg.title}
                    className="flex items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4"
                  >

                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                        {pkg.title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                        {pkg.destination}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">

                      <p className="text-xs font-semibold text-gray-900 sm:text-sm">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </p>

                      <span
                        className={`
                          mt-0.5
                          inline-block
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-semibold
                          sm:mt-1
                          sm:px-2.5
                          sm:py-1
                          sm:text-[10px]
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

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">

              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                Quick Actions
              </h2>

              <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                Manage your website content
              </p>

              <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">

                {/* Packages */}

                <a
                  href="/admin/packages/"
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-100
                    p-3
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    sm:rounded-xl
                    sm:p-4
                  "
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">

                    <div className="rounded-md bg-blue-50 p-1.5 text-blue-600 sm:rounded-lg sm:p-2">
                      <Package size={16} className="sm:h-[18px] sm:w-[18px]" />
                    </div>

                    <span className="text-xs font-medium text-gray-700 sm:text-sm">
                      Manage Package
                    </span>

                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-gray-400 sm:h-[17px] sm:w-[17px]"
                  />
                </a>


                {/* Gallery */}

                <a
                  href="/admin/gallery"
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-100
                    p-3
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    sm:rounded-xl
                    sm:p-4
                  "
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">

                    <div className="rounded-md bg-cyan-50 p-1.5 text-cyan-600 sm:rounded-lg sm:p-2">
                      <Images size={16} className="sm:h-[18px] sm:w-[18px]" />
                    </div>

                    <span className="text-xs font-medium text-gray-700 sm:text-sm">
                      Manage Gallery
                    </span>

                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-gray-400 sm:h-[17px] sm:w-[17px]"
                  />
                </a>


                {/* Enquiries */}

                <a
                  href="/admin/contact-enquiries"
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-100
                    p-3
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    sm:rounded-xl
                    sm:p-4
                  "
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">

                    <div className="rounded-md bg-indigo-50 p-1.5 text-indigo-600 sm:rounded-lg sm:p-2">
                      <MessageSquare
                        size={16}
                        className="sm:h-[18px] sm:w-[18px]"
                      />
                    </div>

                    <span className="text-xs font-medium text-gray-700 sm:text-sm">
                      View Enquiries
                    </span>

                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-gray-400 sm:h-[17px] sm:w-[17px]"
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