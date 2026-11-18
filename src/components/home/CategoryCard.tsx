"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  href: string;
  label: string;
  Icon: LucideIcon;
}

export function CategoryCard({ href, label, Icon }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(61,26,110,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl"
    >
      <Link
        href={href}
        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft transition-colors hover:border-[var(--color-plum)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-plum)]"
      >
        {/* Gradient icon container */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-plum) 0%, var(--color-magenta) 100%)",
          }}
        >
          <Icon className="h-8 w-8 text-white" strokeWidth={1.75} />
        </div>

        {/* Category label */}
        <span className="text-center text-sm font-semibold text-foreground">
          {label}
        </span>
      </Link>
    </motion.div>
  );
}
