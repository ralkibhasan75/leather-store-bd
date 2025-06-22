"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Login failed");
    } else {
      toast.success("Welcome back!");
      refreshUser(); // 🔁 refresh auth context
      router.refresh(); // 🔁 refresh layout/server components
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfcf9] to-[#f5f0ea] flex items-center justify-center px-4">
      <div className="w-full max-w-md relative bg-white/60 backdrop-blur-lg border border-[#e5ded7] shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-10 animate-fade-in">
        <h1 className="text-4xl font-serif font-bold text-center text-[#2c1e1e] mb-8 tracking-tight">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Enter your email or phone.
            </label>
            <input
              type="text"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand transition text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-brand transition text-sm"
            />
            <div className="text-right mt-1">
              <a
                href="/forgot-password"
                className="text-sm text-[#2c1e1e] hover:underline hover:text-black"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2c1e1e] text-white py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:bg-black transition hover:shadow-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#2c1e1e] underline font-medium hover:text-black"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
