"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronLeft,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const CARD_COLORS = ["#E8F4FD", "#FFF0E6", "#EDF7ED"];
const CARD_ACCENT = ["#1E88E5", "#E9682C", "#2E7D32"];

interface Props {
  locale: string;
}

export function ContactPageClient({ locale }: Props) {
  const isAr = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link
            href={`/${locale}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <ChevronLeft size={14} className="text-muted-foreground" />
          <span className="text-foreground font-semibold">
            {isAr ? "اتصل بنا" : "Contact Us"}
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: CARD_COLORS[0] }}
          >
            <MessageCircle
              size={36}
              style={{ color: CARD_ACCENT[0] }}
              strokeWidth={2}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            {isAr ? "تواصل معنا" : "Get in Touch"}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isAr
              ? "نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن"
              : "We're here to help. Send us a message and we'll respond as soon as possible"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl border border-border"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: CARD_COLORS[0] }}
              >
                <Mail
                  size={20}
                  style={{ color: CARD_ACCENT[0] }}
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-black text-sm mb-2">
                {isAr ? "البريد الإلكتروني" : "Email"}
              </h3>
              <a
                href="mailto:support@lifebox.eg"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                support@lifebox.eg
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="p-5 rounded-2xl border border-border"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: CARD_COLORS[1] }}
              >
                <Phone
                  size={20}
                  style={{ color: CARD_ACCENT[1] }}
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-black text-sm mb-2">
                {isAr ? "الهاتف" : "Phone"}
              </h3>
              <a
                href="tel:+201234567890"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +20 123 456 7890
              </a>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-5 rounded-2xl border border-border"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: CARD_COLORS[2] }}
              >
                <MapPin
                  size={20}
                  style={{ color: CARD_ACCENT[2] }}
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-black text-sm mb-2">
                {isAr ? "العنوان" : "Address"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isAr
                  ? "123 شارع الرئيسي، القاهرة، مصر"
                  : "123 Main Street, Cairo, Egypt"}
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div
                className="p-8 rounded-2xl text-center"
                style={{ background: CARD_COLORS[2] }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "#fff" }}
                >
                  <Send size={28} style={{ color: CARD_ACCENT[2] }} />
                </div>
                <h3 className="text-2xl font-black mb-2">
                  {isAr ? "تم إرسال الرسالة!" : "Message Sent!"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isAr
                    ? "شكرًا لتواصلك معنا. سنرد عليك قريبًا."
                    : "Thank you for reaching out. We'll respond soon."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: CARD_ACCENT[2] }}
                >
                  {isAr ? "إرسال رسالة أخرى" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl border border-border space-y-4"
              >
                <h2 className="text-2xl font-black mb-6">
                  {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-muted-foreground">
                      {isAr ? "الاسم" : "Name"} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-muted-foreground">
                      {isAr ? "البريد الإلكتروني" : "Email"} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-muted-foreground">
                      {isAr ? "رقم الهاتف" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-muted-foreground">
                      {isAr ? "الموضوع" : "Subject"} *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                    >
                      <option value="">
                        {isAr ? "اختر موضوع" : "Select a subject"}
                      </option>
                      <option value="order">
                        {isAr ? "استفسار عن طلب" : "Order Inquiry"}
                      </option>
                      <option value="product">
                        {isAr ? "استفسار عن منتج" : "Product Inquiry"}
                      </option>
                      <option value="support">
                        {isAr ? "دعم فني" : "Technical Support"}
                      </option>
                      <option value="other">
                        {isAr ? "أخرى" : "Other"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-muted-foreground">
                    {isAr ? "الرسالة" : "Message"} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: CARD_ACCENT[0] }}
                >
                  {isSubmitting ? (
                    isAr ? "جاري الإرسال..." : "Sending..."
                  ) : (
                    <>
                      <Send size={18} strokeWidth={2.5} />
                      {isAr ? "إرسال الرسالة" : "Send Message"}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
