import { Footer } from "@/components/layout/Footer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <>
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
              {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
            </span>
          </nav>

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isAr ? "آخر تحديث: 1 فبراير 2025" : "Last updated: February 1, 2025"}
          </p>

          {/* Content */}
          <div className="prose prose-sm sm:prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "1. مقدمة" : "1. Introduction"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "مرحبًا بك في لايف بوكس. من خلال الوصول إلى موقعنا واستخدامه، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام موقعنا."
                  : "Welcome to Life Box. By accessing and using our website, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use our site."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "2. الطلبات والدفع" : "2. Orders & Payment"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "عند تقديم طلب، فإنك تقدم عرضًا لشراء المنتج (المنتجات). جميع الطلبات تخضع للقبول والتوافر. نحتفظ بالحق في رفض أي طلب لأي سبب من الأسباب. الأسعار عرضة للتغيير دون إشعار مسبق."
                  : "When placing an order, you are making an offer to purchase the product(s). All orders are subject to acceptance and availability. We reserve the right to refuse any order for any reason. Prices are subject to change without notice."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "3. الشحن والتسليم" : "3. Shipping & Delivery"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نشحن داخل مصر فقط. أوقات التسليم تقديرية وليست مضمونة. نحن لسنا مسؤولين عن التأخير الناجم عن شركات الشحن أو الجمارك أو الأحداث الخارجة عن سيطرتنا."
                  : "We ship within Egypt only. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or events beyond our control."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "4. الإرجاع والاسترداد" : "4. Returns & Refunds"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نقبل الإرجاع خلال 30 يومًا من التسليم. يجب أن تكون المنتجات غير مستخدمة وفي حالتها الأصلية. سيتم معالجة المبالغ المستردة في غضون 7-14 يوم عمل بعد استلام العنصر المرتجع."
                  : "We accept returns within 30 days of delivery. Items must be unused and in original condition. Refunds will be processed within 7-14 business days after receiving the returned item."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "5. حقوق الملكية الفكرية" : "5. Intellectual Property"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات، هي ملك لايف بوكس ومحمية بموجب قوانين حقوق النشر. يُحظر الاستخدام غير المصرح به."
                  : "All content on this site, including text, images, and logos, is owned by Life Box and protected by copyright laws. Unauthorized use is prohibited."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "6. حدود المسؤولية" : "6. Limitation of Liability"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "لايف بوكس ليست مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام موقعنا أو منتجاتنا."
                  : "Life Box is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our site or products."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "7. القانون الحاكم" : "7. Governing Law"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "تخضع هذه الشروط وتُفسر وفقًا لقوانين جمهورية مصر العربية. أي نزاع ناشئ عن هذه الشروط سيخضع للاختصاص القضائي الحصري لمحاكم القاهرة."
                  : "These terms are governed by and construed in accordance with the laws of the Arab Republic of Egypt. Any dispute arising from these terms will be subject to the exclusive jurisdiction of the courts of Cairo."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "8. تغييرات على الشروط" : "8. Changes to Terms"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات على هذه الصفحة. استمرارك في استخدام الموقع بعد التغييرات يشكل قبولك للشروط المحدثة."
                  : "We reserve the right to modify these terms at any time. Changes will be posted on this page. Your continued use of the site after changes constitutes acceptance of the updated terms."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "9. اتصل بنا" : "9. Contact Us"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على: support@lifebox.eg"
                  : "If you have any questions about these terms, please contact us at: support@lifebox.eg"}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
