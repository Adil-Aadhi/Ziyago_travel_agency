
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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#cfeef8] via-[#e8f7fc] to-white px-4 py-8 sm:px-6">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="mb-5 text-center">

          <div className="mb-3 flex justify-center">
            <div className="relative h-14 w-24">
              <Image
                src="/logo/logo.svg"
                alt="ZiyaGo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-xs">
            Admin Portal
          </p>

          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
            Sign in to manage your travel agency.
          </p>

        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-lg backdrop-blur-sm sm:p-6">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={16}
                  className="
                    absolute
                    left-3.5
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
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    pl-10
                    pr-3
                    text-xs
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-400
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-100
                    sm:text-sm
                  "
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={16}
                  className="
                    absolute
                    left-3.5
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
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    pl-10
                    pr-11
                    text-xs
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-400
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-100
                    sm:text-sm
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="
                    absolute
                    right-2
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-md
                    p-1.5
                    text-gray-400
                    transition
                    hover:text-blue-600
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-1
                w-full
                rounded-lg
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                py-3
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:from-cyan-600
                hover:to-blue-700
                hover:shadow-md
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:text-sm
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-[10px] text-gray-400 sm:text-xs">
          Admin access only
        </p>

      </div>
    </main>
  );
}

