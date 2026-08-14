import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;

  status:
    | "new"
    | "read"
    | "replied";

  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema =
  new Schema<IContactMessage>(
    {
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
        default: "",
        trim: true,
      },

      subject: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "new",
          "read",
          "replied",
        ],
        default: "new",
      },
    },
    {
      timestamps: true,
    }
  );

const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>(
    "ContactMessage",
    ContactMessageSchema
  );

export default ContactMessage;