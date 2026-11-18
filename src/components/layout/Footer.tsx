import { Globe, Share2, AtSign } from "lucide-react";

export async function Footer() {
  return (
    <footer className="mt-auto bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black tracking-tight"
                style={{ background: "#5F0054" }}
              >
                LB
              </div>
              <span className="text-lg font-black text-white">Life Box</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Quality home products for every room and every taste.
            </p>
            <p className="text-white/50 text-sm mt-1 leading-relaxed" dir="rtl" lang="ar">
              منتجات منزلية عالية الجودة لكل غرفة وكل ذوق.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {[
                ["Home Utilities",   "home-utilities"],
                ["Housewares",       "housewares"],
                ["Home Textiles",    "home-textiles"],
                ["Decorative Items", "decorative-items"],
              ].map(([label, slug]) => (
                <li key={slug}>
                  <a
                    href={`/en/category/${slug}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Help</h3>
            <ul className="space-y-2.5">
              {["Contact Us", "FAQ", "Returns", "Shipping Info"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Follow Us</h3>
            <div className="flex gap-2.5">
              {[
                { label: "Instagram", Icon: AtSign,  href: "#" },
                { label: "Twitter",   Icon: Globe,   href: "#" },
                { label: "Facebook",  Icon: Share2,  href: "#" },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Icon size={15} color="rgba(255,255,255,0.6)" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">© 2025 Life Box. All rights reserved.</p>
          <p className="text-xs text-white/25" dir="rtl" lang="ar">© 2025 لايف بوكس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
