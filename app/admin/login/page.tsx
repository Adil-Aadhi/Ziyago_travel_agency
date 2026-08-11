"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Login successful
      window.location.href = "/admin";
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#cfeef8] via-[#e8f7fc] to-white px-6 py-12">

      {/* Login Card */}
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">

          <div className="mb-5 flex justify-center">
            <div className="relative h-20 w-32">
              <Image
                src="/logo/logo.svg"
                alt="ZiyaGo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
            Admin Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your travel agency.
          </p>

        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-7 shadow-xl md:p-9">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    py-3.5
                    pl-11
                    pr-4
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-orange-400
                    focus:bg-white
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    py-3.5
                    pl-11
                    pr-12
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-orange-400
                    focus:bg-white
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    p-2
                    text-gray-400
                    transition
                    hover:text-gray-700
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                w-full
                rounded-xl
                bg-orange-500
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-orange-600
                hover:shadow-md
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Admin access only
        </p>

      </div>
    </main>
  );
}