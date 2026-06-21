import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";

export function PageHero({ eyebrow, title, sub, children, rightSlot, compact }: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
  rightSlot?: ReactNode;
  compact?: boolean;
}) {
  const { lang } = useI18n();
  const isRtl = lang !== "en";

  const titleClass = isRtl
    ? compact
      ? "max-w-2xl text-[clamp(2.2rem,4.8vw,3.7rem)] leading-[1.22] tracking-normal"
      : "max-w-4xl text-[clamp(2.4rem,5.8vw,4.6rem)] leading-[1.2] tracking-normal"
    : compact
      ? "max-w-2xl text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-tight"
      : "max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight";

  const subClass = isRtl
    ? "mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.2rem)] text-muted-foreground leading-[1.9]"
    : "mt-6 max-w-2xl text-base md:text-lg text-muted-foreground";

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-30 dark:opacity-30 light:opacity-40" />
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-ambient-left)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-ambient-right)" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 5%, oklch(0.78 0.13 195 / 0.25) 30%, oklch(0.78 0.13 195 / 0.25) 70%, transparent 95%)" }} />
      <div className="container-x relative">
        <div className={rightSlot ? "grid lg:grid-cols-2 gap-10 items-center" : ""}>
          {/* Text column — in RTL pushed to the right visually via order */}
          <div dir={isRtl ? "rtl" : "ltr"} className={rightSlot && isRtl ? "lg:order-last" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-foreground/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {eyebrow}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className={`mt-6 font-display font-semibold ${titleClass}`}
            >
              {title}
            </motion.h1>
            {sub && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className={subClass}
              >
                {sub}
              </motion.p>
            )}
            {children}
          </div>
          {/* Slot column — in RTL moved to first position visually */}
          {rightSlot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`hidden lg:flex items-center justify-center ${isRtl ? "lg:order-first" : ""}`}
            >
              {rightSlot}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
