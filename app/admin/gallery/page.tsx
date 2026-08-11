"use client";

import { useState } from "react";
import {
  Plus,
  Image as ImageIcon,
  Video,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  X,
  Upload,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  createdAt: string;
};

const dummyGallery: GalleryItem[] = [
  {
    id: "1",
    title: "Swiss Alps",
    description: "Beautiful views from Switzerland.",
    type: "image",
    url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800",
    createdAt: "Aug 11, 2026",
  },
  {
    id: "2",
    title: "Maldives Beach",
    description: "A peaceful beach experience.",
    type: "image",
    url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800",
    createdAt: "Aug 10, 2026",
  },
  {
    id: "3",
    title: "Dubai Experience",
    description: "Dubai city travel highlights.",
    type: "video",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    createdAt: "Aug 9, 2026",
  },
  {
    id: "4",
    title: "Mountain Adventure",
    description: "Adventure through the mountains.",
    type: "image",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    createdAt: "Aug 8, 2026",
  },
];

export default function GalleryPage() {
  const [gallery, setGallery] =
    useState<GalleryItem[]>(dummyGallery);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

    const [mobileOpen, setMobileOpen] = useState(false);

  const [filter, setFilter] =
    useState<"All" | "image" | "video">("All");

  const filteredGallery = gallery.filter((item) => {
    if (filter === "All") return true;

    return item.type === filter;
  });

  const handleDelete = (id: string) => {
    setGallery((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <div className="w-64 shrink-0 border-r border-gray-100 bg-white">
          <AdminSidebar
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}/>

        </div>

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

            <AdminHeader
                        onMenuClick={() => setMobileOpen(true)}
                      />

          <main className="flex-1 p-5 md:p-8">

            {/* PAGE HEADER */}

            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>
                <p className="text-sm font-medium text-orange-500">
                  CONTENT MANAGEMENT
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                  Gallery
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Manage travel images and videos displayed on your website.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
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
                Add Gallery
              </button>

            </div>

            {/* STATS */}

            <div className="mb-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Total Items
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {gallery.length}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Images
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {
                    gallery.filter(
                      (item) => item.type === "image"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Videos
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {
                    gallery.filter(
                      (item) => item.type === "video"
                    ).length
                  }
                </p>
              </div>

            </div>

            {/* TOOLBAR */}

            <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Gallery Items
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredGallery.length} items
                </p>
              </div>

              <div className="flex gap-2">

                {(["All", "image", "video"] as const).map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`
                        rounded-lg
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        transition
                        ${
                          filter === item
                            ? "bg-orange-500 text-white"
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

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredGallery.map((item) => (

                <div
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >

                  {/* MEDIA */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

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
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                            <Video
                              size={20}
                              className="text-orange-500"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* TYPE */}

                    <div className="absolute left-3 top-3">

                      <span className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-black/55
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-semibold
                        text-white
                        backdrop-blur-sm
                      ">
                        {item.type === "image" ? (
                          <ImageIcon size={13} />
                        ) : (
                          <Video size={13} />
                        )}

                        {item.type === "image"
                          ? "Image"
                          : "Video"}
                      </span>

                    </div>

                    {/* MENU */}

                    <div className="absolute right-3 top-3">

                      <button
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          bg-white/90
                          text-gray-500
                          shadow-sm
                          backdrop-blur-sm
                          transition
                          hover:bg-white
                          hover:text-gray-800
                        "
                      >
                        <MoreVertical size={17} />
                      </button>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-4">

                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-[11px] text-gray-400">
                        {item.createdAt}
                      </span>

                      <div className="flex items-center gap-1">

                        <button
                          onClick={() =>
                            setSelectedItem(item)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                          "
                          title="View"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-orange-50
                            hover:text-orange-500
                          "
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                          "
                          title="Delete"
                        >
                          <Trash2 size={15} />
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
      {/* ADD GALLERY MODAL */}
      {/* ================================================= */}

      {showAddModal && (
        <AddGalleryModal
          onClose={() => setShowAddModal(false)}
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
            p-5
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedItem(null);
            }
          }}
        >

          <div className="
            relative
            max-h-[90vh]
            w-full
            max-w-4xl
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
          ">

            <button
              onClick={() => setSelectedItem(null)}
              className="
                absolute
                right-4
                top-4
                z-10
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-black/50
                text-white
                hover:bg-black/70
              "
            >
              <X size={18} />
            </button>

            <div className="bg-black">

              {selectedItem.type === "image" ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="mx-auto max-h-[75vh] w-auto max-w-full object-contain"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="mx-auto max-h-[75vh] w-full"
                />
              )}

            </div>

            <div className="p-5">

              <h2 className="text-lg font-bold text-gray-900">
                {selectedItem.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {selectedItem.description}
              </p>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

/* ================================================= */
/* ADD GALLERY MODAL */
/* ================================================= */

function AddGalleryModal({
  onClose,
}: {
  onClose: () => void;
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

  const handleSubmit = () => {
    console.log({
      title,
      description,
      type,
      file,
    });

    onClose();
  };

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
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >

      <div className="
        relative
        w-full
        max-w-lg
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl
      ">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Gallery Management
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Add Gallery Item
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Upload an image or video to your gallery.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
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
          >
            <X size={19} />
          </button>

        </div>

        {/* BODY */}

        <div className="space-y-5 px-6 py-6">

          {/* TYPE */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Media Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setType("image")}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    type === "image"
                      ? "border-orange-400 bg-orange-50 text-orange-500"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
                `}
              >
                <ImageIcon size={17} />
                Image
              </button>

              <button
                type="button"
                onClick={() => setType("video")}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    type === "video"
                      ? "border-orange-400 bg-orange-50 text-orange-500"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
                `}
              >
                <Video size={17} />
                Video
              </button>

            </div>

          </div>

          {/* TITLE */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                h-11
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                text-sm
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-orange-400
                focus:bg-white
                focus:ring-2
                focus:ring-orange-100
              "
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
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
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-orange-400
                focus:bg-white
                focus:ring-2
                focus:ring-orange-100
              "
            />

          </div>

          {/* FILE */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {type === "image"
                ? "Image"
                : "Video"}
            </label>

            {!preview ? (

              <label className="
                flex
                h-40
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                border-gray-200
                bg-gray-50
                transition
                hover:border-orange-300
                hover:bg-orange-50/40
              ">

                <Upload
                  size={25}
                  className="text-gray-400"
                />

                <span className="mt-3 text-sm font-medium text-gray-600">
                  Upload {type}
                </span>

                <span className="mt-1 text-xs text-gray-400">
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

              <div className="relative overflow-hidden rounded-xl bg-black">

                {type === "image" ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="h-52 w-full object-contain"
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
                    right-3
                    top-3
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-black/60
                    text-white
                    hover:bg-red-500
                  "
                >
                  <X size={15} />
                </button>

              </div>

            )}

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="
              rounded-xl
              bg-orange-500
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-orange-600
            "
          >
            Add to Gallery
          </button>

        </div>

      </div>
    </div>
  );
}