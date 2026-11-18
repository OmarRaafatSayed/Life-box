"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ChevronLeft,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Order, OrderStatus } from "@/types";

const CARD_COLORS = [
  "#E8F4FD",
  "#FFF0E6",
  "#EDF7ED",
  "#F5F0FF",
  "#FFF8E1",
];

const CARD_ACCENT = [
  "#1E88E5",
  "#E9682C",
  "#2E7D32",
  "#7C3AED",
  "#F59E0B",
];

const STATUS_CONFIG: Record<
  OrderStatus,
  { labelEn: string; labelAr: string; color: string; icon: typeof CheckCircle }
> = {
  PENDING: {
    labelEn: "Pending",
    labelAr: "قيد الانتظار",
    color: "#F59E0B",
    icon: Clock,
  },
  PROCESSING: {
    labelEn: "Processing",
    labelAr: "قيد المعالجة",
    color: "#3B82F6",
    icon: Package,
  },
  SHIPPED: {
    labelEn: "Shipped",
    labelAr: "تم الشحن",
    color: "#8B5CF6",
    icon: Truck,
  },
  DELIVERED: {
    labelEn: "Delivered",
    labelAr: "تم التوصيل",
    color: "#10B981",
    icon: CheckCircle,
  },
  CANCELLED: {
    labelEn: "Cancelled",
    labelAr: "ملغي",
    color: "#EF4444",
    icon: XCircle,
  },
};

// Mock Orders
const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "LB-2025-001",
    fullName: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",
    address: {
      street: "123 Main Street",
      city: "Cairo",
      region: "Cairo",
      postal: "11511",
      country: "Egypt",
    },
    items: [],
    subtotal: 450,
    shipping: 50,
    total: 500,
    status: "DELIVERED",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-20T14:00:00Z",
  },
  {
    id: "ord-002",
    orderNumber: "LB-2025-002",
    fullName: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",
    address: {
      street: "123 Main Street",
      city: "Cairo",
      region: "Cairo",
      postal: "11511",
      country: "Egypt",
    },
    items: [],
    subtotal: 285,
    shipping: 50,
    total: 335,
    status: "SHIPPED",
    createdAt: "2025-02-01T09:15:00Z",
    updatedAt: "2025-02-03T16:30:00Z",
  },
  {
    id: "ord-003",
    orderNumber: "LB-2025-003",
    fullName: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",
    address: {
      street: "123 Main Street",
      city: "Cairo",
      region: "Cairo",
      postal: "11511",
      country: "Egypt",
    },
    items: [],
    subtotal: 720,
    shipping: 50,
    total: 770,
    status: "PROCESSING",
    createdAt: "2025-02-08T11:00:00Z",
    updatedAt: "2025-02-08T11:00:00Z",
  },
];

interface Props {
  locale: string;
}

export function OrdersPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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
            {isAr ? "طلباتي" : "My Orders"}
          </span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-black">
            {isAr ? "طلباتي" : "My Orders"}
          </h1>
          <div className="flex items-center gap-2">
            <Package size={20} style={{ color: CARD_ACCENT[0] }} />
            <span className="text-lg font-bold">{MOCK_ORDERS.length}</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {MOCK_ORDERS.map((order, idx) => {
            const statusConfig = STATUS_CONFIG[order.status];
            const StatusIcon = statusConfig.icon;
            const isExpanded = expandedOrder === order.id;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl border border-border overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() => toggleOrder(order.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4 text-left">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: CARD_COLORS[idx % CARD_COLORS.length],
                      }}
                    >
                      <StatusIcon
                        size={20}
                        style={{ color: statusConfig.color }}
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-lg mb-1">
                        {order.orderNumber}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(order.createdAt).toLocaleDateString(
                            isAr ? "ar-EG" : "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span
                          className="px-2 py-1 rounded-full font-bold"
                          style={{
                            background: `${statusConfig.color}20`,
                            color: statusConfig.color,
                          }}
                        >
                          {isAr ? statusConfig.labelAr : statusConfig.labelEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">
                        {isAr ? "الإجمالي" : "Total"}
                      </p>
                      <p className="text-xl font-black">
                        {order.total}{" "}
                        <span className="text-xs text-muted-foreground">
                          {isAr ? "جنيه" : "EGP"}
                        </span>
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={20} className="text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Order Details (Expandable) */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6 space-y-4">
                      {/* Shipping Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-muted-foreground" />
                          <h4 className="font-bold text-sm">
                            {isAr ? "عنوان الشحن" : "Shipping Address"}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.address.street}, {order.address.city},{" "}
                          {order.address.region}, {order.address.country}
                        </p>
                      </div>

                      {/* Contact */}
                      <div>
                        <h4 className="font-bold text-sm mb-2">
                          {isAr ? "معلومات التواصل" : "Contact Information"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {order.email} • {order.phone}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="pt-4 border-t border-border/50 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {isAr ? "المجموع الفرعي" : "Subtotal"}
                          </span>
                          <span className="font-bold">
                            {order.subtotal} {isAr ? "جنيه" : "EGP"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {isAr ? "الشحن" : "Shipping"}
                          </span>
                          <span className="font-bold">
                            {order.shipping} {isAr ? "جنيه" : "EGP"}
                          </span>
                        </div>
                        <div className="flex justify-between text-base pt-2 border-t border-border/50">
                          <span className="font-black">
                            {isAr ? "الإجمالي" : "Total"}
                          </span>
                          <span className="font-black">
                            {order.total} {isAr ? "جنيه" : "EGP"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
