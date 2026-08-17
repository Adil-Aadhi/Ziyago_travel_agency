"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Image as ImageIcon,
  Video,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { toast } from "sonner";
import ConfirmModal from "@/components/ui/ConfirmModal";

type GalleryItem = {
  _id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  publicId: string;
  createdAt: string;
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteGalleryId, setDeleteGalleryId] =
    useState<string | null>(null);

  const [deleting, setDeleting] = useState(false);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  const [editingItem, setEditingItem] =
    useState<GalleryItem | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [filter, setFilter] =
    useState<"All" | "image" | "video">("All");

  const filteredGallery = gallery.filter((item) => {
    if (filter === "All") return true;

    return item.type === filter;
  });

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);

      const response = await fetch(
        `/api/gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete gallery item"
        );
      }

      setGallery((currentGallery) =>
        currentGallery.filter(
          (item) => item._id !== id
        )
      );

      setDeleteGalleryId(null);

      toast.success(
        "Gallery item deleted successfully"
      );
    } catch (error) {
      console.error(
        "DELETE GALLERY ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete gallery item"
      );
    } finally {
      setDeleting(false);
    }
  };

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/gallery",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch gallery"
        );
      }

      setGallery(data.gallery || []);
    } catch (error) {
      console.error(
        "FETCH GALLERY ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch gallery"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <div className="w-0 shrink-0 bg-white lg:w-64 lg:border-r lg:border-gray-100">
          <AdminSidebar
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </div>

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

          <AdminHeader
            onMenuClick={() => setMobileOpen(true)}
          />

          <main className="flex-1 p-3 sm:p-5 md:p-8">

            {/* PAGE HEADER */}

            <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end sm:gap-5">

              <div className="min-w-0">

                <p className="text-[10px] font-semibold tracking-wide text-blue-600 sm:text-sm">
                  CONTENT MANAGEMENT
                </p>

                <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900 sm:mt-1 sm:text-3xl">
                  Gallery
                </h1>

                <p className="mt-1 text-[11px] leading-5 text-gray-500 sm:mt-2 sm:text-sm">
                  Manage travel images and videos displayed on your website.
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
                  px-3
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
                <Plus
                  size={15}
                  className="sm:h-[18px] sm:w-[18px]"
                />

                Add Gallery
              </button>

            </div>

            {/* STATS */}

            <div className="mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">

              {/* Total */}

              <div
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-cyan-100
                  bg-gradient-to-br
                  from-cyan-50
                  to-blue-50
                  p-3
                  shadow-sm
                  sm:rounded-2xl
                  sm:p-5
                "
              >
                <p className="text-[10px] text-gray-500 sm:text-sm">
                  Total Items
                </p>

                <p className="mt-0.5 text-xl font-bold text-blue-700 sm:mt-1 sm:text-2xl">
                  {gallery.length}
                </p>
              </div>

              {/* Images */}

              <div
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-blue-100
                  bg-gradient-to-br
                  from-blue-50
                  to-indigo-50
                  p-3
                  shadow-sm
                  sm:rounded-2xl
                  sm:p-5
                "
              >
                <p className="text-[10px] text-gray-500 sm:text-sm">
                  Images
                </p>

                <p className="mt-0.5 text-xl font-bold text-blue-700 sm:mt-1 sm:text-2xl">
                  {
                    gallery.filter(
                      (item) => item.type === "image"
                    ).length
                  }
                </p>
              </div>

              {/* Videos */}

              <div
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-green-100
                  bg-gradient-to-br
                  from-green-50
                  to-cyan-50
                  p-3
                  shadow-sm
                  sm:rounded-2xl
                  sm:p-5
                "
              >
                <p className="text-[10px] text-gray-500 sm:text-sm">
                  Videos
                </p>

                <p className="mt-0.5 text-xl font-bold text-green-600 sm:mt-1 sm:text-2xl">
                  {
                    gallery.filter(
                      (item) => item.type === "video"
                    ).length
                  }
                </p>
              </div>

            </div>

            {/* TOOLBAR */}

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                gap-2
                rounded-xl
                border
                border-gray-100
                bg-white
                p-3
                shadow-sm
                sm:mb-5
                sm:rounded-2xl
                sm:p-4
              "
            >

              <div className="min-w-0">

                <h3 className="text-xs font-semibold text-gray-900 sm:text-sm">
                  Gallery Items
                </h3>

                <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                  {filteredGallery.length} items
                </p>

              </div>

              <div className="flex gap-1 sm:gap-2">

                {(["All", "image", "video"] as const).map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`
                        rounded-md
                        px-2
                        py-1.5
                        text-[10px]
                        font-semibold
                        transition
                        sm:rounded-lg
                        sm:px-3
                        sm:py-2
                        sm:text-xs
                        ${
                          filter === item
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        }
                      `}
                    >
                      {item === "All"
                        ? "All"
                        : item === "image"
                          ? "Images"
                          : "Videos"}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* GALLERY GRID */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6">

              {filteredGallery.map((item) => (

                <div
                  key={item._id}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                    sm:rounded-2xl
                  "
                >

                  {/* MEDIA */}

                  <div
                    onClick={() =>
                      setSelectedItem(item)
                    }
                    className="
                      group/media
                      relative
                      aspect-[4/3]
                      cursor-pointer
                      overflow-hidden
                      bg-gray-100
                    "
                  >

                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <>
                        <video
                          src={item.url}
                          className="h-full w-full object-cover"
                          muted
                          preload="metadata"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">

                          <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white/90
                            shadow-lg
                            sm:h-12
                            sm:w-12
                          ">
                            <Video
                              size={16}
                              className="text-blue-600 sm:h-5 sm:w-5"
                            />
                          </div>

                        </div>
                      </>
                    )}

                    {/* TYPE */}

                    <div className="absolute left-2 top-2 sm:left-3 sm:top-3">

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-md
                          bg-black/55
                          px-2
                          py-1
                          text-[9px]
                          font-semibold
                          text-white
                          backdrop-blur-sm
                          sm:gap-1.5
                          sm:rounded-lg
                          sm:px-2.5
                          sm:py-1.5
                          sm:text-[11px]
                        "
                      >
                        {item.type === "image" ? (
                          <ImageIcon
                            size={11}
                            className="sm:h-[13px] sm:w-[13px]"
                          />
                        ) : (
                          <Video
                            size={11}
                            className="sm:h-[13px] sm:w-[13px]"
                          />
                        )}

                        {item.type === "image"
                          ? "Image"
                          : "Video"}
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-3 sm:p-4">

                    <h3 className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 text-gray-400 sm:mt-1 sm:text-xs sm:leading-5">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between sm:mt-4">

                      <span className="truncate text-[9px] text-gray-400 sm:text-[11px]">
                        {item.createdAt}
                      </span>

                      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            setEditingItem(item)
                          }
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-md
                            text-gray-400
                            transition
                            hover:bg-blue-50
                            hover:text-blue-600
                            sm:h-8
                            sm:w-8
                            sm:rounded-lg
                          "
                          title="Edit"
                        >
                          <Pencil
                            size={13}
                            className="sm:h-[15px] sm:w-[15px]"
                          />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            setDeleteGalleryId(item._id)
                          }
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-md
                            text-gray-400
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                            sm:h-8
                            sm:w-8
                            sm:rounded-lg
                          "
                          title="Delete"
                        >
                          <Trash2
                            size={13}
                            className="sm:h-[15px] sm:w-[15px]"
                          />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </main>

        </div>
      </div>

      {/* ================================================= */}
      {/* ADD / EDIT GALLERY MODAL */}
      {/* ================================================= */}

      {(showAddModal || editingItem) && (
        <AddGalleryModal
          editItem={editingItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            fetchGallery();
          }}
        />
      )}

      {/* ================================================= */}
      {/* VIEW MODAL */}
      {/* ================================================= */}

      {selectedItem && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            p-3
            backdrop-blur-sm
            sm:p-5
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedItem(null);
            }
          }}
        >

          <div
            className="
              relative
              max-h-[92vh]
              w-full
              max-w-4xl
              overflow-hidden
              rounded-xl
              bg-white
              shadow-2xl
              sm:max-h-[90vh]
              sm:rounded-2xl
            "
          >

            <button
              onClick={() =>
                setSelectedItem(null)
              }
              className="
                absolute
                right-2.5
                top-2.5
                z-10
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-black/50
                text-white
                hover:bg-black/70
                sm:right-4
                sm:top-4
                sm:h-9
                sm:w-9
              "
            >
              <X
                size={16}
                className="sm:h-[18px] sm:w-[18px]"
              />
            </button>

            <div className="bg-black">

              {selectedItem.type === "image" ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="
                    mx-auto
                    max-h-[65vh]
                    w-auto
                    max-w-full
                    object-contain
                    sm:max-h-[75vh]
                  "
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="
                    mx-auto
                    max-h-[65vh]
                    w-full
                    sm:max-h-[75vh]
                  "
                />
              )}

            </div>

            <div className="p-3 sm:p-5">

              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {selectedItem.title}
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {selectedItem.description}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* DELETE CONFIRMATION */}

      <ConfirmModal
        open={deleteGalleryId !== null}
        title="Delete gallery item?"
        message="This media will be permanently deleted from the gallery and Cloudinary."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onCancel={() => {
          if (!deleting) {
            setDeleteGalleryId(null);
          }
        }}
        onConfirm={() => {
          if (deleteGalleryId) {
            handleDelete(deleteGalleryId);
          }
        }}
      />

    </div>
  );
}

/* ================================================= */
/* ADD / EDIT GALLERY MODAL */
/* ================================================= */

function AddGalleryModal({
  onClose,
  onSuccess,
  editItem,
}: {
  onClose: () => void;
  onSuccess?: () => void;
  editItem?: GalleryItem | null;
}) {
  const [type, setType] =
    useState<"image" | "video">("image");

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const isEditMode = !!editItem;

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    setPreview(
      URL.createObjectURL(selected)
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!isEditMode && !file) {
      toast.error(`Please select a ${type}`);
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "type",
        type
      );

      if (file) {
        formData.append("file", file);
      }

      const url = isEditMode
        ? `/api/gallery/${editItem?._id}`
        : "/api/gallery";

      const response = await fetch(url, {
        method: isEditMode
          ? "PUT"
          : "POST",
        body: formData,
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (
              isEditMode
                ? "Failed to update gallery item"
                : "Failed to add gallery item"
            )
        );
      }

      toast.success(
        isEditMode
          ? "Gallery item updated successfully"
          : "Gallery item added successfully"
      );

      onSuccess?.();
      onClose();

    } catch (error) {
      console.error(
        isEditMode
          ? "UPDATE GALLERY ERROR:"
          : "ADD GALLERY ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : (
              isEditMode
                ? "Failed to update gallery item"
                : "Failed to add gallery item"
            )
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (editItem) {
      setType(editItem.type);
      setTitle(editItem.title);
      setDescription(editItem.description);
      setFile(null);
      setPreview(editItem.url);
    } else {
      setType("image");
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview("");
    }
  }, [editItem]);

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-3
        backdrop-blur-[2px]
        sm:p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >

      <div
        className="
          relative
          max-h-[94vh]
          w-full
          max-w-lg
          overflow-y-auto
          overflow-x-hidden
          rounded-xl
          bg-white
          shadow-2xl
          sm:rounded-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            px-4
            py-3.5
            sm:px-6
            sm:py-5
          "
        >

          <div className="min-w-0 pr-3">

            <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 sm:text-xs">
              Gallery Management
            </p>

            <h2 className="mt-0.5 text-lg font-bold text-gray-900 sm:mt-1 sm:text-xl">
              {isEditMode
                ? "Edit Gallery Item"
                : "Add Gallery Item"}
            </h2>

            <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
              {isEditMode
                ? "Update the gallery item details and media."
                : "Upload an image or video to your gallery."}
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
              sm:h-9
              sm:w-9
            "
          >
            <X
              size={17}
              className="sm:h-[19px] sm:w-[19px]"
            />
          </button>

        </div>

        {/* BODY */}

        <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-6">

          {/* TYPE */}

          <div>

            <label className="mb-1.5 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
              Media Type
            </label>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">

              <button
                type="button"
                onClick={() => setType("image")}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  border
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  transition
                  sm:gap-2
                  sm:rounded-xl
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                  ${
                    type === "image"
                      ? "border-blue-400 bg-blue-50 text-blue-600"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
                `}
              >
                <ImageIcon
                  size={15}
                  className="sm:h-[17px] sm:w-[17px]"
                />
                Image
              </button>

              <button
                type="button"
                onClick={() => setType("video")}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  border
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  transition
                  sm:gap-2
                  sm:rounded-xl
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                  ${
                    type === "video"
                      ? "border-blue-400 bg-blue-50 text-blue-600"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
                `}
              >
                <Video
                  size={15}
                  className="sm:h-[17px] sm:w-[17px]"
                />
                Video
              </button>

            </div>

          </div>

          {/* TITLE */}

          <div>

            <label className="mb-1.5 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Switzerland Alps"
              className="
                h-9
                w-full
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
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
                sm:px-4
                sm:text-sm
              "
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="mb-1.5 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Short description..."
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-3
                py-2.5
                text-xs
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-400
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
                sm:rounded-xl
                sm:px-4
                sm:py-3
                sm:text-sm
              "
            />

          </div>

          {/* FILE */}

          <div>

            <label className="mb-1.5 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
              {type === "image"
                ? "Image"
                : "Video"}
            </label>

            {!preview ? (

              <label
                className="
                  flex
                  h-32
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-lg
                  border-2
                  border-dashed
                  border-gray-200
                  bg-gray-50
                  transition
                  hover:border-blue-300
                  hover:bg-blue-50/40
                  sm:h-40
                  sm:rounded-xl
                "
              >

                <Upload
                  size={21}
                  className="text-gray-400 sm:h-[25px] sm:w-[25px]"
                />

                <span className="mt-2 text-xs font-medium text-gray-600 sm:mt-3 sm:text-sm">
                  Upload {type}
                </span>

                <span className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                  {type === "image"
                    ? "JPG, PNG or WEBP"
                    : "MP4 recommended"}
                </span>

                <input
                  type="file"
                  accept={
                    type === "image"
                      ? "image/*"
                      : "video/*"
                  }
                  onChange={handleFile}
                  className="hidden"
                />

              </label>

            ) : (

              <div className="relative overflow-hidden rounded-lg bg-black sm:rounded-xl">

                {type === "image" ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="
                      h-40
                      w-full
                      object-cover
                      sm:h-52
                    "
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="
                      h-40
                      w-full
                      object-contain
                      sm:h-52
                    "
                  />
                )}

                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview("");
                  }}
                  className="
                    absolute
                    right-2
                    top-2
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-black/60
                    text-white
                    hover:bg-red-500
                    sm:right-3
                    sm:top-3
                    sm:h-8
                    sm:w-8
                  "
                >
                  <X
                    size={13}
                    className="sm:h-[15px] sm:w-[15px]"
                  />
                </button>

              </div>

            )}

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            justify-end
            gap-2
            border-t
            border-gray-100
            bg-gray-50/50
            px-4
            py-3
            sm:gap-3
            sm:px-6
            sm:py-4
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border
              border-gray-200
              bg-white
              px-3
              py-2
              text-xs
              font-semibold
              text-gray-600
              transition
              hover:bg-gray-50
              sm:rounded-xl
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="
              inline-flex
              min-w-[105px]
              items-center
              justify-center
              gap-1.5
              rounded-lg
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-3
              py-2
              text-xs
              font-semibold
              text-white
              shadow-sm
              transition
              hover:from-cyan-600
              hover:to-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-70
              sm:min-w-[145px]
              sm:gap-2
              sm:rounded-xl
              sm:px-5
              sm:py-2.5
              sm:text-sm
            "
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin sm:h-4 sm:w-4"
                />

                {isEditMode
                  ? "Saving..."
                  : "Uploading..."}
              </>
            ) : (
              isEditMode
                ? "Save Changes"
                : "Add to Gallery"
            )}
          </button>

        </div>

      </div>
    </div>
  );
}