import { HeroSection }      from "@/components/home/HeroSection";
import { TrustBar }         from "@/components/home/TrustBar";
import { ShopByCategory }   from "@/components/home/ShopByCategory";
import { BestSellers }      from "@/components/home/BestSellers";
import { LifeBoxBundles }   from "@/components/home/LifeBoxBundles";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner }      from "@/components/home/PromoBanner";
import { Footer }           from "@/components/layout/Footer";
import { StarBurst, WavyLine, EyePair } from "@/components/home/FloatingIcons";
import { FAQ } from "@/components/home/FAQ";

// Icon placement config — alternates left/right down the full page
const ICONS = [
  // ── Hero zone ──────────────────────────────────────
  { C: StarBurst, size: 48,  top: "5rem",   right: "1.5rem", left: undefined, rotate: "15deg",   opacity: 0.90 },
  { C: WavyLine,  size: 70,  top: "10rem",  left: "1rem",    right: undefined, rotate: "-12deg",  opacity: 0.80 },
  { C: EyePair,   size: 52,  top: "18rem",  right: "3rem",   left: undefined,  rotate: "0deg",    opacity: 0.75 },
  // ── TrustBar / PromoBanner zone ────────────────────
  { C: StarBurst, size: 32,  top: "26rem",  left: "2rem",    right: undefined, rotate: "-20deg",  opacity: 0.70 },
  { C: WavyLine,  size: 90,  top: "30rem",  right: "0.5rem", left: undefined,  rotate: "8deg",    opacity: 0.75 },
  { C: EyePair,   size: 44,  top: "38rem",  left: "0.5rem",  right: undefined, rotate: "0deg",    opacity: 0.65 },
  // ── ShopByCategory zone ────────────────────────────
  { C: StarBurst, size: 42,  top: "48rem",  right: "2rem",   left: undefined,  rotate: "30deg",   opacity: 0.80 },
  { C: WavyLine,  size: 65,  top: "56rem",  left: "1.5rem",  right: undefined, rotate: "15deg",   opacity: 0.70 },
  { C: EyePair,   size: 58,  top: "64rem",  right: "1rem",   left: undefined,  rotate: "0deg",    opacity: 0.78 },
  // ── BestSellers zone ───────────────────────────────
  { C: StarBurst, size: 36,  top: "74rem",  left: "0.75rem", right: undefined, rotate: "-10deg",  opacity: 0.72 },
  { C: WavyLine,  size: 80,  top: "82rem",  right: "1.5rem", left: undefined,  rotate: "-8deg",   opacity: 0.68 },
  { C: EyePair,   size: 46,  top: "92rem",  left: "2rem",    right: undefined, rotate: "0deg",    opacity: 0.70 },
  // ── Bundles zone ───────────────────────────────────
  { C: StarBurst, size: 50,  top: "104rem", right: "0.5rem", left: undefined,  rotate: "5deg",    opacity: 0.82 },
  { C: WavyLine,  size: 75,  top: "114rem", left: "1rem",    right: undefined, rotate: "20deg",   opacity: 0.72 },
  { C: EyePair,   size: 54,  top: "124rem", right: "2.5rem", left: undefined,  rotate: "0deg",    opacity: 0.68 },
  // ── Featured Products zone ─────────────────────────
  { C: StarBurst, size: 30,  top: "136rem", left: "1.5rem",  right: undefined, rotate: "-25deg",  opacity: 0.65 },
  { C: WavyLine,  size: 88,  top: "144rem", right: "1rem",   left: undefined,  rotate: "-5deg",   opacity: 0.73 },
  { C: EyePair,   size: 50,  top: "154rem", left: "0.5rem",  right: undefined, rotate: "0deg",    opacity: 0.68 },
  // ── CategoryShowcase zone ──────────────────────────
  { C: StarBurst, size: 44,  top: "168rem", right: "2rem",   left: undefined,  rotate: "18deg",   opacity: 0.75 },
  { C: WavyLine,  size: 68,  top: "178rem", left: "1rem",    right: undefined, rotate: "-18deg",  opacity: 0.70 },
  { C: EyePair,   size: 56,  top: "188rem", right: "1.5rem", left: undefined,  rotate: "0deg",    opacity: 0.72 },
  { C: StarBurst, size: 38,  top: "198rem", left: "2.5rem",  right: undefined, rotate: "35deg",   opacity: 0.65 },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="relative overflow-x-hidden">

      {/* ── Decorative floating icons ─────────────────────────────────── */}
      {ICONS.map(({ C: Icon, size, top, right, left, rotate, opacity }, i) => (
        <Icon
          key={i}
          size={size}
          className="absolute hidden lg:block pointer-events-none select-none"
          style={{
            top,
            ...(right !== undefined ? { right } : {}),
            ...(left  !== undefined ? { left  } : {}),
            opacity,
            transform: `rotate(${rotate})`,
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Sections ──────────────────────────────────────────────────── */}
      <HeroSection locale={locale} />
      <TrustBar />
      <PromoBanner />
      <ShopByCategory locale={locale} />
      <BestSellers locale={locale} />
      <LifeBoxBundles locale={locale} />
      <FeaturedProducts locale={locale} />
      <FAQ locale={locale} />
      <Footer />
    </main>
  );
}