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
        max-h-[94vh]
        w-full
        max-w-4xl
        flex-col
        overflow-hidden
        rounded-xl
        bg-white
        shadow-2xl
        sm:rounded-2xl
      "
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-6 sm:py-5">
          <div>

            <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 sm:text-xs">
              Package Management
            </p>

            <h2 className="mt-0.5 text-lg font-bold text-gray-900 sm:mt-1 sm:text-xl">
              {isEditMode
                ? "Edit Package"
                : "Add New Package"}
            </h2>

            <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
              {isEditMode
                ? "Update the details of this travel package."
                : "Create a complete travel package for your website."}
            </p>

          </div>

          <button
            onClick={onClose}
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
              sm:h-9
              sm:w-9
            "
          >
            <X size={17} className="sm:h-[19px] sm:w-[19px]" />
          </button>
        </div>

        {/* ================================================= */}
        {/* BODY */}
        {/* ================================================= */}

        <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="space-y-6 sm:space-y-8">

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
                  <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
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
                        h-10
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-3
                        sm:h-11
                        sm:px-4
                        sm:text-sm
                        text-xs
                        text-gray-800
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-blue-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-100
                        "
                  />
                </div>

                {/* Destination + Duration */}
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">

                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
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

                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
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

                  </div>

                {/* Price + Tour Type + Rating + Status */}
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">

                  {/* Price */}
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
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

                  {/* Tour Type */}
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
                      Tour Type
                    </label>

                    <select
                      value={tourType}
                      onChange={(e) =>
                        setTourType(e.target.value)
                      }
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
                        focus:border-blue-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-100
                        sm:h-11
                        sm:rounded-xl
                        sm:px-4
                        sm:text-sm
                      "
                    >
                      <option value="Adventure">Adventure</option>
                      <option value="Family">Family</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Beach">Beach</option>
                      <option value="Wildlife">Wildlife</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
                      Rating
                    </label>

                    <select
                      value={rating}
                      onChange={(e) =>
                        setRating(e.target.value)
                      }
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
                        focus:border-blue-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-100
                        sm:h-11
                        sm:rounded-xl
                        sm:px-4
                        sm:text-sm
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
                    <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
                      Status
                    </label>

                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value)
                      }
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
                        focus:border-blue-400
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-100
                        sm:h-11
                        sm:rounded-xl
                        sm:px-4
                        sm:text-sm
                      "
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                </div>

                {/* Description */}
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
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
              </div>
            </section>

            {/* ================================================= */}
            {/* IMAGES */}
            {/* ================================================= */}

            <section>
              <div className="mb-3 sm:mb-4">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
                  Package Images
                </h3>

                <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                  Add a main image and additional destination images.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5">

                {/* Main Image */}
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    Main Package Image

                    {!isEditMode && (
                      <span className="ml-1 text-blue-500">*</span>
                    )}
                  </label>

                  {!mainImagePreview ? (
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
                        sm:h-44
                        sm:rounded-xl
                      "
                    >
                      <Upload
                        size={21}
                        className="text-gray-400 sm:h-[25px] sm:w-[25px]"
                      />

                      <span className="mt-2 text-xs font-medium text-gray-600 sm:mt-3 sm:text-sm">
                        Upload main image
                      </span>

                      <span className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                        This image will represent the package
                      </span>

                      <span className="mt-0.5 text-[9px] text-gray-400 sm:mt-1 sm:text-[11px]">
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
                    <div className="relative h-40 overflow-hidden rounded-lg sm:h-52 sm:rounded-xl">
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
                          absolute
                          right-2
                          top-2
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-black/50
                          text-white
                          backdrop-blur-sm
                          transition
                          hover:bg-red-500
                          sm:right-3
                          sm:top-3
                          sm:h-9
                          sm:w-9
                        "
                      >
                        <Trash2
                          size={14}
                          className="sm:h-4 sm:w-4"
                        />
                      </button>
                    </div>
                  )}
                </div>

                {/* Gallery */}
                <div>

                  <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                    <label className="text-xs font-medium text-gray-700 sm:text-sm">
                      Additional Images
                    </label>

                    <span className="text-[10px] text-gray-400 sm:text-xs">
                      Multiple images allowed
                    </span>
                  </div>

                  <label
                    className="
                      flex
                      h-20
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border-2
                      border-dashed
                      border-gray-200
                      bg-gray-50
                      transition
                      hover:border-blue-300
                      hover:bg-blue-50/40
                      sm:h-24
                      sm:gap-3
                      sm:rounded-xl
                    "
                  >
                    <ImagePlus
                      size={18}
                      className="text-gray-400 sm:h-[21px] sm:w-[21px]"
                    />

                    <div>
                      <p className="text-xs font-medium text-gray-600 sm:text-sm">
                        Add more images
                      </p>

                      <p className="text-[10px] text-gray-400 sm:text-xs">
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
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-4 sm:gap-3">
                      {galleryPreviews.map((preview, index) => (
                        <div
                          key={preview}
                          className="
                            group
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            rounded-lg
                            bg-gray-100
                            sm:rounded-xl
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
                              absolute
                              right-1.5
                              top-1.5
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                              rounded-md
                              bg-black/50
                              text-white
                              opacity-100
                              backdrop-blur-sm
                              transition
                              hover:bg-red-500
                              sm:right-2
                              sm:top-2
                              sm:h-7
                              sm:w-7
                              sm:rounded-lg
                              sm:opacity-0
                              sm:group-hover:opacity-100
                            "
                          >
                            <X
                              size={12}
                              className="sm:h-[14px] sm:w-[14px]"
                            />
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
              <div className="mb-3 flex items-end justify-between sm:mb-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
                    Package Highlights
                  </h3>

                  <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                    Add the main experiences included in the package.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addHighlight}
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-[11px]
                    font-semibold
                    text-blue-600
                    hover:text-blue-700
                    sm:text-xs
                  "
                >
                  <Plus size={13} className="sm:h-[14px] sm:w-[14px]" />
                  Add Highlight
                </button>
              </div>

              <div className="space-y-1.5 sm:space-y-2">

                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >

                    {/* Number */}
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-[10px]
                        font-bold
                        text-blue-600
                        sm:h-10
                        sm:w-10
                        sm:rounded-xl
                        sm:text-xs
                      "
                    >
                      {index + 1}
                    </div>

                    {/* Highlight input */}
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

                    {/* Remove */}
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeHighlight(index)
                        }
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
                          hover:bg-red-50
                          hover:text-red-500
                          sm:h-10
                          sm:w-10
                          sm:rounded-xl
                        "
                      >
                        <Trash2
                          size={14}
                          className="sm:h-4 sm:w-4"
                        />
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
              <div className="mb-3 sm:mb-5">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
                  Package Includes & Excludes
                </h3>

                <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                  Specify what is included and not included in this package.
                </p>
              </div>

              <div className="grid gap-3 lg:grid-cols-2 lg:gap-5">

                {/* ================= INCLUDED ================= */}

                <div className="rounded-xl border border-green-100 bg-green-50/40 p-3.5 sm:rounded-2xl sm:p-5">

                  <div className="mb-3 flex items-center justify-between sm:mb-4">

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 sm:text-sm">
                        What's Included
                      </h4>

                      <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                        Services included in the package.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addIncluded}
                      className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-1
                        rounded-md
                        bg-white
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-green-600
                        shadow-sm
                        transition
                        hover:bg-green-50
                        sm:rounded-lg
                        sm:px-3
                        sm:py-2
                        sm:text-xs
                      "
                    >
                      <Plus size={12} className="sm:h-[14px] sm:w-[14px]" />
                      Add
                    </button>

                  </div>

                  <div className="space-y-2 sm:space-y-3">

                    {included.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 sm:gap-2"
                      >

                        <div
                          className="
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            bg-green-100
                            text-[10px]
                            font-bold
                            text-green-600
                            sm:h-9
                            sm:w-9
                            sm:rounded-lg
                            sm:text-xs
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
                            h-9
                            w-full
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            text-xs
                            text-gray-800
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-green-400
                            focus:ring-2
                            focus:ring-green-100
                            sm:h-11
                            sm:rounded-xl
                            sm:px-4
                            sm:text-sm
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
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-md
                              text-gray-400
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                              sm:h-9
                              sm:w-9
                              sm:rounded-lg
                            "
                          >
                            <Trash2
                              size={13}
                              className="sm:h-[15px] sm:w-[15px]"
                            />
                          </button>
                        )}

                      </div>
                    ))}

                  </div>

                </div>


                {/* ================= EXCLUDED ================= */}

                <div className="rounded-xl border border-red-100 bg-red-50/40 p-3.5 sm:rounded-2xl sm:p-5">

                  <div className="mb-3 flex items-center justify-between sm:mb-4">

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 sm:text-sm">
                        What's Not Included
                      </h4>

                      <p className="mt-0.5 text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
                        Services not included in the package.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addExcluded}
                      className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-1
                        rounded-md
                        bg-white
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-red-500
                        shadow-sm
                        transition
                        hover:bg-red-50
                        sm:rounded-lg
                        sm:px-3
                        sm:py-2
                        sm:text-xs
                      "
                    >
                      <Plus size={12} className="sm:h-[14px] sm:w-[14px]" />
                      Add
                    </button>

                  </div>

                  <div className="space-y-2 sm:space-y-3">

                    {excluded.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 sm:gap-2"
                      >

                        <div
                          className="
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            bg-red-100
                            text-[10px]
                            font-bold
                            text-red-500
                            sm:h-9
                            sm:w-9
                            sm:rounded-lg
                            sm:text-xs
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
                            h-9
                            w-full
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            text-xs
                            text-gray-800
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-red-400
                            focus:ring-2
                            focus:ring-red-100
                            sm:h-11
                            sm:rounded-xl
                            sm:px-4
                            sm:text-sm
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
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-md
                              text-gray-400
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                              sm:h-9
                              sm:w-9
                              sm:rounded-lg
                            "
                          >
                            <Trash2
                              size={13}
                              className="sm:h-[15px] sm:w-[15px]"
                            />
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
                <div className="mb-3 flex items-end justify-between sm:mb-5">

                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">

                      <div className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        sm:h-8
                        sm:w-8
                      ">
                        <CalendarDays
                          size={15}
                          className="sm:h-[17px] sm:w-[17px]"
                        />
                      </div>

                      <h3 className="text-xs font-bold text-gray-900 sm:text-sm">
                        Your Journey Day by Day
                      </h3>

                    </div>

                    <p className="mt-1.5 text-[10px] text-gray-400 sm:mt-2 sm:text-xs">
                      Add activities and experiences for each day.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addDay}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-md
                      bg-blue-50
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-blue-600
                      transition
                      hover:bg-blue-100
                      sm:rounded-lg
                      sm:px-3
                      sm:py-2
                      sm:text-xs
                    "
                  >
                    <Plus
                      size={12}
                      className="sm:h-[14px] sm:w-[14px]"
                    />
                    Add Day
                  </button>

                </div>


                <div className="space-y-3 sm:space-y-4">

                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="
                        relative
                        rounded-xl
                        border
                        border-gray-100
                        bg-gray-50/60
                        p-3.5
                        sm:rounded-2xl
                        sm:p-5
                      "
                    >

                      {/* Day Header */}

                      <div className="mb-3 flex items-center justify-between sm:mb-4">

                        <div className="flex items-center gap-2 sm:gap-3">

                          <div
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              bg-gradient-to-br
                              from-cyan-400
                              to-blue-600
                              text-xs
                              font-bold
                              text-white
                              sm:h-10
                              sm:w-10
                              sm:rounded-xl
                              sm:text-sm
                            "
                          >
                            {activity.day}
                          </div>

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 sm:text-[11px]">
                              Day {activity.day}
                            </p>

                            <p className="text-[10px] text-gray-400 sm:text-xs">
                              Journey activity
                            </p>
                          </div>

                        </div>

                        {activities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDay(index)}
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-lg
                              text-gray-400
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                              sm:h-8
                              sm:w-8
                            "
                          >
                            <Trash2
                              size={13}
                              className="sm:h-[15px] sm:w-[15px]"
                            />
                          </button>
                        )}

                      </div>


                      {/* Day Title */}

                      <div className="mb-3 sm:mb-4">

                        <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
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


                      {/* Day Description */}

                      <div>

                        <label className="mb-1 block text-[11px] font-medium text-gray-700 sm:mb-2 sm:text-sm">
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
                            w-full
                            resize-none
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-2.5
                            text-xs
                            text-gray-800
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-blue-400
                            focus:ring-2
                            focus:ring-blue-100
                            sm:rounded-xl
                            sm:px-4
                            sm:py-3
                            sm:text-sm
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

        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-3 py-3 sm:px-6 sm:py-4">

          ``<p className="hidden text-xs text-gray-400 sm:block">
            You can edit package details later.
          </p>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
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