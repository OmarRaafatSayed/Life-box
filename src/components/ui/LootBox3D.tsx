"use client";

import { useRef, useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Copy, Check, ArrowRight } from "lucide-react";

type Phase = "idle" | "opening" | "reveal";
const STORAGE_KEY = "lb_lootbox_v4";

function fireConfetti() {
  const colors = ["#F5A623", "#FFD700", "#ffffff", "#3D1A6E", "#E91E8C"];
  confetti({
    particleCount: 140,
    spread: 90,
    startVelocity: 52,
    colors,
    shapes: ["star", "circle"],
    origin: { x: 0.5, y: 0.48 },
    scalar: 1.1,
  });
  setTimeout(() =>
    confetti({ particleCount: 60, angle: 55, spread: 60, startVelocity: 58, colors, origin: { x: 0, y: 0.6 } }), 100);
  setTimeout(() =>
    confetti({ particleCount: 60, angle: 125, spread: 60, startVelocity: 58, colors, origin: { x: 1, y: 0.6 } }), 100);
}

// ── Corner chip ───────────────────────────────────────────────────
function CornerChip({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Open your gift"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full shadow-2xl"
      style={{
        background: "#1C0A3A",
        border: "1px solid rgba(245,166,35,0.35)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,166,35,0.15)",
      }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Dot pulse */}
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0"
        style={{ background: "rgba(95,0,84,0.15)" }}>
        <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-30"
          style={{ background: "#5F0054" }} />
        <Gift size={14} strokeWidth={2} style={{ color: "#5F0054" }} />
      </span>
      <span className="text-xs font-semibold text-white/80 whitespace-nowrap">
        عرضك بينتظرك
      </span>
    </motion.button>
  );
}

// ── Main ──────────────────────────────────────────────────────────
export function LootBox() {
  const [open, setOpen]           = useState(false);
  const [phase, setPhase]         = useState<Phase>("idle");
  const [flash, setFlash]         = useState(false);
  const [copied, setCopied]       = useState(false);
  const [corner, setCorner]       = useState(false);
  const [mounted, setMounted]     = useState(false);
  const lottieRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
    setCorner(true);
  }, []);

  if (!mounted) return null;

  function onLottieReady(dl: DotLottie | null) {
    if (!dl) return;
    lottieRef.current = dl;
    dl.setLoop(true);
    dl.play();
  }

  function onChestClick() {
    if (phase !== "idle") return;
    setPhase("opening");
    const dl = lottieRef.current;
    if (dl) { dl.setLoop(false); dl.play(); }
    setTimeout(() => setFlash(true),          320);
    setTimeout(() => setFlash(false),         580);
    setTimeout(() => fireConfetti(),           420);
    setTimeout(() => setPhase("reveal"),      1750);
  }

  function onClose() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
    setTimeout(() => { setPhase("idle"); setCorner(true); }, 350);
  }

  function onCornerClick() {
    setCorner(false);
    setPhase("idle");
    setOpen(true);
  }

  function onCopy() {
    navigator.clipboard?.writeText("LIFEBOX20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <AnimatePresence>{corner && <CornerChip onClick={onCornerClick} />}</AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            style={{ background: "rgba(8,4,20,0.82)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Flash burst */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  key="flash"
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(255,230,100,0.75), rgba(255,255,255,0.3) 50%, transparent 75%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.26 }}
                />
              )}
            </AnimatePresence>

            {/* ── Card ── */}
            <motion.div
              className="relative w-full flex flex-col rounded-[28px] overflow-hidden"
              style={{
                maxWidth: 400,
                background: "linear-gradient(180deg, #110627 0%, #1A0B38 55%, #110627 100%)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
              initial={{ scale: 0.82, opacity: 0, y: 32 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              {/* Gold top line */}
              <div className="h-[2px] w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, transparent, #F5A623 30%, #FFD700 50%, #F5A623 70%, transparent)" }} />

              {/* Close */}
              {phase !== "reveal" && (
                <button
                  onClick={onClose}
                  className="absolute top-3.5 right-3.5 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  aria-label="Close"
                >
                  <ArrowRight size={12} strokeWidth={2} style={{ transform: "rotate(45deg)" }} />
                </button>
              )}

              {/* ── Stage area ── */}
              <div className="relative flex flex-col items-center pt-4 pb-2 px-6">

                {/* Headline — only idle/opening */}
                <AnimatePresence>
                  {phase !== "reveal" && (
                    <motion.div
                      key="headline"
                      className="text-center mb-4"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-2"
                        style={{ color: "rgba(245,166,35,0.65)" }}>
                        Life Box · Mystery Chest
                      </p>
                      <h2 className="text-[1.6rem] font-black text-white leading-tight">
                        شوف الصندوق بتاعك فيه إيه؟
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Lottie chest */}
                <div className="relative flex items-center justify-center" style={{ height: 280, width: "100%" }}>
                  {/* Soft radial glow behind chest */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: phase === "reveal"
                        ? "radial-gradient(circle at 50% 55%, rgba(245,166,35,0.28) 0%, transparent 65%)"
                        : "radial-gradient(circle at 50% 55%, rgba(109,40,217,0.22) 0%, transparent 65%)",
                      transition: "background 0.6s",
                    }}
                  />

                  <motion.div
                    className="relative z-10 cursor-pointer select-none overflow-hidden"
                    style={{ width: "100%", height: 280 }}
                    animate={
                      phase === "idle"
                        ? { y: [0, -6, 0] }
                        : phase === "opening"
                        ? { x: [-5, 5, -7, 7, -3, 3, 0], rotate: [-1.5, 1.5, -2, 2, 0] }
                        : {}
                    }
                    transition={
                      phase === "idle"
                        ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.5 }
                    }
                    onClick={onChestClick}
                    whileHover={phase === "idle" ? { scale: 1.04, filter: "drop-shadow(0 0 24px rgba(245,166,35,0.55))" } : {}}
                    whileTap={phase === "idle" ? { scale: 0.95 } : {}}
                  >
                    <DotLottieReact
                      src="/chest.lottie"
                      autoplay={false}
                      loop={false}
                      dotLottieRefCallback={onLottieReady}
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: "scale(1.55)",
                        transformOrigin: "center 60%",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Tap hint */}
                <AnimatePresence>
                  {phase === "idle" && (
                    <motion.p
                      key="hint"
                      className="text-[11px] font-medium mt-1 mb-3"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      اضغط لتكشف مفاجأتك
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Reward card ── */}
              <AnimatePresence>
                {phase === "reveal" && (
                  <motion.div
                    key="reward"
                    className="px-5 pb-6 pt-0"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  >
                    {/* Divider */}
                    <div className="w-full h-px mb-5"
                      style={{ background: "linear-gradient(90deg,transparent,rgba(245,166,35,0.3),transparent)" }} />

                    {/* Congrats line */}
                    <p className="text-center text-[11px] font-semibold tracking-[0.14em] uppercase mb-3"
                      style={{ color: "rgba(245,166,35,0.7)" }}>
                      🎉 &nbsp;مبروك — كسبت
                    </p>

                    {/* Big number */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-start leading-none gap-1">
                        <span className="text-[80px] font-black text-white" style={{ lineHeight: 0.9 }}>20</span>
                        <span className="text-[36px] font-black text-white mt-3">%</span>
                      </div>
                      <p className="text-sm font-semibold mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                        خصم على أول طلب بأي منتج
                      </p>
                    </div>

                    {/* Coupon */}
                    <div
                      className="flex items-center justify-between rounded-2xl px-4 py-3 mb-4"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(245,166,35,0.25)",
                      }}
                    >
                      <div>
                        <p className="text-[9px] uppercase tracking-widest mb-0.5"
                          style={{ color: "rgba(255,255,255,0.3)" }}>كود الخصم</p>
                        <p className="text-base font-black tracking-[0.22em] text-white">LIFEBOX20</p>
                      </div>
                      <button
                        onClick={onCopy}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
                        style={
                          copied
                            ? { background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }
                            : { background: "rgba(245,166,35,0.12)", color: "#F5A623", border: "1px solid rgba(245,166,35,0.3)" }
                        }
                      >
                        {copied
                          ? <><Check size={12} strokeWidth={2.5} /> تم النسخ</>
                          : <><Copy size={12} strokeWidth={2} /> نسخ</>
                        }
                      </button>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={onClose}
                      className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(135deg, #3D1A6E, #6D28D9)",
                        boxShadow: "0 6px 24px rgba(61,26,110,0.5)",
                      }}
                    >
                      جربها دلوقتي →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom padding when not revealed */}
              {phase !== "reveal" && <div className="h-6" />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
