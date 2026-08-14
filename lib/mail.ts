import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendBookingAdminEmail({
  packageTitle,
  name,
  email,
  phone,
  travellers,
  travelDate,
  message,
}: {
  packageTitle: string;
  name: string;
  email: string;
  phone: string;
  travellers: number;
  travelDate?: string | null;
  message?: string;
}) {
  await transporter.sendMail({
    from: `"ZiyaGo Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,

    subject: `New Booking Request - ${packageTitle}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">

        <h2 style="color: #f97316;">
          New Booking Request
        </h2>

        <p>
          A customer has submitted a new booking request
          through the website.
        </p>

        <hr />

        <h3>Package Details</h3>

        <p>
          <strong>Package:</strong>
          ${packageTitle}
        </p>

        <h3>Customer Details</h3>

        <p>
          <strong>Name:</strong>
          ${name}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Phone:</strong>
          ${phone}
        </p>

        <p>
          <strong>Number of Travellers:</strong>
          ${travellers}
        </p>

        <p>
          <strong>Preferred Travel Date:</strong>
          ${travelDate || "Not specified"}
        </p>

        <h3>Message</h3>

        <p>
          ${message || "No additional message provided."}
        </p>

        <hr />

        <p style="color: #666; font-size: 13px;">
          This booking request was submitted from the
          ZiyaGo website.
        </p>

      </div>
    `,
  });
}

export async function sendContactAdminEmail({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"ZiyaGo Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,

    subject: `New Contact Enquiry - ${subject}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">

        <h2 style="color: #f97316;">
          New Contact Enquiry
        </h2>

        <p>
          A visitor has submitted a new enquiry
          through the ZiyaGo website.
        </p>

        <hr />

        <h3>Customer Details</h3>

        <p>
          <strong>Name:</strong>
          ${name}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Phone:</strong>
          ${phone || "Not provided"}
        </p>

        <p>
          <strong>Subject:</strong>
          ${subject}
        </p>

        <h3>Message</h3>

        <p>
          ${message}
        </p>

        <hr />

        <p style="color: #666; font-size: 13px;">
          This enquiry was submitted from the
          ZiyaGo contact page.
        </p>

      </div>
    `,
  });
}