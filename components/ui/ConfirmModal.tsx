"use client";

import { AlertTriangle, X } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmClassName?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmClassName = "bg-red-500 hover:bg-red-600",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-3 backdrop-blur-sm sm:px-4">

    <div className="relative w-full max-w-md rounded-xl bg-white p-4 shadow-2xl sm:rounded-2xl sm:p-6">

      {/* Close */}

      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="
          absolute
          right-3
          top-3
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-lg
          text-gray-400
          transition
          hover:bg-gray-100
          hover:text-gray-700
          sm:right-4
          sm:top-4
          sm:h-8
          sm:w-8
        "
      >
        <X size={16} className="sm:h-[18px] sm:w-[18px]" />
      </button>

      {/* Icon */}

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 sm:h-11 sm:w-11 sm:rounded-xl">
        <AlertTriangle
          size={18}
          className="text-red-500 sm:h-[21px] sm:w-[21px]"
        />
      </div>

      {/* Content */}

      <div className="mt-3 pr-5 sm:mt-4 sm:pr-6">

        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
          {title}
        </h2>

        <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm sm:leading-6">
          {message}
        </p>

      </div>

      {/* Actions */}

      <div className="mt-4 flex justify-end gap-2 sm:mt-6 sm:gap-3">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
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
            disabled:opacity-50
            sm:rounded-xl
            sm:px-4
            sm:py-2.5
            sm:text-sm
          "
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`
            rounded-lg
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:rounded-xl
            sm:px-4
            sm:py-2.5
            sm:text-sm
            ${confirmClassName}
          `}
        >
          {loading ? "Please wait..." : confirmText}
        </button>

      </div>

    </div>
  </div>
);
}