"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Trash2,
  MapPin,
  Clock3,
} from "lucide-react";
import { toast  } from "sonner";

type PackageData = {
  _id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  description: string;
  mainImage: string;
  galleryImages: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  status: "Active" | "Draft";
  isActive: boolean;
};

export default function DeletedPackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] =
  useState<string | null>(null);

const [packageToDelete, setPackageToDelete] =
  useState<PackageData | null>(null);

  const fetchDeletedPackages = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/packages?deleted=true",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch deleted packages"
        );
      }

      setPackages(data.packages || []);
    } catch (error) {
      console.error(
        "FETCH DELETED PACKAGES ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeletedPackages();
  }, [fetchDeletedPackages]);

  const handleRestore = async (id: string) => {

    try {
      setRestoringId(id);

      const response = await fetch(
        `/api/packages/${id}/restore`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to restore package"
        );
      }

      setPackages((current) =>
        current.filter((pkg) => pkg._id !== id)
      );

      toast.success(
      "Package restored successfully"
    );
    } catch (error) {
      console.error(
        "RESTORE PACKAGE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
            ? error.message
            : "Failed to restore  package"
        );
    } finally {
      setRestoringId(null);
    }
  };

  const handlePermanentDelete = async () => {
  if (!packageToDelete) return;

  const id = packageToDelete._id;

  try {
    setDeletingId(id);

    const response = await fetch(
      `/api/packages/${id}/permanent-delete`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to permanently delete package"
      );
    }

    setPackages((current) =>
      current.filter((pkg) => pkg._id !== id)
    );

    setPackageToDelete(null);

    toast.success(
      "Package permanently deleted"
    );
  } catch (error) {
    console.error(
      "PERMANENT DELETE PACKAGE ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to permanently delete package"
    );
  } finally {
    setDeletingId(null);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-5 sm:px-5 sm:py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <Link
              href="/admin/packages"
              className="
                mb-4
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-medium
                text-gray-500
                transition
                hover:text-gray-900
                sm:mb-5
                sm:gap-2
                sm:text-sm
            "
            >
              <ArrowLeft size={14} className="sm:h-4 sm:w-4" />
              Back to Packages
            </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 sm:h-11 sm:w-11 sm:rounded-xl">
              <Trash2
                size={17}
                className="text-red-500 sm:h-5 sm:w-5"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Deleted Packages
              </h1>

              <p className="mt-0.5 text-xs text-gray-400 sm:mt-1 sm:text-sm">
                Packages moved to trash
              </p>
            </div>

          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <p className="text-sm text-gray-400">
              Loading deleted packages...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && packages.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <Trash2
                size={24}
                className="text-gray-300"
              />
            </div>

            <h2 className="mt-4 text-base font-semibold text-gray-800">
              No deleted packages
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Packages you delete will appear here.
            </p>
          </div>
        )}

        {/* CARDS */}
{!loading && packages.length > 0 && (
  <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

    {packages.map((pkg) => (
      <div
        key={pkg._id}
        className="
          overflow-hidden
          rounded-xl
          border
          border-gray-100
          bg-white
          shadow-sm
          sm:rounded-2xl
        "
      >

        {/* IMAGE */}

        <div className="relative h-36 overflow-hidden bg-gray-100 sm:h-48">

          <img
            src={pkg.mainImage}
            alt={pkg.title}
            className="h-full w-full object-cover grayscale-[20%]"
          />

          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            Deleted
          </div>

        </div>

        {/* CONTENT */}

        <div className="p-3 sm:p-5">

          <h2 className="line-clamp-1 text-sm font-bold text-gray-900 sm:text-base">
            {pkg.title}
          </h2>

          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400 sm:mt-2 sm:text-sm">

            <MapPin
              size={12}
              className="shrink-0 sm:h-[14px] sm:w-[14px]"
            />

            <span className="truncate">
              {pkg.destination}
            </span>

          </div>

          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400 sm:mt-2 sm:text-sm">

            <Clock3
              size={12}
              className="shrink-0 sm:h-[14px] sm:w-[14px]"
            />

            {pkg.duration}

          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4">

            <div>
              <p className="text-[10px] text-gray-400 sm:text-xs">
                Status
              </p>

              <p className="mt-0.5 text-xs font-semibold text-red-500 sm:text-sm">
                isActive: false
              </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* RESTORE */}

              <button
                type="button"
                disabled={
                  restoringId === pkg._id ||
                  deletingId === pkg._id
                }
                onClick={() =>
                  handleRestore(pkg._id)
                }
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-green-50
                  px-2.5
                  py-2
                  text-[11px]
                  font-semibold
                  text-green-600
                  transition
                  hover:bg-green-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:gap-2
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2.5
                  sm:text-sm
                "
              >

                <RotateCcw
                  size={13}
                  className="sm:h-[15px] sm:w-[15px]"
                />

                {restoringId === pkg._id
                  ? "Restoring..."
                  : "Restore"}

              </button>

              {/* PERMANENT DELETE */}

              <button
                type="button"
                disabled={
                  restoringId === pkg._id ||
                  deletingId === pkg._id
                }
                onClick={() =>
                  setPackageToDelete(pkg)
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  p-2
                  text-red-500
                  transition
                  hover:bg-red-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:rounded-xl
                  sm:p-2.5
                "
                title="Delete permanently"
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
    ))}

  </div>
)}
      </div>
      {packageToDelete && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-5
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
          >
            {/* ICON */}

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-red-50
            ">
              <Trash2
                size={22}
                className="text-red-500"
              />
            </div>

            {/* CONTENT */}

            <h2 className="
              mt-5
              text-lg
              font-bold
              text-gray-900
            ">
              Permanently delete package?
            </h2>

            <p className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            ">
              Are you sure you want to permanently
              delete{" "}
              <span className="font-semibold text-gray-800">
                {packageToDelete.title}
              </span>
              ?
            </p>

            <p className="
              mt-2
              text-sm
              font-medium
              text-red-500
            ">
              This will permanently remove the
              package, its main image, and all gallery
              images. This action cannot be undone.
            </p>

            {/* ACTIONS */}

            <div className="
              mt-6
              flex
              justify-end
              gap-3
            ">
              <button
                type="button"
                disabled={deletingId === packageToDelete._id}
                onClick={() =>
                  setPackageToDelete(null)
                }
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-gray-600
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingId === packageToDelete._id}
                onClick={handlePermanentDelete}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Trash2 size={15} />

                {deletingId === packageToDelete._id
                  ? "Deleting..."
                  : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}