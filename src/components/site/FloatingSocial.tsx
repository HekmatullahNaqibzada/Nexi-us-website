import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ComponentType } from "react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.74a8.27 8.27 0 0 0 4.84 1.55V6.83a4.85 4.85 0 0 1-1.08-.14z" />
    </svg>
  );
}

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  bg: string;
};

const LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/nexi.hub",
    icon: Facebook,
    color: "#1877F2",
    glow: "rgba(24,119,242,0.35)",
    bg: "rgba(24,119,242,0.10)",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexi.hub",
    icon: Instagram,
    color: "#E1306C",
    glow: "rgba(225,48,108,0.35)",
    bg: "rgba(225,48,108,0.10)",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Nexi.Digital",
    icon: Youtube,
    color: "#FF0000",
    glow: "rgba(255,0,0,0.30)",
    bg: "rgba(255,0,0,0.08)",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@nexi.digital",
    icon: TikTokIcon,
    color: "#010101",
    glow: "rgba(105,201,208,0.35)",
    bg: "rgba(105,201,208,0.10)",
  },
];

export function FloatingSocial() {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";

  return (
    <motion.div
      key={isRtl ? "rtl" : "ltr"}
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className={`fixed bottom-6 z-40 flex flex-col items-center gap-2 md:bottom-10 ${
        isRtl ? "left-5 md:left-7" : "right-5 md:right-7"
      }`}
      aria-label="Social media links"
    >
      {/* Vertical divider line above */}
      <div className="w-px h-6 hidden md:block" style={{ background: "linear-gradient(to bottom, transparent, oklch(0.78 0.13 195 / 0.4))" }} />

      {LINKS.map(({ label, href, icon: Icon, color, glow, bg }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.93 }}
          transition={{ delay: 1.6 + i * 0.07 }}
          className="group relative flex items-center justify-center"
        >
          {/* Tooltip — flips side based on RTL */}
          <span
            className={`pointer-events-none absolute whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              isRtl ? "left-12" : "right-12"
            }`}
            style={{ background: color }}
          >
            {label}
          </span>
          {/* Icon button */}
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md shadow-md transition-all duration-300 group-hover:shadow-lg"
            style={{
              background: bg,
              border: `1.5px solid ${color}40`,
              color: color,
              boxShadow: `0 2px 12px ${glow}`,
            }}
          >
            <Icon className="w-4 h-4" />
          </span>
          {/* Hover glow ring */}
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: `0 0 16px 4px ${glow}` }}
          />
        </motion.a>
      ))}

      {/* Vertical divider line below */}
      <div className="w-px h-6 hidden md:block" style={{ background: "linear-gradient(to bottom, oklch(0.78 0.13 195 / 0.4), transparent)" }} />
    </motion.div>
  );
}
