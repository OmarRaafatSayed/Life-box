import { Footer } from "@/components/layout/Footer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function PrivacyPage({
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
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </span>
          </nav>

          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isAr ? "آخر تحديث: 1 فبراير 2025" : "Last updated: February 1, 2025"}
          </p>

          {/* Content */}
          <div className="prose prose-sm sm:prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نجمع المعلومات التي تقدمها لنا مباشرة، مثل الاسم والبريد الإلكتروني ورقم الهاتف وعنوان الشحن ومعلومات الدفع عند تقديم طلب. نقوم أيضًا بجمع معلومات حول تصفحك واستخدامك لموقعنا."
                  : "We collect information you provide directly to us, such as name, email, phone, shipping address, and payment information when placing an order. We also collect information about your browsing and usage of our site."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "2. كيفية استخدام معلوماتك" : "2. How We Use Your Information"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نستخدم معلوماتك لمعالجة الطلبات، وتوفير خدمة العملاء، وإرسال تحديثات الطلب، وتحسين موقعنا، ومنع الاحتيال. نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة."
                  : "We use your information to process orders, provide customer service, send order updates, improve our site, and prevent fraud. We do not sell your personal information to third parties."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "3. مشاركة المعلومات" : "3. Information Sharing"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نشارك معلوماتك مع مقدمي الخدمات الذين يساعدوننا في تشغيل أعمالنا، مثل معالجات الدفع وشركات الشحن. نطلب من جميع الأطراف الثالثة احترام خصوصية معلوماتك."
                  : "We share your information with service providers who help us operate our business, such as payment processors and shipping carriers. We require all third parties to respect the privacy of your information."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "4. ملفات تعريف الارتباط" : "4. Cookies"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك على موقعنا. يمكنك تعطيل ملفات تعريف الارتباط في إعدادات متصفحك، لكن بعض ميزات الموقع قد لا تعمل بشكل صحيح."
                  : "We use cookies and similar technologies to enhance your experience on our site. You can disable cookies in your browser settings, but some site features may not function properly."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "5. أمن البيانات" : "5. Data Security"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "نستخدم تشفير SSL والإجراءات الأمنية القياسية لحماية معلوماتك. ومع ذلك، لا يوجد نظام آمن بنسبة 100٪، ولا يمكننا ضمان الأمن المطلق."
                  : "We use SSL encryption and industry-standard security measures to protect your information. However, no system is 100% secure, and we cannot guarantee absolute security."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "6. حقوقك" : "6. Your Rights"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها وحذفها. يمكنك أيضًا إلغاء الاشتراك في رسائل البريد الإلكتروني التسويقية في أي وقت. اتصل بنا على support@lifebox.eg لممارسة حقوقك."
                  : "You have the right to access, correct, and delete your personal information. You can also opt out of marketing emails at any time. Contact us at support@lifebox.eg to exercise your rights."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "7. الأطفال" : "7. Children"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "موقعنا غير مخصص للأطفال دون سن 18 عامًا. نحن لا نجمع عن قصد معلومات من الأطفال."
                  : "Our site is not intended for children under 18. We do not knowingly collect information from children."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "8. تغييرات على هذه السياسة" : "8. Changes to This Policy"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "قد نقوم بتحديث هذه السياسة من وقت لآخر. سننشر السياسة المحدثة على هذه الصفحة مع تاريخ 'آخر تحديث' الجديد."
                  : "We may update this policy from time to time. We will post the updated policy on this page with a new 'Last updated' date."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black mb-3">
                {isAr ? "9. اتصل بنا" : "9. Contact Us"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "إذا كان لديك أي أسئلة حول هذه السياسة، يرجى الاتصال بنا على: support@lifebox.eg"
                  : "If you have any questions about this policy, please contact us at: support@lifebox.eg"}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
