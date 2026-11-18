"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { sendWhatsAppOrderNotification } from "@/lib/whatsapp";

// Company WhatsApp Business Number (update with actual number)
const BUSINESS_WHATSAPP = "201234567890"; // Example: 201234567890 for Egypt

const CARD_COLORS = [
  "#E8F4FD",
  "#FFF0E6",
  "#EDF7ED",
  "#F5F0FF",
  "#FFF8E1",
  "#FCE4EC",
  "#E0F7FA",
  "#F3E5F5",
];

const CARD_ACCENT = [
  "#1E88E5",
  "#E9682C",
  "#2E7D32",
  "#7C3AED",
  "#F59E0B",
  "#D63480",
  "#00838F",
  "#8E24AA",
];

interface Props {
  locale: string;
}

export function CheckoutPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    region: "",
    postal: "",
    country: "Egypt",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const shipping = 50;
  const total = subtotal() + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - Create order
      await new Promise((r) => setTimeout(r, 1500));

      // Prepare order data for success page
      const orderData = {
        orderNumber: `LB-${Date.now()}`,
        items: items.map((item) => ({
          id: item.product.id,
          name: isAr ? item.product.nameAr : item.product.nameEn,
          image: item.product.images[0],
          price: item.product.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
        customer: formData,
        subtotal: subtotal(),
        shipping,
        total,
        paymentMethod,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Send WhatsApp notification to business
      sendWhatsAppOrderNotification(
        {
          orderNumber: orderData.orderNumber,
          customerName: formData.fullName,
          phone: formData.phone,
          address: formData.street,
          city: formData.city,
          region: formData.region,
          items: orderData.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            size: item.size,
          })),
          subtotal: subtotal(),
          shipping,
          total,
          paymentMethod,
        },
        BUSINESS_WHATSAPP,
        locale
      );

      // Store order in sessionStorage for success page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastOrder", JSON.stringify(orderData));
      }

      // Clear cart AFTER successful order
      clearCart();

      // Redirect to success page
      router.push(`/${locale}/order-success`);
    } catch (error) {
      console.error("Order submission failed:", error);
      setIsSubmitting(false);
    }
  };

  // Use useEffect for redirect to avoid render-phase state updates
  React.useEffect(() => {
    if (items.length === 0 && typeof window !== "undefined") {
      setIsRedirecting(true);
      router.push(`/${locale}/cart`);
    }
  }, [items.length, locale, router]);

  // Show loading state while redirecting
  if (isRedirecting || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: "#3D1A6E", borderTopColor: "transparent" }}
          />
          <p className="text-muted-foreground">
            {isAr ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link
            href={`/${locale}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <ChevronLeft size={14} className="text-muted-foreground" />
          <Link
            href={`/${locale}/cart`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isAr ? "السلة" : "Cart"}
          </Link>
          <ChevronLeft size={14} className="text-muted-foreground" />
          <span className="text-foreground font-semibold">
            {isAr ? "إتمام الطلب" : "Checkout"}
          </span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-black mb-8">
          {isAr ? "إتمام الطلب" : "Checkout"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border border-border space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: CARD_COLORS[0] }}
                  >
                    <MapPin
                      size={18}
                      style={{ color: CARD_ACCENT[0] }}
                      strokeWidth={2}
                    />
                  </div>
                  <h2 className="text-xl font-black">
                    {isAr ? "معلومات الشحن" : "Shipping Information"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder={isAr ? "الاسم الكامل" : "Full Name"}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={isAr ? "البريد الإلكتروني" : "Email"}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={isAr ? "رقم الهاتف" : "Phone Number"}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder={isAr ? "الدولة" : "Country"}
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <input
                  type="text"
                  name="street"
                  placeholder={isAr ? "العنوان بالتفصيل" : "Street Address"}
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder={isAr ? "المدينة" : "City"}
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input
                    type="text"
                    name="region"
                    placeholder={isAr ? "المحافظة" : "Region"}
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input
                    type="text"
                    name="postal"
                    placeholder={isAr ? "الرمز البريدي" : "Postal Code"}
                    value={formData.postal}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <textarea
                  name="notes"
                  placeholder={isAr ? "ملاحظات إضافية (اختياري)" : "Additional Notes (Optional)"}
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-6 rounded-2xl border border-border space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: CARD_COLORS[1] }}
                  >
                    <CreditCard
                      size={18}
                      style={{ color: CARD_ACCENT[1] }}
                      strokeWidth={2}
                    />
                  </div>
                  <h2 className="text-xl font-black">
                    {isAr ? "طريقة الدفع" : "Payment Method"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <CreditCard size={20} strokeWidth={2} />
                    <span className="font-bold text-sm">
                      {isAr ? "بطاقة ائتمان" : "Credit Card"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <Package size={20} strokeWidth={2} />
                    <span className="font-bold text-sm">
                      {isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}
                    </span>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-4">
                    <input
                      type="text"
                      placeholder={isAr ? "رقم البطاقة" : "Card Number"}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={isAr ? "MM/YY" : "MM/YY"}
                        className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="sticky top-8 p-6 rounded-2xl space-y-4"
                style={{ background: CARD_COLORS[0] }}
              >
                <h2 className="text-xl font-black">
                  {isAr ? "ملخص الطلب" : "Order Summary"}
                </h2>

                {/* Items */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {items.map((item) => {
                    const name = isAr ? item.product.nameAr : item.product.nameEn;
                    return (
                      <div
                        key={`${item.product.id}-${item.color}-${item.size}`}
                        className="flex gap-3"
                      >
                        <div
                          className="relative shrink-0 rounded-lg overflow-hidden"
                          style={{ width: 50, height: 50 }}
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={name}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="50px"
                          />
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="font-bold line-clamp-1">{name}</p>
                          <p className="text-muted-foreground">
                            {item.quantity} × {item.product.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 text-sm pt-4 border-t border-border/20">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isAr ? "المجموع الفرعي" : "Subtotal"}
                    </span>
                    <span className="font-bold">
                      {subtotal()} {isAr ? "جنيه" : "EGP"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isAr ? "الشحن" : "Shipping"}
                    </span>
                    <span className="font-bold">
                      {shipping} {isAr ? "جنيه" : "EGP"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-lg font-black">
                      {isAr ? "الإجمالي" : "Total"}
                    </span>
                    <span className="text-2xl font-black">
                      {total}{" "}
                      <span className="text-sm">{isAr ? "جنيه" : "EGP"}</span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: CARD_ACCENT[0] }}
                  >
                    {isSubmitting ? (
                      isAr ? "جاري المعالجة..." : "Processing..."
                    ) : (
                      <>
                        <ShieldCheck size={18} strokeWidth={2.5} />
                        {isAr ? "تأكيد الطلب" : "Place Order"}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
