"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ChevronLeft,
  Save,
} from "lucide-react";
import Link from "next/link";

const CARD_COLORS = [
  "#E8F4FD",
  "#FFF0E6",
  "#EDF7ED",
  "#F5F0FF",
];

const CARD_ACCENT = [
  "#1E88E5",
  "#E9682C",
  "#2E7D32",
  "#7C3AED",
];

interface Props {
  locale: string;
}

export function AccountPageClient({ locale }: Props) {
  const isAr = locale === "ar";

  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",
    street: "123 Main Street",
    city: "Cairo",
    region: "Cairo",
    postal: "11511",
    country: "Egypt",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  return (
    <main className="min-h-screen bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {isAr ? "حسابي" : "My Account"}
          </span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-black mb-8">
          {isAr ? "حسابي" : "My Account"}
        </h1>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl border border-border mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: CARD_COLORS[0] }}
            >
              <User size={20} style={{ color: CARD_ACCENT[0] }} strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-black">
              {isAr ? "المعلومات الشخصية" : "Personal Information"}
            </h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "رقم الهاتف" : "Phone"}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "الدولة" : "Country"}
                </label>
                <input
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground">
                {isAr ? "العنوان" : "Street Address"}
              </label>
              <input
                type="text"
                name="street"
                value={profileData.street}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "المدينة" : "City"}
                </label>
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "المحافظة" : "Region"}
                </label>
                <input
                  type="text"
                  name="region"
                  value={profileData.region}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted-foreground">
                  {isAr ? "الرمز البريدي" : "Postal Code"}
                </label>
                <input
                  type="text"
                  name="postal"
                  value={profileData.postal}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:scale-105 disabled:opacity-50"
                style={{ background: CARD_ACCENT[0] }}
              >
                <Save size={16} strokeWidth={2.5} />
                {isSaving
                  ? isAr
                    ? "جاري الحفظ..."
                    : "Saving..."
                  : isAr
                  ? "حفظ التغييرات"
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Password Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: CARD_COLORS[3] }}
            >
              <Lock
                size={20}
                style={{ color: CARD_ACCENT[3] }}
                strokeWidth={2}
              />
            </div>
            <h2 className="text-2xl font-black">
              {isAr ? "تغيير كلمة المرور" : "Change Password"}
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground">
                {isAr ? "كلمة المرور الحالية" : "Current Password"}
              </label>
              <input
                type="password"
                name="current"
                value={passwordData.current}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground">
                {isAr ? "كلمة المرور الجديدة" : "New Password"}
              </label>
              <input
                type="password"
                name="new"
                value={passwordData.new}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground">
                {isAr ? "تأكيد كلمة المرور" : "Confirm Password"}
              </label>
              <input
                type="password"
                name="confirm"
                value={passwordData.confirm}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:scale-105 disabled:opacity-50"
                style={{ background: CARD_ACCENT[3] }}
              >
                <Lock size={16} strokeWidth={2.5} />
                {isSaving
                  ? isAr
                    ? "جاري التحديث..."
                    : "Updating..."
                  : isAr
                  ? "تحديث كلمة المرور"
                  : "Update Password"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
