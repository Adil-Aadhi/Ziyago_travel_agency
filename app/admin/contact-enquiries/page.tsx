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
        return "bg-cyan-50 text-cyan-700";

      case "read":
        return "bg-blue-50 text-blue-600";

      case "replied":
        return "bg-green-50 text-green-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  /* -------------------------------------------------------
     Mark as read
  ------------------------------------------------------- */

  const markContactAsRead = async (
    contact: ContactMessage
  ) => {
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

      setContacts((prev) =>
        prev.map((item) =>
          item._id === contact._id
            ? data.contact
            : item
        )
      );

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

          <main className="flex-1 p-3 sm:p-5 md:p-8">

            {/* -------------------------------------------------------
                Header
            ------------------------------------------------------- */}

            <div className="mb-5 sm:mb-8">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                Customer Messages
              </p>

              <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">

                <div className="min-w-0">

                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Contact Enquiries
                  </h1>

                  <p className="mt-0.5 text-[11px] leading-5 text-gray-500 sm:mt-1 sm:text-sm">
                    Manage messages submitted through
                    the contact page.
                  </p>

                </div>

                {pagination && (
                  <div
                    className="
                      w-fit
                      rounded-lg
                      border
                      border-blue-100
                      bg-gradient-to-r
                      from-cyan-50
                      to-blue-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-blue-700
                      shadow-sm
                      sm:rounded-xl
                      sm:px-4
                      sm:py-2
                      sm:text-sm
                    "
                  >
                    {pagination.totalItems}{" "}
                    {pagination.totalItems === 1
                      ? "Message"
                      : "Messages"}
                  </div>
                )}

              </div>
            </div>

            {/* -------------------------------------------------------
                Status Filter
            ------------------------------------------------------- */}

            <div
              className="
                mb-4
                flex
                max-w-full
                items-center
                gap-1.5
                overflow-x-auto
                pb-1
                sm:mb-5
                sm:flex-wrap
                sm:gap-2
                sm:overflow-visible
                sm:pb-0
              "
            >

              {/* All */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("all")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "all"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  }
                `}
              >
                All
              </button>

              {/* New */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("new")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "new"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-cyan-300 hover:text-cyan-600"
                  }
                `}
              >
                New
              </button>

              {/* Read */}

              <button
                type="button"
                onClick={() =>
                  setStatusFilter("read")
                }
                className={`
                  shrink-0
                  rounded-lg
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  transition
                  sm:rounded-xl
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                  ${
                    statusFilter === "read"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  }
                `}
              >
                Read
              </button>

            </div>

            {/* -------------------------------------------------------
                Content
            ------------------------------------------------------- */}

            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
                sm:rounded-2xl
              "
            >

              {/* Loading */}

              {loading && (
                <div className="flex min-h-[300px] items-center justify-center sm:min-h-[400px]">

                  <div className="flex items-center gap-2 text-gray-500 sm:gap-3">

                    <Loader2
                      size={18}
                      className="animate-spin sm:h-[22px] sm:w-[22px]"
                    />

                    <span className="text-xs sm:text-sm">
                      Loading contact enquiries...
                    </span>

                  </div>

                </div>
              )}

              {/* Empty */}

              {!loading &&
                filteredContacts.length === 0 && (
                  <div
                    className="
                      flex
                      min-h-[250px]
                      flex-col
                      items-center
                      justify-center
                      px-4
                      text-center
                      sm:min-h-[400px]
                      sm:px-6
                    "
                  >

                    <MessageSquare
                      size={34}
                      className="text-gray-300 sm:h-[42px] sm:w-[42px]"
                    />

                    <h2 className="mt-3 text-sm font-semibold text-gray-800 sm:mt-4 sm:text-lg">
                      {statusFilter === "all"
                        ? "No contact enquiries"
                        : `No ${statusFilter} enquiries`}
                    </h2>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm">
                      {statusFilter === "all"
                        ? "Messages submitted through the contact page will appear here."
                        : `There are no ${statusFilter} contact enquiries.`}
                    </p>

                  </div>
                )}

              {/* -------------------------------------------------------
                  Table
              ------------------------------------------------------- */}

              {!loading &&
                filteredContacts.length > 0 && (
                  <div className="w-full overflow-x-auto">

                    <table className="w-full min-w-[780px] sm:min-w-[850px]">

                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Customer
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Subject
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Phone
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
                            Status
                          </th>

                          <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-4 sm:text-xs">
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
                                setSelectedContact(
                                  contact
                                );

                                if (
                                  contact.status ===
                                  "new"
                                ) {
                                  markContactAsRead(
                                    contact
                                  );
                                }
                              }}
                              className="
                                cursor-pointer
                                transition
                                hover:bg-blue-50/50
                              "
                            >

                              {/* Customer */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <div className="text-xs font-medium text-gray-900 sm:text-sm">
                                  {contact.name}
                                </div>

                                <div className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs">
                                  {contact.email}
                                </div>

                              </td>

                              {/* Subject */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <p className="max-w-[180px] truncate text-xs font-medium text-gray-800 sm:max-w-[260px] sm:text-sm">
                                  {contact.subject}
                                </p>

                              </td>

                              {/* Phone */}

                              <td className="px-3 py-3 text-xs text-gray-600 sm:px-6 sm:py-5 sm:text-sm">
                                {contact.phone ||
                                  "Not provided"}
                              </td>

                              {/* Status */}

                              <td className="px-3 py-3 sm:px-6 sm:py-5">

                                <span
                                  className={`
                                    inline-flex
                                    rounded-full
                                    px-2
                                    py-0.5
                                    text-[10px]
                                    font-semibold
                                    capitalize
                                    sm:px-3
                                    sm:py-1
                                    sm:text-xs
                                    ${getStatusClass(
                                      contact.status
                                    )}
                                  `}
                                >
                                  {contact.status}
                                </span>

                              </td>

                              {/* Date */}

                              <td className="px-3 py-3 text-xs text-gray-500 sm:px-6 sm:py-5 sm:text-sm">
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

              {/* -------------------------------------------------------
                  Pagination
              ------------------------------------------------------- */}

              {!loading &&
                pagination &&
                pagination.totalPages > 1 && (
                  <div
                    className="
                      flex
                      flex-col
                      gap-2
                      border-t
                      border-gray-100
                      px-3
                      py-3
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:px-6
                      sm:py-4
                    "
                  >

                    <p className="text-[11px] text-gray-500 sm:text-sm">
                      Page{" "}
                      <span className="font-medium text-gray-800">
                        {pagination.currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-800">
                        {pagination.totalPages}
                      </span>
                    </p>

                    <div className="flex items-center gap-1.5 sm:gap-2">

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
                          h-8
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-2.5
                          text-[11px]
                          font-medium
                          text-gray-700
                          transition
                          hover:border-blue-400
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          sm:h-9
                          sm:px-3
                          sm:text-sm
                        "
                      >

                        <ChevronLeft
                          size={14}
                          className="sm:h-4 sm:w-4"
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
                          h-8
                          items-center
                          gap-1
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          px-2.5
                          text-[11px]
                          font-medium
                          text-gray-700
                          transition
                          hover:border-blue-400
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          sm:h-9
                          sm:px-3
                          sm:text-sm
                        "
                      >

                        Next

                        <ChevronRight
                          size={14}
                          className="sm:h-4 sm:w-4"
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
            p-3
            backdrop-blur-sm
            sm:p-4
          "
          onClick={() =>
            setSelectedContact(null)
          }
        >

          <div
            className="
              max-h-[92vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-xl
              bg-white
              shadow-2xl
              sm:rounded-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Header */}

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

                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:text-xs">
                  Contact Enquiry
                </p>

                <h2 className="mt-0.5 truncate text-base font-bold text-gray-900 sm:mt-1 sm:text-xl">
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
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                  sm:h-9
                  sm:w-9
                "
              >
                <span className="text-lg sm:text-xl">
                  ×
                </span>
              </button>

            </div>

            {/* Details */}

            <div
              className="
                space-y-4
                px-4
                py-4
                sm:space-y-6
                sm:px-6
                sm:py-6
              "
            >

              {/* Customer */}

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs">
                  Customer
                </p>

                <p className="mt-0.5 text-sm font-semibold text-gray-900 sm:mt-1 sm:text-base">
                  {selectedContact.name}
                </p>

              </div>

              {/* Contact */}

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">

                <div className="flex items-center gap-2.5 sm:gap-3">

                  <Mail
                    size={16}
                    className="shrink-0 text-blue-500 sm:h-[18px] sm:w-[18px]"
                  />

                  <div className="min-w-0">

                    <p className="text-[10px] text-gray-400 sm:text-xs">
                      Email
                    </p>

                    <p className="truncate text-xs text-gray-700 sm:text-sm">
                      {selectedContact.email}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">

                  <Phone
                    size={16}
                    className="shrink-0 text-blue-500 sm:h-[18px] sm:w-[18px]"
                  />

                  <div>

                    <p className="text-[10px] text-gray-400 sm:text-xs">
                      Phone
                    </p>

                    <p className="text-xs text-gray-700 sm:text-sm">
                      {selectedContact.phone ||
                        "Not provided"}
                    </p>

                  </div>

                </div>

              </div>

              {/* Subject */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Subject
                </p>

                <p className="mt-0.5 text-xs font-medium text-gray-800 sm:mt-1 sm:text-sm">
                  {selectedContact.subject}
                </p>

              </div>

              {/* Status */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Status
                </p>

                <span
                  className={`
                    mt-1.5
                    inline-flex
                    rounded-full
                    px-2
                    py-0.5
                    text-[10px]
                    font-semibold
                    capitalize
                    sm:mt-2
                    sm:px-3
                    sm:py-1
                    sm:text-xs
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

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Message
                </p>

                <div className="mt-1.5 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-600 sm:mt-2 sm:rounded-xl sm:p-4 sm:text-sm sm:leading-6">
                  {selectedContact.message ||
                    "No message provided."}
                </div>

              </div>

              {/* Submitted */}

              <div>

                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Submitted
                </p>

                <p className="mt-0.5 text-xs text-gray-700 sm:mt-1 sm:text-sm">
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