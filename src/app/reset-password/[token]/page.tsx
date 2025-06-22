"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      toast.error(data.message || "Failed to reset password");
    } else {
      toast.success("Password updated. Please login.");
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f3ef] to-[#fff] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-[#e5ded7] shadow-lg rounded-3xl p-10 space-y-6 animate-fade-in"
      >
        <h1 className="text-3xl font-serif font-bold text-center text-[#2c1e1e]">
          Set New Password
        </h1>
        <p className="text-sm text-gray-700 text-center">
          Your reset link is valid for 15 minutes.
        </p>

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand transition text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2c1e1e] text-white hover:text-white py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:bg-black transition hover:shadow-xl"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-sm text-center text-gray-700">
          <a
            href="/login"
            className="underline text-brand hover:text-black font-medium"
          >
            Back to Login
          </a>
        </p>
      </form>
    </main>
  );
}
