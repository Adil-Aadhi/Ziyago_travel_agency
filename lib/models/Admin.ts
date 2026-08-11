import mongoose, { Schema, model, models } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

const Admin =
  models.Admin || model("Admin", adminSchema);

export default Admin;