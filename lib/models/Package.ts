import mongoose, { Schema, Document, Model } from "mongoose";

export interface IItinerary {
  day: number;
  title: string;
  description: string;
}

export interface IPackage extends Document {
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

  itinerary: IItinerary[];

  status: "Active" | "Draft";
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const itinerarySchema = new Schema<IItinerary>(
  {
    day: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const packageSchema = new Schema<IPackage>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    galleryImages: {
      type: [String],
      default: [],
    },

    highlights: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: [itinerarySchema],
      default: [],
    },

    included: {
      type: [String],
      default: [],
    },

    excluded: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

const Package: Model<IPackage> =
  mongoose.models.Package ||
  mongoose.model<IPackage>("Package", packageSchema);

export default Package;