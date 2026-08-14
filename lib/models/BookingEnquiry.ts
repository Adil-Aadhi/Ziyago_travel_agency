import mongoose, {
  Schema,
  Document,
  Model,
  Types,
} from "mongoose";

export interface IBookingEnquiry extends Document {
  packageId: Types.ObjectId;
  packageTitle: string;

  name: string;
  email: string;
  phone: string;

  travellers: number;
  travelDate?: Date;

  message: string;

  status:
    | "pending"
    | "contacted"
    | "confirmed"
    | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const BookingEnquirySchema =
  new Schema<IBookingEnquiry>(
    {
      /* -----------------------------------------------
         Package
      ------------------------------------------------ */

      packageId: {
        type: Schema.Types.ObjectId,
        ref: "Package",
        required: true,
      },

      packageTitle: {
        type: String,
        required: true,
        trim: true,
      },

      /* -----------------------------------------------
         Customer
      ------------------------------------------------ */

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      /* -----------------------------------------------
         Trip Details
      ------------------------------------------------ */

      travellers: {
        type: Number,
        required: true,
        min: 1,
      },

      travelDate: {
        type: Date,
      },

      message: {
        type: String,
        default: "",
        trim: true,
      },

      /* -----------------------------------------------
         Status
      ------------------------------------------------ */

      status: {
        type: String,
        enum: [
          "pending",
          "contacted",
          "confirmed",
          "cancelled",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

const BookingEnquiry: Model<IBookingEnquiry> =
  mongoose.models.BookingEnquiry ||
  mongoose.model<IBookingEnquiry>(
    "BookingEnquiry",
    BookingEnquirySchema
  );

export default BookingEnquiry;