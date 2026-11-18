"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Mail, MapPin, Phone } from "lucide-react";

const CARD_COLORS = ["#E8F4FD", "#FFF0E6", "#EDF7ED"];
const CARD_ACCENT = ["#1E88E5", "#E9682C", "#2E7D32"];

interface OrderData {
  orderNumber: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    region: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  estimatedDelivery: string;
}

interface Props {
  locale: string;
}

export function OrderSuccessClient({ locale }: Props) {
  const isAr = locale === "ar";
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("lastOrder");
      if (data) {
        setOrderData(JSON.parse(data));
        // Clear after reading
        sessionStorage.removeItem("lastOrder");
      }
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black mb-4">
            {isAr ? "لا يوجد طلب" : "No Order Found"}
          </h1>
          <Link
            href={`/${locale}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            {isAr ? "العودة للرئيسية" : "Return Home"}
          </Link>
        </div>
      </div>
    );
  }

  const estimatedDate = new Date(orderData.estimatedDelivery).toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className="min-h-screen bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
          >
            <CheckCircle size={56} className="text-white" strokeWidth={2.5} />
          </div>

          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
            style={{ background: "#D1FAE5", color: "#065F46" }}
          >
            ✓ {isAr ? "تم تأكيد الطلب" : "Order Confirmed"}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            {isAr ? "شكرًا لطلبك!" : "Thank You for Your Order!"}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            {isAr
              ? "تم استلام طلبك وسيتم معالجته قريبًا"
              : "Your order has been received and will be processed soon"}
          </p>

          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{ background: CARD_COLORS[0] }}
          >
            <span className="text-sm font-bold text-muted-foreground">
              {isAr ? "رقم الطلب:" : "Order Number:"}
            </span>
            <span
              className="text-xl font-black"
              style={{ color: CARD_ACCENT[0] }}
            >
              {orderData.orderNumber}
            </span>
          </div>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            {
              Icon: Package,
              titleEn: "Processing",
              titleAr: "جاري التجهيز",
              descEn: "Your order is being prepared",
              descAr: "جاري تجهيز طلبك",
              bg: CARD_COLORS[0],
              accent: CARD_ACCENT[0],
            },
            {
              Icon: Truck,
              titleEn: "Estimated Delivery",
              titleAr: "موعد التوصيل المتوقع",
              descEn: estimatedDate.split(",")[0],
              descAr: estimatedDate.split("،")[0] || estimatedDate,
              bg: CARD_COLORS[1],
              accent: CARD_ACCENT[1],
            },
            {
              Icon: Mail,
              titleEn: "Confirmation Sent",
              titleAr: "تم إرسال التأكيد",
              descEn: orderData.customer.email,
              descAr: orderData.customer.email,
              bg: CARD_COLORS[2],
              accent: CARD_ACCENT[2],
            },
          ].map(({ Icon, titleEn, titleAr, descEn, descAr, bg, accent }, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-border"
              style={{ background: bg }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "white" }}
              >
                <Icon size={20} style={{ color: accent }} strokeWidth={2} />
              </div>
              <h3 className="font-black text-sm mb-1">
                {isAr ? titleAr : titleEn}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {isAr ? descAr : descEn}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Items */}
          <div className="p-6 rounded-2xl border border-border">
            <h2 className="text-xl font-black mb-4">
              {isAr ? "المنتجات" : "Items"}
            </h2>
            <div className="space-y-3">
              {orderData.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div
                    className="relative shrink-0 rounded-xl overflow-hidden"
                    style={{ width: 60, height: 60, background: CARD_COLORS[0] }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="60px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {isAr ? "الكمية:" : "Qty:"} {item.quantity}
                      </span>
                      {item.color && <span>• {item.color}</span>}
                      {item.size && <span>• {item.size}</span>}
                    </div>
                  </div>
                  <span className="font-black text-sm">
                    {item.price * item.quantity}{" "}
                    <span className="text-xs text-muted-foreground">
                      {isAr ? "جنيه" : "EGP"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-muted-foreground" />
                <h3 className="font-black text-sm">
                  {isAr ? "عنوان الشحن" : "Shipping Address"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {orderData.customer.fullName}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                {orderData.customer.street}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                {orderData.customer.city}, {orderData.customer.region}
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Phone size={14} />
                {orderData.customer.phone}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border">
              <h3 className="font-black text-sm mb-4">
                {isAr ? "ملخص الطلب" : "Order Summary"}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isAr ? "المجموع الفرعي" : "Subtotal"}
                  </span>
                  <span className="font-bold">
                    {orderData.subtotal} {isAr ? "جنيه" : "EGP"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isAr ? "الشحن" : "Shipping"}
                  </span>
                  <span className="font-bold">
                    {orderData.shipping} {isAr ? "جنيه" : "EGP"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-black">
                    {isAr ? "الإجمالي" : "Total"}
                  </span>
                  <span className="font-black text-lg">
                    {orderData.total} {isAr ? "جنيه" : "EGP"}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {isAr ? "طريقة الدفع:" : "Payment Method:"}
                  </span>
                  <span className="text-sm font-bold ml-2">
                    {orderData.paymentMethod === "cod"
                      ? isAr
                        ? "الدفع عند الاستلام"
                        : "Cash on Delivery"
                      : isAr
                      ? "بطاقة ائتمان"
                      : "Credit Card"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href={`/${locale}/orders`}
            className="px-8 py-4 rounded-2xl font-bold text-center transition-all hover:opacity-90 hover:scale-105"
            style={{ background: CARD_COLORS[0], color: CARD_ACCENT[0] }}
          >
            {isAr ? "عرض طلباتي" : "View My Orders"}
          </Link>
          <Link
            href={`/${locale}`}
            className="px-8 py-4 rounded-2xl text-white font-bold text-center transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #3D1A6E, #E91E8C)" }}
          >
            {isAr ? "متابعة التسوق" : "Continue Shopping"}
          </Link>
        </div>
      </div>
    </main>
  );
}
