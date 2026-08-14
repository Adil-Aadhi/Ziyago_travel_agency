"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const ITEMS_PER_PAGE = 10;

export default function ContactEnquiriesPage() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [contacts, setContacts] = useState<
    ContactMessage[]
  >([]);

  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [selectedContact, setSelectedContact] =
    useState<ContactMessage | null>(null);

    const [updatingStatus, setUpdatingStatus] =
  useState(false);

  const [statusFilter, setStatusFilter] =
  useState<"all" | "new" | "read">("all");

  /* -------------------------------------------------------
     Fetch contact enquiries
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/admin/contact-enquiries?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch contact enquiries"
          );
        }

        setContacts(data.contacts || []);

        setPagination(
          data.pagination || null
        );
      } catch (error) {
        console.error(
          "FETCH CONTACT ENQUIRIES ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch contact enquiries"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [currentPage]);

  /* -------------------------------------------------------
     Format date
  ------------------------------------------------------- */

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* -------------------------------------------------------
     Status styles
  ------------------------------------------------------- */

  const getStatusClass = (
    status: ContactMessage["status"]
  ) => {
    switch (status) {
      case "new":
        return "bg-orange-50 text-orange-600";

      case "read":
        return "bg-blue-50 text-blue-600";

      case "replied":
        return "bg-green-50 text-green-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const markContactAsRead = async (
  contact: ContactMessage
) => {
  // Already read or replied
  if (contact.status !== "new") {
    return;
  }

  try {
    setUpdatingStatus(true);

    const response = await fetch(
      `/api/admin/contact-enquiries/${contact._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Failed to mark enquiry as read"
      );
    }

    // Update table
    setContacts((prev) =>
      prev.map((item) =>
        item._id === contact._id
          ? data.contact
          : item
      )
    );

    // Update modal
    setSelectedContact(data.contact);

    toast.success(
      "Contact enquiry marked as read"
    );
  } catch (error) {
    console.error(
      "MARK CONTACT AS READ ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to mark enquiry as read"
    );
  } finally {
    setUpdatingStatus(false);
  }
};

const filteredContacts =
  contacts.filter((contact) => {
    if (statusFilter === "all") {
      return true;
    }

    return contact.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() =>
            setMobileOpen(false)
          }
        />

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

          <AdminHeader
            onMenuClick={() =>
              setMobileOpen(true)
            }
          />

          <main className="flex-1 p-5 md:p-8">

            {/* Header */}

            <div className="mb-8">

              <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
                Customer Messages
              </p>

              <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Contact Enquiries
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage messages submitted through
                    the contact page.
                  </p>
                </div>

                

                {pagination && (
                  <div className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                    {pagination.totalItems}{" "}
                    {pagination.totalItems === 1
                      ? "Message"
                      : "Messages"}
                  </div>
                )}

              </div>
            </div>

            {/* Status Filter */}

                <div className="mb-5 flex items-center gap-2">

                <button
                    type="button"
                    onClick={() => setStatusFilter("all")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "all"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
                    }
                    `}
                >
                    All
                </button>

                <button
                    type="button"
                    onClick={() => setStatusFilter("new")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "new"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
                    }
                    `}
                >
                    New
                </button>

                <button
                    type="button"
                    onClick={() => setStatusFilter("read")}
                    className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        statusFilter === "read"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
                    }
                    `}
                >
                    Read
                </button>

                </div>

            {/* Content */}

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Loading */}

              {loading && (
                <div className="flex min-h-[400px] items-center justify-center">

                  <div className="flex items-center gap-3 text-gray-500">

                    <Loader2
                      size={22}
                      className="animate-spin"
                    />

                    <span className="text-sm">
                      Loading contact enquiries...
                    </span>

                  </div>

                </div>
              )}

              {/* Empty */}

              {!loading &&
                    filteredContacts.length === 0 && (
                        <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

                        <MessageSquare
                            size={42}
                            className="text-gray-300"
                        />

                        <h2 className="mt-4 text-lg font-semibold text-gray-800">
                            {statusFilter === "all"
                            ? "No contact enquiries"
                            : `No ${statusFilter} enquiries`}
                        </h2>

                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            {statusFilter === "all"
                            ? "Messages submitted through the contact page will appear here."
                            : `There are no ${statusFilter} contact enquiries.`}
                        </p>

                        </div>
                    )}

              {/* Table */}

              {!loading &&
                contacts.length > 0 && (
                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Customer
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Subject
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Phone
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Status
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Submitted
                          </th>

                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">

                        {filteredContacts.map(
                          (contact) => (
                            <tr
                                key={contact._id}
                                onClick={() => {
                                    setSelectedContact(contact);

                                    if (contact.status === "new") {
                                    markContactAsRead(contact);
                                    }
                                }}
                                className="
                                    cursor-pointer
                                    transition
                                    hover:bg-orange-50/40
                                "
                                >

                              {/* Customer */}

                              <td className="px-6 py-5">

                                <div className="font-medium text-gray-900">
                                  {contact.name}
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  {contact.email}
                                </div>

                              </td>

                              {/* Subject */}

                              <td className="px-6 py-5">

                                <p className="max-w-[260px] truncate text-sm font-medium text-gray-800">
                                  {contact.subject}
                                </p>

                              </td>

                              {/* Phone */}

                              <td className="px-6 py-5 text-sm text-gray-600">
                                {contact.phone ||
                                  "Not provided"}
                              </td>

                              {/* Status */}

                              <td className="px-6 py-5">

                                <span
                                  className={`
                                    inline-flex
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    capitalize
                                    ${getStatusClass(
                                      contact.status
                                    )}
                                  `}
                                >
                                  {contact.status}
                                </span>

                              </td>

                              {/* Date */}

                              <td className="px-6 py-5 text-sm text-gray-500">
                                {formatDate(
                                  contact.createdAt
                                )}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              {/* Pagination */}

              {!loading &&
                pagination &&
                pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">

                    <p className="text-sm text-gray-500">
                      Page{" "}
                      <span className="font-medium text-gray-800">
                        {pagination.currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-800">
                        {pagination.totalPages}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              Math.max(
                                page - 1,
                                1
                              )
                          )
                        }
                        disabled={
                          !pagination.hasPreviousPage
                        }
                        className="
                          flex
                          h-9
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-3
                          text-sm
                          font-medium
                          text-gray-700
                          transition
                          hover:border-orange-400
                          hover:text-orange-500
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <ChevronLeft
                          size={16}
                        />
                        Previous
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              page + 1
                          )
                        }
                        disabled={
                          !pagination.hasNextPage
                        }
                        className="
                          flex
                          h-9
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-3
                          text-sm
                          font-medium
                          text-gray-700
                          transition
                          hover:border-orange-400
                          hover:text-orange-500
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        Next
                        <ChevronRight
                          size={16}
                        />
                      </button>

                    </div>

                  </div>
                )}

            </div>

          </main>
        </div>
      </div>

      {/* -------------------------------------------------------
          Contact Details Modal
      ------------------------------------------------------- */}

      {selectedContact && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onClick={() =>
            setSelectedContact(null)
          }
        >
          <div
            className="
              w-full
              max-w-2xl
              rounded-2xl
              bg-white
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Contact Enquiry
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedContact.subject}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedContact(null)
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                ×
              </button>

            </div>

            {/* Details */}

            <div className="space-y-6 px-6 py-6">

              {/* Customer */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Customer
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {selectedContact.name}
                </p>
              </div>

              {/* Contact */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="text-sm text-gray-700">
                      {selectedContact.email}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="text-sm text-gray-700">
                      {selectedContact.phone ||
                        "Not provided"}
                    </p>
                  </div>

                </div>

              </div>

              {/* Subject */}

              <div>
                <p className="text-xs text-gray-400">
                  Subject
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {selectedContact.subject}
                </p>
              </div>

              {/* Status */}

              <div>

                <p className="text-xs text-gray-400">
                  Status
                </p>

                <span
                  className={`
                    mt-2
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    capitalize
                    ${getStatusClass(
                      selectedContact.status
                    )}
                  `}
                >
                  {selectedContact.status}
                </span>

              </div>

              {/* Message */}

              <div>

                <p className="text-xs text-gray-400">
                  Message
                </p>

                <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                  {selectedContact.message ||
                    "No message provided."}
                </div>

              </div>

              {/* Submitted */}

              <div>

                <p className="text-xs text-gray-400">
                  Submitted
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {formatDate(
                    selectedContact.createdAt
                  )}
                </p>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}