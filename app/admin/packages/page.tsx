"use client";
import Link from "next/link";
import AddPackageModal from "@/components/admin/AddPackageModal";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  MapPin,
  Clock3,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  Package as PackageIcon,
  ChevronDown,
  FileText,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { toast  } from "sonner";
import ConfirmModal from "@/components/ui/ConfirmModal";

type PackageData = {
  _id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  mainImage: string;
  status: "Active" | "Draft";
};

export default function PackagesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [packages, setPackages] = useState<PackageData[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletePackageId, setDeletePackageId] = useState<string | null>(null);

  const [deleting, setDeleting] = useState(false);

  const [draftPackageId, setDraftPackageId] = useState<string | null>(null);
  const [changingStatus, setChangingStatus] = useState(false);
  const [activePackageId, setActivePackageId] = useState<string | null>(null);

  /* --------------------------------------------------
     FETCH PACKAGES
  -------------------------------------------------- */

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/packages", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch packages"
        );
      }

      setPackages(data.packages || []);
    } catch (error) {
      console.error("FETCH PACKAGES ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch packages"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  /* --------------------------------------------------
     FILTER
  -------------------------------------------------- */

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        pkg.title.toLowerCase().includes(searchValue) ||
        pkg.destination.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        pkg.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [packages, search, statusFilter]);

  /* --------------------------------------------------
     PRICE FORMAT
  -------------------------------------------------- */

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  /* --------------------------------------------------
     CREATE SUCCESS
  -------------------------------------------------- */

  const handlePackageCreated = async () => {
    setShowAddModal(false);

    await fetchPackages();
  };

  const handleDeletePackage = async (id: string) => {
  try {
    setDeleting(true);

    const response = await fetch(
      `/api/packages/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete package"
      );
    }

    setPackages((currentPackages) =>
      currentPackages.filter(
        (pkg) => pkg._id !== id
      )
    );

    setOpenMenu(null);
    setDeletePackageId(null);

    toast.success(
      "Package moved to deleted packages"
    );
  } catch (error) {
    console.error(
      "DELETE PACKAGE ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to delete package"
    );
  } finally {
    setDeleting(false);
  }
};

const handleChangeStatus = async (
  id: string,
  status: "Active" | "Draft"
) => {
  try {
    setChangingStatus(true);

    const response = await fetch(
      `/api/packages/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to update package status"
      );
    }

    setPackages((currentPackages) =>
      currentPackages.map((pkg) =>
        pkg._id === id
          ? {
              ...pkg,
              status: data.package.status,
            }
          : pkg
      )
    );

    // Close whichever modal opened
    setDraftPackageId(null);
    setActivePackageId(null);
    setOpenMenu(null);

    toast.success(
      status === "Draft"
        ? "Package moved to Draft"
        : "Package made Active"
    );

  } catch (error) {
    console.error(
      "CHANGE STATUS ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to update package status"
    );
  } finally {
    setChangingStatus(false);
  }
};
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

            {/* ------------------------------------------------
                PAGE HEADER
            ------------------------------------------------ */}

            <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:gap-5 sm:flex-row sm:items-end">

                <div>
                  <p className="text-xs font-medium text-blue-600 sm:text-sm">
                    PACKAGE MANAGEMENT
                  </p>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Packages
                  </h1>

                  <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
                    Create and manage your travel packages.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:from-cyan-600
                    hover:to-blue-700
                    sm:gap-2
                    sm:rounded-xl
                    sm:px-5
                    sm:py-3
                    sm:text-sm
                  "
                >
                  <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
                  Add Package
                </button>

              </div>

            {/* ------------------------------------------------
                STATS
            ------------------------------------------------ */}

            <div className="mb-5 grid grid-cols-3 gap-2.5 sm:mb-6 sm:gap-4">

            {/* Total */}

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
              <div className="flex items-center justify-between gap-2">

                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-white/80 sm:text-sm">
                    Total Packages
                  </p>

                  <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    {packages.length}
                  </p>
                </div>

                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm sm:flex">
                  <PackageIcon size={20} />
                </div>

              </div>
            </div>


            {/* Active */}

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
              <p className="text-[10px] font-medium text-white/80 sm:text-sm">
                Active Packages
              </p>

              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {
                  packages.filter(
                    (pkg) => pkg.status === "Active"
                  ).length
                }
              </p>
            </div>


            {/* Draft */}

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
              <p className="text-[10px] font-medium text-white/80 sm:text-sm">
                Draft Packages
              </p>

              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {
                  packages.filter(
                    (pkg) => pkg.status === "Draft"
                  ).length
                }
              </p>
            </div>

          </div>

            <Link
                href="/admin/packages/deleted"
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-red-100
                  bg-red-50
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-red-500
                  transition
                  hover:bg-red-100
                  sm:mb-4
                  sm:gap-2
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2.5
                  sm:text-sm
                "
              >
                <Trash2 size={14} className="sm:h-4 sm:w-4" />
                Deleted Packages
              </Link>

            {/* ------------------------------------------------
                MAIN CARD
            ------------------------------------------------ */}

            <div className="overflow-visible rounded-xl border border-gray-100 bg-white shadow-sm sm:rounded-2xl">

              {/* Toolbar */}

              <div className="flex flex-col gap-3 border-b border-gray-100 p-3 sm:gap-4 sm:p-5 md:flex-row md:items-center md:justify-between">

                {/* Search */}

                <div className="relative w-full md:max-w-sm">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-gray-50
                      pl-9
                      pr-3
                      text-xs
                      text-gray-800
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-blue-400
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-100
                      sm:h-11
                      sm:rounded-xl
                      sm:pl-10
                      sm:pr-4
                      sm:text-sm
                    "
                  />

                </div>

                {/* Filter */}

                <div className="relative">

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="
                      h-10
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-gray-200
                      bg-gray-50
                      px-3
                      pr-9
                      text-xs
                      font-medium
                      text-gray-600
                      outline-none
                      transition
                      focus:border-blue-400
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-100
                      sm:h-11
                      sm:w-auto
                      sm:rounded-xl
                      sm:px-4
                      sm:pr-10
                      sm:text-sm
                    "
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="Active">
                      Active
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                </div>

              </div>

              {/* ------------------------------------------------
                  LOADING
              ------------------------------------------------ */}

              {loading && (
                <div className="px-6 py-16 text-center">

                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
                  <p className="mt-4 text-sm text-gray-400">
                    Loading packages...
                  </p>

                </div>
              )}

              {/* ------------------------------------------------
                  ERROR
              ------------------------------------------------ */}

              {!loading && error && (
                <div className="px-6 py-16 text-center">

                  <PackageIcon
                    size={35}
                    className="mx-auto text-red-300"
                  />

                  <h3 className="mt-3 text-sm font-semibold text-red-600">
                    Failed to load packages
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    {error}
                  </p>

                  <button
                      onClick={fetchPackages}
                      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Try Again
                    </button>

                </div>
              )}

              {/* ------------------------------------------------
                  CONTENT
              ------------------------------------------------ */}

              {!loading && !error && (
                <>

                  {/* Desktop Table */}

                  <div className="hidden overflow-x-auto md:block">

                    <table className="w-full">

                      <thead>

                        <tr className="border-b border-gray-100 bg-gray-50/70 text-left">

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Package
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Destination
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Duration
                          </th>

                          <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Price
                          </th>

                          <th className="w-[115px] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Status
                          </th>

                          <th className="w-[150px] px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Action
                          </th>
                        </tr>

                      </thead>

                      <tbody className="divide-y divide-gray-100">

                        {filteredPackages.map((pkg) => (

                          <tr
                            key={pkg._id}
                            className="transition hover:bg-gray-50/60"
                          >

                            {/* Package */}

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-4">

                                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                                  <img
                                    src={pkg.mainImage}
                                    alt={pkg.title}
                                    className="h-full w-full object-cover"
                                  />

                                </div>

                                <div className="min-w-0">

                                  <p className="truncate text-sm font-semibold text-gray-900">
                                    {pkg.title}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400">
                                    Package #
                                    {pkg._id.slice(-6)}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Destination */}

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-2 text-sm text-gray-600">

                                <MapPin
                                  size={15}
                                  className="text-orange-500"
                                />

                                {pkg.destination}

                              </div>

                            </td>

                            {/* Duration */}

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-2 text-sm text-gray-600">

                                <Clock3
                                  size={15}
                                  className="text-gray-400"
                                />

                                {pkg.duration}

                              </div>

                            </td>

                            {/* Price */}

                            <td className="px-6 py-4">

                              <span className="text-sm font-semibold text-gray-900">
                                {formatPrice(pkg.price)}
                              </span>

                            </td>

                            {/* Status */}

                            <td className="w-[115px] px-4 py-4">

                              <span
                                className={`
                                  inline-flex
                                  rounded-full
                                  px-3
                                  py-1.5
                                  text-xs
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

                            </td>

                            {/* Actions */}

                            <td className="relative w-[150px] px-4 py-4 text-right">

                              <div className="inline-flex items-center gap-1">

                                    {/* VIEW */}

                                    <Link
                                      href={`/admin/packages/${pkg._id}`}
                                      className="
                                        inline-flex
                                        h-9
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        bg-yellow-50
                                        px-3
                                        text-sm
                                        font-semibold
                                        text-yellow-600
                                        transition
                                        hover:bg-yellow-100
                                      "
                                      title="View package"
                                    >
                                      <Eye size={16} />
                                      View
                                    </Link>

                                    {/* MENU */}

                                    <button
                                      onClick={() =>
                                        setOpenMenu(
                                          openMenu === pkg._id
                                            ? null
                                            : pkg._id
                                        )
                                      }
                                      className="
                                        inline-flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-gray-400
                                        transition
                                        hover:bg-gray-100
                                        hover:text-gray-700
                                      "
                                      title="More actions"
                                    >
                                      <MoreVertical size={18} />
                                    </button>

                                  </div>

                                  {/* DROPDOWN */}

                                  {openMenu === pkg._id && (
                                    <div className="absolute right-6 top-14 z-20 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 text-left shadow-lg">

                                      {/* DELETE */}

                                      <button
                                        onClick={() => {
                                          setDeletePackageId(pkg._id);
                                          setOpenMenu(null);
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                                      >
                                        <Trash2 size={16} />
                                        Delete
                                      </button>

                                      {/* DRAFT */}

                                      {pkg.status === "Active" ? (
                                            <button
                                              onClick={() => {
                                                setDraftPackageId(pkg._id);
                                                setOpenMenu(null);
                                              }}
                                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                                            >
                                              <FileText size={16} />
                                              Move to Draft
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                setActivePackageId(pkg._id);
                                                setOpenMenu(null);
                                              }}
                                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-green-600 hover:bg-green-50"
                                            >
                                              <FileText size={16} />
                                              Make Active
                                            </button>
                                          )}

                                    </div>
                                  )}

                                </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  {/* Mobile Cards */}

                  <div className="divide-y divide-gray-100 overflow-y-auto md:hidden">

                    {filteredPackages.map((pkg) => (

                      <div
                      key={pkg._id}
                      className="p-3 sm:p-5"
                    >
                      <div className="flex gap-3 sm:gap-4">

                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-24 sm:rounded-xl">
                          <img
                            src={pkg.mainImage}
                            alt={pkg.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div className="min-w-0">

                              <h3 className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
                                {pkg.title}
                              </h3>

                              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                                <MapPin size={11} className="shrink-0 sm:h-[13px] sm:w-[13px]" />
                                {pkg.destination}
                              </p>

                            </div>

                            <span
                              className={`
                                shrink-0
                                rounded-full
                                px-2
                                py-0.5
                                text-[9px]
                                font-semibold
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

                          <div className="mt-2 flex items-center justify-between sm:mt-3">

                            <div>

                              <p className="text-[10px] text-gray-400 sm:text-xs">
                                {pkg.duration}
                              </p>

                              <p className="mt-0.5 text-xs font-semibold text-gray-900 sm:mt-1 sm:text-sm">
                                {formatPrice(pkg.price)}
                              </p>

                            </div>

                            <div className="flex gap-0.5 sm:gap-1">

                              {/* View */}
                              <Link
                                href={`/admin/packages/${pkg._id}`}
                                className="
                                  rounded-md
                                  p-1.5
                                  text-blue-500
                                  transition
                                  hover:bg-blue-50
                                  hover:text-blue-600
                                  sm:rounded-lg
                                  sm:p-2
                                "
                                title="View package"
                              >
                                <Eye
                                  size={14}
                                  className="sm:h-4 sm:w-4"
                                />
                              </Link>

                              {/* Draft / Active */}
                              {pkg.status === "Active" ? (
                                <button
                                  onClick={() => {
                                    setDraftPackageId(pkg._id);
                                    setOpenMenu(null);
                                  }}
                                  className="
                                    rounded-md
                                    p-1.5
                                    text-gray-500
                                    transition
                                    hover:bg-gray-100
                                    hover:text-gray-700
                                    sm:rounded-lg
                                    sm:p-2
                                  "
                                  title="Move to Draft"
                                >
                                  <FileText
                                    size={14}
                                    className="sm:h-4 sm:w-4"
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setActivePackageId(pkg._id);
                                    setOpenMenu(null);
                                  }}
                                  className="
                                    rounded-md
                                    p-1.5
                                    text-green-500
                                    transition
                                    hover:bg-green-50
                                    hover:text-green-600
                                    sm:rounded-lg
                                    sm:p-2
                                  "
                                  title="Make Active"
                                >
                                  <FileText
                                    size={14}
                                    className="sm:h-4 sm:w-4"
                                  />
                                </button>
                              )}

                              {/* Delete */}
                              <button
                                className="
                                  rounded-md
                                  p-1.5
                                  text-red-400
                                  transition
                                  hover:bg-red-50
                                  hover:text-red-500
                                  sm:rounded-lg
                                  sm:p-2
                                "
                                title="Delete"
                              >
                                <Trash2
                                  size={14}
                                  className="sm:h-4 sm:w-4"
                                />
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>
                    </div>

                    ))}

                  </div>

                  {/* Empty State */}

                  {filteredPackages.length === 0 && (

                    <div className="px-6 py-16 text-center">

                      <PackageIcon
                        size={35}
                        className="mx-auto text-gray-300"
                      />

                      <h3 className="mt-3 text-sm font-semibold text-gray-700">
                        No packages found
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Try changing your search or filter.
                      </p>

                    </div>

                  )}

                </>
              )}

              {/* Footer */}

              {!loading && !error && (
                <div className="border-t border-gray-100 px-6 py-4">

                  <p className="text-xs text-gray-400">

                    Showing{" "}

                    <span className="font-semibold text-gray-600">
                      {filteredPackages.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-gray-600">
                      {packages.length}
                    </span>

                    {" "}packages

                  </p>

                </div>
              )}

            </div>

          </main>

        </div>

        {/* Add Package Modal */}

        {showAddModal && (
          <AddPackageModal
            onClose={() => setShowAddModal(false)}
            onSuccess={handlePackageCreated}
          />
        )}

        {/* DELETE */}

          <ConfirmModal
            open={deletePackageId !== null}
            title="Delete package?"
            message="This package will be moved to Deleted Packages. You can restore it later."
            confirmText="Move to Deleted"
            cancelText="Cancel"
            loading={deleting}
            onCancel={() => {
              if (!deleting) {
                setDeletePackageId(null);
              }
            }}
            onConfirm={() => {
              if (deletePackageId) {
                handleDeletePackage(deletePackageId);
              }
            }}
          />

          {/* MOVE TO DRAFT */}

          <ConfirmModal
            open={draftPackageId !== null}
            title="Move package to Draft?"
            message="This package will be moved to Draft status and will no longer be considered an active package."
            confirmText="Move to Draft"
            cancelText="Cancel"
            confirmClassName="bg-gray-700 hover:bg-gray-800"
            loading={changingStatus}
            onCancel={() => {
              if (!changingStatus) {
                setDraftPackageId(null);
              }
            }}
            onConfirm={() => {
              if (draftPackageId) {
                handleChangeStatus(
                  draftPackageId,
                  "Draft"
                );
              }
            }}
          />

          {/* MAKE ACTIVE */}

          <ConfirmModal
            open={activePackageId !== null}
            title="Make package active?"
            message="This package will be changed back to Active status and will be available as an active package."
            confirmText="Make Active"
            cancelText="Cancel"
            confirmClassName="bg-green-500 hover:bg-green-600"
            loading={changingStatus}
            onCancel={() => {
              if (!changingStatus) {
                setActivePackageId(null);
              }
            }}
            onConfirm={() => {
              if (activePackageId) {
                handleChangeStatus(
                  activePackageId,
                  "Active"
                );
              }
            }}
          />

      </div>
    </div>
  );
}