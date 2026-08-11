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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Close */}

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        {/* Icon */}

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
          <AlertTriangle
            size={21}
            className="text-red-500"
          />
        </div>

        {/* Content */}

        <div className="mt-4 pr-6">
          <h2 className="text-lg font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {message}
          </p>
        </div>

        {/* Actions */}

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${confirmClassName}`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}