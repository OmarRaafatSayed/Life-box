"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, HelpCircle, ChevronDown, Search } from "lucide-react";
import Link from "next/link";

const CARD_COLORS = ["#E8F4FD", "#FFF0E6", "#EDF7ED", "#F5F0FF"];
const CARD_ACCENT = ["#1E88E5", "#E9682C", "#2E7D32", "#7C3AED"];

interface FAQItem {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "orders",
    questionEn: "How do I track my order?",
    questionAr: "كيف أتتبع طلبي؟",
    answerEn:
      "Once your order ships, we'll email you a tracking number. You can also view your order status in the 'My Orders' section of your account.",
    answerAr:
      "بمجرد شحن طلبك، سنرسل لك رقم التتبع عبر البريد الإلكتروني. يمكنك أيضًا عرض حالة طلبك في قسم 'طلباتي' في حسابك.",
  },
  {
    category: "orders",
    questionEn: "Can I cancel or modify my order?",
    questionAr: "هل يمكنني إلغاء أو تعديل طلبي؟",
    answerEn:
      "You can cancel or modify your order within 2 hours of placing it. After that, it enters processing and cannot be changed. Contact support for assistance.",
    answerAr:
      "يمكنك إلغاء أو تعديل طلبك خلال ساعتين من إجرائه. بعد ذلك، يدخل في مرحلة المعالجة ولا يمكن تغييره. اتصل بالدعم للمساعدة.",
  },
  {
    category: "shipping",
    questionEn: "What are the shipping costs?",
    questionAr: "ما هي تكاليف الشحن؟",
    answerEn:
      "Shipping is 50 EGP for all orders. Orders over 500 EGP qualify for free shipping within Egypt.",
    answerAr:
      "الشحن 50 جنيهًا لجميع الطلبات. الطلبات التي تزيد عن 500 جنيه مؤهلة للشحن المجاني داخل مصر.",
  },
  {
    category: "shipping",
    questionEn: "How long does delivery take?",
    questionAr: "كم يستغرق التوصيل؟",
    answerEn:
      "Standard delivery takes 3-5 business days within Cairo and 5-7 business days for other regions in Egypt.",
    answerAr:
      "يستغرق التوصيل القياسي 3-5 أيام عمل داخل القاهرة و5-7 أيام عمل للمناطق الأخرى في مصر.",
  },
  {
    category: "returns",
    questionEn: "What is your return policy?",
    questionAr: "ما هي سياسة الإرجاع؟",
    answerEn:
      "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Return shipping is free.",
    answerAr:
      "نقبل الإرجاع خلال 30 يومًا من التسليم. يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية. الشحن الإرجاع مجاني.",
  },
  {
    category: "returns",
    questionEn: "How do I initiate a return?",
    questionAr: "كيف أبدأ عملية الإرجاع؟",
    answerEn:
      "Go to 'My Orders', select the order, and click 'Return Items'. Follow the instructions to complete the return process.",
    answerAr:
      "انتقل إلى 'طلباتي'، اختر الطلب، وانقر على 'إرجاع المنتجات'. اتبع التعليمات لإكمال عملية الإرجاع.",
  },
  {
    category: "payment",
    questionEn: "What payment methods do you accept?",
    questionAr: "ما طرق الدفع المقبولة؟",
    answerEn:
      "We accept all major credit cards (Visa, Mastercard, Amex) and cash on delivery for orders within Egypt.",
    answerAr:
      "نقبل جميع بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس) والدفع عند الاستلام للطلبات داخل مصر.",
  },
  {
    category: "payment",
    questionEn: "Is my payment information secure?",
    questionAr: "هل معلومات الدفع آمنة؟",
    answerEn:
      "Yes, we use industry-standard SSL encryption to protect all transactions. We never store your full card details.",
    answerAr:
      "نعم، نستخدم تشفير SSL القياسي لحماية جميع المعاملات. نحن لا نخزن أبدًا تفاصيل بطاقتك الكاملة.",
  },
];

interface Props {
  locale: string;
}

export function FAQPageClient({ locale }: Props) {
  const isAr = locale === "ar";
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = FAQ_DATA.filter((faq) => {
    const question = isAr ? faq.questionAr : faq.questionEn;
    const answer = isAr ? faq.answerAr : faq.answerEn;
    return (
      question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-white" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: CARD_COLORS[0] }}
          >
            <HelpCircle
              size={36}
              style={{ color: CARD_ACCENT[0] }}
              strokeWidth={2}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isAr
              ? "إجابات على الأسئلة الأكثر شيوعًا حول الطلبات والشحن والإرجاع"
              : "Answers to the most common questions about orders, shipping, and returns"}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={20}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder={isAr ? "ابحث في الأسئلة..." : "Search questions..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.map((faq, idx) => {
            const isOpen = openId === idx;
            const question = isAr ? faq.questionAr : faq.questionEn;
            const answer = isAr ? faq.answerAr : faq.answerEn;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base pr-4">
                    {question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <div className="p-5 text-sm text-muted-foreground leading-relaxed">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: CARD_COLORS[1] }}
        >
          <h3 className="text-lg font-black mb-2">
            {isAr ? "لم تجد ما تبحث عنه؟" : "Didn't find what you're looking for?"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {isAr
              ? "تواصل معنا وسنكون سعداء بمساعدتك"
              : "Contact us and we'll be happy to help"}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:scale-105"
            style={{ background: CARD_ACCENT[1] }}
          >
            {isAr ? "تواصل معنا" : "Contact Us"}
          </Link>
        </div>
      </div>
    </main>
  );
}
