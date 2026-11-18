"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { StarBurst, WavyLine, EyePair } from "./FloatingIcons";

const FAQS = [
  {
    q_ar: "إيه هي باقات لايف بوكس",
    q_en: "What are Life Box bundles?",
    a_ar: "باقات لايف بوكس هي مجموعات منتجات منزلية مختارة بعناية بخصم حصري — زي بوكس المطبخ بوكس العروسة وبوكس تجديد غرفة النوم. كل بوكس مجمع عشان يوفرلك وقتك وفلوسك.",
    a_en: "Life Box bundles are carefully curated home product sets at exclusive discounts — like Kitchen Box, Bride's Box, and Bedroom Refresh Box. Each bundle is assembled to save you time and money.",
    accent: "#5F0054",
    tint:   "#fdf4fc",
    num:    "01",
  },
  {
    q_ar: "أمتى يوصل الطلب",
    q_en: "When does my order arrive?",
    a_ar: "بنوصل خلال 24 إلى 48 ساعة من تأكيد الطلب. للطلبات فوق 200 جنيه الشحن مجاني تماما. هتاخد رسالة تتبع فور شحن الطلب.",
    a_en: "We deliver within 24–48 hours of order confirmation. Orders over 200 EGP get free shipping. You'll receive a tracking message as soon as your order ships.",
    accent: "#30A0A7",
    tint:   "#f0fbfc",
    num:    "02",
  },
  {
    q_ar: "هل ممكن أرجع أو أستبدل المنتج",
    q_en: "Can I return or exchange a product?",
    a_ar: "أيوه بنقبل الاستبدال والاسترجاع خلال 14 يوم من الاستلام بدون أي رسوم إضافية. المنتج لازم يكون بحالته الأصلية وفي تغليفه. تواصل معنا وهنرتب كل حاجة.",
    a_en: "Yes, we accept exchanges and returns within 14 days of delivery at no extra cost. The product must be in its original condition and packaging. Contact us and we'll arrange everything.",
    accent: "#D63480",
    tint:   "#fdf0f7",
    num:    "03",
  },
  {
    q_ar: "إيه طرق الدفع المتاحة",
    q_en: "What payment methods are available?",
    a_ar: "بنقبل الدفع عند الاستلام (كاش) والدفع الأونلاين بالبطاقات الائتمانية والمحافظ الرقمية. كل المعاملات مشفرة وآمنة 100%.",
    a_en: "We accept cash on delivery (COD) and online payment via credit/debit cards and digital wallets. All transactions are fully encrypted and secure.",
    accent: "#E9682C",
    tint:   "#fdf4ef",
    num:    "04",
  },
];

// Small floating icon between each FAQ item
const BETWEEN_ICONS = [
  <StarBurst key="s1" size={28} style={{ opacity: 0.75, transform: "rotate(15deg)" }} />,
  <WavyLine  key="w1" size={52} style={{ opacity: 0.70, transform: "rotate(-8deg)"  }} />,
  <EyePair   key="e1" size={36} style={{ opacity: 0.72 }} />,
];

export function FAQ({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#fafafa" }}
      dir={isAr ? "rtl" : "ltr"}
      aria-label={isAr ? "الأسئلة الشائعة" : "Frequently asked questions"}
    >
      {/* ── Background decorative icons (large, faded) ── */}
      <StarBurst size={120} className="absolute -top-6 -right-8 opacity-[0.06] pointer-events-none hidden lg:block" style={{ transform: "rotate(20deg)" }} />
      <WavyLine  size={200} className="absolute top-1/3 -left-16 opacity-[0.07] pointer-events-none hidden lg:block" style={{ transform: "rotate(-10deg)" }} />
      <EyePair   size={100} className="absolute bottom-10 -right-6 opacity-[0.07] pointer-events-none hidden lg:block" />

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full text-white mb-4"
            style={{ background: "#5F0054" }}
          >
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0f0f0f" }}>
            {isAr ? "عندك سؤال" : "Got a question?"}
          </h2>
          <p className="mt-3 text-sm" style={{ color: "#6b7280" }}>
            {isAr ? "دي إجابات أكتر الأسئلة اللي بتتسألنا." : "Here are answers to our most asked questions."}
          </p>
        </motion.div>

        {/* Questions */}
        <div className="flex flex-col">
          {FAQS.map(({ q_ar, q_en, a_ar, a_en, accent, tint, num }, i) => (
            <div key={i}>

              {/* ── FAQ Card ── */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  className="w-full text-start group"
                >
                  <div
                    className="relative flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: open === i ? tint : "#fff",
                      border: `1.5px solid ${open === i ? accent + "40" : "#f0f0f0"}`,
                      boxShadow: open === i ? `0 8px 32px ${accent}18` : "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Number */}
                    <span
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300"
                      style={{
                        background: open === i ? accent : `${accent}15`,
                        color: open === i ? "#fff" : accent,
                      }}
                    >
                      {num}
                    </span>

                    {/* Question text */}
                    <span
                      className="flex-1 text-sm sm:text-base font-bold leading-snug"
                      style={{ color: "#0f0f0f" }}
                    >
                      {isAr ? q_ar : q_en}
                    </span>

                    {/* Toggle icon */}
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{
                        background: open === i ? accent : `${accent}12`,
                      }}
                    >
                      {open === i
                        ? <Minus size={14} strokeWidth={2.5} style={{ color: "#fff" }} />
                        : <Plus  size={14} strokeWidth={2.5} style={{ color: accent }} />
                      }
                    </motion.span>
                  </div>
                </button>

                {/* Answer — animated expand */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-6 py-4 mx-0.5 rounded-b-2xl text-sm leading-relaxed"
                        style={{
                          background: tint,
                          borderLeft: `3px solid ${accent}`,
                          borderRight: `3px solid ${accent}`,
                          borderBottom: `3px solid ${accent}`,
                          color: "#374151",
                        }}
                      >
                        {isAr ? a_ar : a_en}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Floating icon between questions (not after last) ── */}
              {i < FAQS.length - 1 && (
                <motion.div
                  className="flex justify-center my-4"
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  {BETWEEN_ICONS[i % BETWEEN_ICONS.length]}
                </motion.div>
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}