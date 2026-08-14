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
            </div>

            {/* Stats */}

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* Total Packages */}

                <div className="
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                ">
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Total Packages
                      </p>

                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {loading
                          ? "—"
                          : stats?.totalPackages ?? 0}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <Package size={21} />
                    </div>

                  </div>
                </div>


                {/* Gallery */}

                <div className="
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                ">
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Gallery Images
                      </p>

                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {loading
                          ? "—"
                          : stats?.galleryItems ?? 0}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <Images size={21} />
                    </div>

                  </div>
                </div>


                {/* Enquiries */}

                <div className="
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                ">
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Enquiries
                      </p>

                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {loading
                          ? "—"
                          : stats?.enquiries ?? 0}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <MessageSquare size={21} />
                    </div>

                  </div>
                </div>


                {/* Active Packages */}

                <div className="
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                ">
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Active Packages
                      </p>

                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {loading
                          ? "—"
                          : stats?.activePackages ?? 0}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <TrendingUp size={21} />
                    </div>

                  </div>
                </div>

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
                          {pkg.destination}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{pkg.price.toLocaleString("en-IN")}
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
                    href="/admin/packages/"
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
                        Manage Package
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
                    href="/admin/contact-enquiries"
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