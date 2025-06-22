"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, SendHorizonal, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/manjpnrw";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("subject", formData.subject);
      form.append("message", formData.message);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setShowSuccess(false), 4000);
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error("Form submit error", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 text-gray-800 relative">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[var(--color-brand)]">
          Contact Us
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          We'd love to hear from you. Drop us a message!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Phone className="text-[var(--color-brand)] mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <a
                href="tel:+8801560042479"
                className="text-[var(--color-brand)] hover:underline"
              >
                +88 0156 004 2479
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="text-[var(--color-brand)] mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <a
                href="mailto:support@leatherstorebd.com"
                className="text-[var(--color-brand)] hover:underline"
              >
                support@leatherstorebd.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-[var(--color-brand)] mt-1" />
            <div>
              <h4 className="font-semibold">Location</h4>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-5 border border-gray-100"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          />
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[var(--color-brand)] hover:bg-opacity-90 text-white px-6 py-3 rounded shadow transition disabled:opacity-60"
          >
            <SendHorizonal size={18} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* 🎉 Animated success box */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-xl flex items-center gap-2 z-50"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Message sent successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
