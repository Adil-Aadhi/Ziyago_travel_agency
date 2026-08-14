"use client";

import { ChangeEvent, useState, useEffect } from "react";
import {
  X,
  Upload,
  Plus,
  Trash2,
  ImagePlus,
  CalendarDays,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

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
  itinerary: ItineraryDay[];
  status: "Active" | "Draft";
  tourType: string;
  rating: number;
};

type AddPackageModalProps = {
  onClose: () => void;
  onSuccess?: (updatedPackage?: PackageData) => void;
  editPackage?: PackageData | null;
};

type DayActivity = {
  day: number;
  title: string;
  description: string;
};

export default function AddPackageModal({
  onClose,
  onSuccess,
  editPackage,
}: AddPackageModalProps) {
  const [packageName, setPackageName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Active");
  const [tourType, setTourType] = useState("Adventure");
  const [rating, setRating] = useState("0");
  const [description, setDescription] = useState("");
  const isEditMode = !!editPackage;
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [highlights, setHighlights] = useState([""]);

  const [included, setIncluded] = useState([""]);

  const [excluded, setExcluded] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activities, setActivities] = useState<DayActivity[]>([
    {
      day: 1,
      title: "",
      description: "",
    },
  ]);

  /* ---------------- Main Image ---------------- */

  const handleMainImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMainImage(file);

    const preview = URL.createObjectURL(file);
    setMainImagePreview(preview);
  };

  /* ---------------- Gallery Images ---------------- */

  const handleGalleryImages = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setGalleryImages((prev) => [...prev, ...files]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryPreviews((prev) => [...prev, ...previews]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setGalleryPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* ---------------- Highlights ---------------- */

  const addHighlight = () => {
    setHighlights((prev) => [...prev, ""]);
  };

  const removeHighlight = (index: number) => {
    setHighlights((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateHighlight = (
    index: number,
    value: string
  ) => {
    setHighlights((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };


  /* ---------------- Included ---------------- */

    const addIncluded = () => {
      setIncluded((prev) => [...prev, ""]);
    };

    const removeIncluded = (index: number) => {
      setIncluded((prev) =>
        prev.filter((_, i) => i !== index)
      );
    };

    const updateIncluded = (
      index: number,
      value: string
    ) => {
      setIncluded((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    };

    /* ---------------- Excluded ---------------- */

    const addExcluded = () => {
      setExcluded((prev) => [...prev, ""]);
    };

    const removeExcluded = (index: number) => {
      setExcluded((prev) =>
        prev.filter((_, i) => i !== index)
      );
    };

    const updateExcluded = (
      index: number,
      value: string
    ) => {
      setExcluded((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    };

  /* ---------------- Day Activities ---------------- */

  const addDay = () => {
    setActivities((prev) => [
      ...prev,
      {
        day: prev.length + 1,
        title: "",
        description: "",
      },
    ]);
  };

  const removeDay = (index: number) => {
    setActivities((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((activity, i) => ({
          ...activity,
          day: i + 1,
        }))
    );
  };

  const updateDay = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setActivities((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      if (!isEditMode && !mainImage) {
        toast.error("Please select a main image");
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("title", packageName);
      formData.append("destination", destination);
      formData.append("duration", duration);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("tourType", tourType);
      formData.append("rating", rating);

      // Main image
      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      // Gallery images
      galleryImages.forEach((image) => {
        formData.append("galleryImages", image);
      });

      // Highlights
      formData.append(
        "highlights",
        JSON.stringify(
          highlights.filter(
            (highlight) => highlight.trim() !== ""
          )
        )
      );

      // Included
      formData.append(
        "included",
        JSON.stringify(
          included.filter(
            (item) => item.trim() !== ""
          )
        )
      );

      // Excluded
      formData.append(
        "excluded",
        JSON.stringify(
          excluded.filter(
            (item) => item.trim() !== ""
          )
        )
      );

      // Itinerary
      formData.append(
        "itinerary",
        JSON.stringify(activities)
      );

      const url = isEditMode
        ? `/api/packages/${editPackage?._id}`
        : "/api/packages";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditMode
              ? "Failed to update package"
              : "Failed to create package")
        );
      }

      toast.success(
        isEditMode
          ? "Package updated successfully!"
          : "Package created successfully!"
      );
      onSuccess?.(data.package);

    } catch (error) {
      console.error(
        isEditMode
          ? "UPDATE PACKAGE ERROR:"
          : "CREATE PACKAGE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : isEditMode
            ? "Failed to update package"
            : "Failed to create package"
      );

    } finally {
      setIsSubmitting(false);
    }
};

useEffect(() => {
  if (!editPackage) return;

  setPackageName(editPackage.title);
  setDestination(editPackage.destination);
  setDuration(editPackage.duration);
  setPrice(String(editPackage.price));
  setStatus(editPackage.status);
  setDescription(editPackage.description || "");

  setTourType(editPackage.tourType || "Adventure");
  setRating(
    typeof editPackage.rating === "number"
      ? String(editPackage.rating)
      : "0"
  );

  setMainImage(null);
  setMainImagePreview(editPackage.mainImage || "");

  setGalleryImages([]);
  setGalleryPreviews(editPackage.galleryImages || []);

  setHighlights(
    editPackage.highlights?.length
      ? editPackage.highlights
      : [""]
  );

  setIncluded(
    editPackage.included?.length
      ? editPackage.included
      : [""]
  );

  setExcluded(
    editPackage.excluded?.length
      ? editPackage.excluded
      : [""]
  );

  setActivities(
    editPackage.itinerary?.length
      ? editPackage.itinerary
      : [
          {
            day: 1,
            title: "",
            description: "",
          },
        ]
  );
}, [editPackage]);



  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
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
      <div
        className="
          relative
          flex
          max-h-[92vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Package Management
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {isEditMode
                ? "Edit Package"
                : "Add New Package"}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              {isEditMode
                ? "Update the details of this travel package."
                : "Create a complete travel package for your website."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex h-9 w-9 items-center justify-center
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

        {/* ================================================= */}
        {/* BODY */}
        {/* ================================================= */}

        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-8">

            {/* ================================================= */}
            {/* BASIC INFORMATION */}
            {/* ================================================= */}

            <section>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900">
                  Basic Information
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  General information about the travel package.
                </p>
              </div>

              <div className="space-y-5">
                {/* Package Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Package Name
                  </label>

                  <input
                    type="text"
                    value={packageName}
                    onChange={(e) =>
                      setPackageName(e.target.value)
                    }
                    placeholder="e.g. Switzerland Escape"
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

                {/* Destination + Duration */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Destination
                    </label>

                    <input
                      type="text"
                      value={destination}
                      onChange={(e) =>
                        setDestination(e.target.value)
                      }
                      placeholder="e.g. Switzerland"
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

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Duration
                    </label>

                    <input
                      type="text"
                      value={duration}
                      onChange={(e) =>
                        setDuration(e.target.value)
                      }
                      placeholder="e.g. 7 Days / 6 Nights"
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
                </div>

                {/* Price + Tour Type + Rating + Status */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Price */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      placeholder="125000"
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

                  {/* Tour Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tour Type
                    </label>

                    <select
                      value={tourType}
                      onChange={(e) =>
                        setTourType(e.target.value)
                      }
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
                        focus:border-orange-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-orange-100
                      "
                    >
                      <option value="Adventure">
                        Adventure
                      </option>

                      <option value="Family">
                        Family
                      </option>

                      <option value="Honeymoon">
                        Honeymoon
                      </option>

                      <option value="Cultural">
                        Cultural
                      </option>

                      <option value="Luxury">
                        Luxury
                      </option>

                      <option value="Beach">
                        Beach
                      </option>

                      <option value="Wildlife">
                        Wildlife
                      </option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Rating
                    </label>

                    <select
                      value={rating}
                      onChange={(e) =>
                        setRating(e.target.value)
                      }
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
                        focus:border-orange-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-orange-100
                      "
                    >
                      <option value="0">No Rating</option>
                      <option value="1">1.0</option>
                      <option value="2">2.0</option>
                      <option value="3">3.0</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5.0</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Status
                    </label>

                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value)
                      }
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
                        focus:border-orange-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-orange-100
                      "
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Draft">
                        Draft
                      </option>
                    </select>
                  </div>

                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Write a short description about this package..."
                    className="
                      w-full resize-none rounded-xl
                      border border-gray-200
                      bg-gray-50 px-4 py-3
                      text-sm text-gray-800
                      outline-none transition
                      placeholder:text-gray-400
                      focus:border-orange-400
                      focus:bg-white
                      focus:ring-2 focus:ring-orange-100
                    "
                  />
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* IMAGES */}
            {/* ================================================= */}

            <section>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900">
                  Package Images
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Add a main image and additional destination images.
                </p>
              </div>

              <div className="space-y-5">
                {/* Main Image */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Main Package Image
                    {!isEditMode && (
                      <span className="ml-1 text-orange-500">*</span>
                    )}
                  </label>

                  {!mainImagePreview ? (
                    <label
                      className="
                        flex h-44 cursor-pointer flex-col
                        items-center justify-center
                        rounded-xl
                        border-2 border-dashed
                        border-gray-200
                        bg-gray-50
                        transition
                        hover:border-orange-300
                        hover:bg-orange-50/40
                      "
                    >
                      <Upload
                        size={25}
                        className="text-gray-400"
                      />

                      <span className="mt-3 text-sm font-medium text-gray-600">
                        Upload main image
                      </span>

                      <span className="mt-1 text-xs text-gray-400">
                        This image will represent the package
                      </span>

                      <span className="mt-1 text-[11px] text-gray-400">
                        JPG, PNG or WEBP
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImage}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative h-52 overflow-hidden rounded-xl">
                      <img
                        src={mainImagePreview}
                        alt="Main package preview"
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setMainImage(null);
                          setMainImagePreview("");
                        }}
                        className="
                          absolute right-3 top-3
                          flex h-9 w-9
                          items-center justify-center
                          rounded-lg
                          bg-black/50
                          text-white
                          backdrop-blur-sm
                          transition
                          hover:bg-red-500
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Gallery */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Additional Images
                    </label>

                    <span className="text-xs text-gray-400">
                      Multiple images allowed
                    </span>
                  </div>

                  <label
                    className="
                      flex h-24 cursor-pointer
                      items-center justify-center
                      gap-3
                      rounded-xl
                      border-2 border-dashed
                      border-gray-200
                      bg-gray-50
                      transition
                      hover:border-orange-300
                      hover:bg-orange-50/40
                    "
                  >
                    <ImagePlus
                      size={21}
                      className="text-gray-400"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Add more images
                      </p>

                      <p className="text-xs text-gray-400">
                        Select multiple destination photos
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImages}
                      className="hidden"
                    />
                  </label>

                  {galleryPreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {galleryPreviews.map((preview, index) => (
                        <div
                          key={preview}
                          className="
                            group
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                          "
                        >
                          <img
                            src={preview}
                            alt={`Gallery ${index + 1}`}
                            className="h-full w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeGalleryImage(index)
                            }
                            className="
                              absolute right-2 top-2
                              flex h-7 w-7
                              items-center justify-center
                              rounded-lg
                              bg-black/50
                              text-white
                              opacity-0
                              backdrop-blur-sm
                              transition
                              group-hover:opacity-100
                              hover:bg-red-500
                            "
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* HIGHLIGHTS */}
            {/* ================================================= */}

            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Package Highlights
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Add the main experiences included in the package.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addHighlight}
                  className="
                    inline-flex items-center gap-1
                    text-xs font-semibold
                    text-orange-500
                    hover:text-orange-600
                  "
                >
                  <Plus size={14} />
                  Add Highlight
                </button>
              </div>

              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xs font-bold text-orange-500">
                      {index + 1}
                    </div>

                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        updateHighlight(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="e.g. Swiss Alps sightseeing"
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

                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeHighlight(index)
                        }
                        className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          text-gray-400
                          hover:bg-red-50
                          hover:text-red-500
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================= */}
            {/* INCLUDED & EXCLUDED */}
            {/* ================================================= */}

            <section>
              <div className="mb-5">
                <h3 className="text-sm font-bold text-gray-900">
                  Package Includes & Excludes
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Specify what is included and not included in this package.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">

                {/* ================= INCLUDED ================= */}

                <div className="rounded-2xl border border-green-100 bg-green-50/40 p-5">

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        What's Included
                      </h4>

                      <p className="mt-1 text-xs text-gray-400">
                        Services included in the package.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addIncluded}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-lg
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-green-600
                        shadow-sm
                        transition
                        hover:bg-green-50
                      "
                    >
                      <Plus size={14} />
                      Add
                    </button>

                  </div>

                  <div className="space-y-3">

                    {included.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-green-100
                            text-xs
                            font-bold
                            text-green-600
                          "
                        >
                          ✓
                        </div>

                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            updateIncluded(
                              index,
                              e.target.value
                            )
                          }
                          placeholder="e.g. Daily breakfast"
                          className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-4
                            text-sm
                            text-gray-800
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-green-400
                            focus:ring-2
                            focus:ring-green-100
                          "
                        />

                        {included.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeIncluded(index)
                            }
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              text-gray-400
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                            "
                          >
                            <Trash2 size={15} />
                          </button>
                        )}

                      </div>
                    ))}

                  </div>

                </div>

                {/* ================= EXCLUDED ================= */}

                <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        What's Not Included
                      </h4>

                      <p className="mt-1 text-xs text-gray-400">
                        Services not included in the package.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addExcluded}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-lg
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-red-500
                        shadow-sm
                        transition
                        hover:bg-red-50
                      "
                    >
                      <Plus size={14} />
                      Add
                    </button>

                  </div>

                  <div className="space-y-3">

                    {excluded.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-red-100
                            text-xs
                            font-bold
                            text-red-500
                          "
                        >
                          ×
                        </div>

                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            updateExcluded(
                              index,
                              e.target.value
                            )
                          }
                          placeholder="e.g. International airfare"
                          className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-4
                            text-sm
                            text-gray-800
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-red-400
                            focus:ring-2
                            focus:ring-red-100
                          "
                        />

                        {excluded.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeExcluded(index)
                            }
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              text-gray-400
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                            "
                          >
                            <Trash2 size={15} />
                          </button>
                        )}

                      </div>
                    ))}

                  </div>

                </div>

              </div>
            </section>

            {/* ================================================= */}
            {/* DAY BY DAY ITINERARY */}
            {/* ================================================= */}

            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                      <CalendarDays size={17} />
                    </div>

                    <h3 className="text-sm font-bold text-gray-900">
                      Your Journey Day by Day
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Add activities and experiences for each day.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addDay}
                  className="
                    inline-flex items-center gap-1
                    rounded-lg
                    bg-orange-50
                    px-3 py-2
                    text-xs font-semibold
                    text-orange-500
                    transition
                    hover:bg-orange-100
                  "
                >
                  <Plus size={14} />
                  Add Day
                </button>
              </div>

              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="
                      relative
                      rounded-2xl
                      border border-gray-100
                      bg-gray-50/60
                      p-5
                    "
                  >
                    {/* Day Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-xl
                            bg-orange-500
                            text-sm
                            font-bold
                            text-white
                          "
                        >
                          {activity.day}
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-500">
                            Day {activity.day}
                          </p>

                          <p className="text-xs text-gray-400">
                            Journey activity
                          </p>
                        </div>
                      </div>

                      {activities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDay(index)}
                          className="
                            flex h-8 w-8
                            items-center justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                          "
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    {/* Day Title */}
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Activity Title
                      </label>

                      <input
                        type="text"
                        value={activity.title}
                        onChange={(e) =>
                          updateDay(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Arrival in Zurich"
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

                    {/* Day Description */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Activity Description
                      </label>

                      <textarea
                        rows={3}
                        value={activity.description}
                        onChange={(e) =>
                          updateDay(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe what happens during this day..."
                        className="
                          w-full resize-none
                          rounded-xl
                          border border-gray-200
                          bg-white
                          px-4 py-3
                          text-sm text-gray-800
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-orange-400
                          focus:ring-2
                          focus:ring-orange-100
                        "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-4">
          <p className="hidden text-xs text-gray-400 sm:block">
            You can edit package details later.
          </p>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                rounded-xl
                border border-gray-200
                bg-white
                px-5 py-2.5
                text-sm font-semibold
                text-gray-600
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
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
                min-w-[145px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-500
                px-5 py-2.5
                text-sm font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-orange-600
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  {isEditMode
                    ? "Saving..."
                    : "Creating..."}
                </>
              ) : (
                isEditMode
                  ? "Save Changes"
                  : "Create Package"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}