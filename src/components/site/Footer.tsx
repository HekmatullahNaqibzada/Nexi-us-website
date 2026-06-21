import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { PlexusCanvas } from "./PlexusCanvas";
import { HighlightText } from "./HighlightText";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    if (!email.trim()) { setErrorMsg(t("footer.email")); return; }
    if (!isValidEmail(email)) { setStatus("error"); setErrorMsg("Please enter a valid email address."); return; }
    setStatus("loading"); setErrorMsg("");
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error"); setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const cols = [
    {
      title: t("nav.services"),
      links: [
        { label: t("services.seo"), to: "/services" },
        { label: t("services.smm"), to: "/services" },
        { label: t("services.ads"), to: "/services" },
        { label: t("services.soft"), to: "/services" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("nav.about"), to: "/about" },
        { label: t("nav.book"), to: "/book-appointment" },
        { label: t("nav.quote"), to: "/get-a-quote" },
      ],
    },
    {
      title: t("footer.contactCol"),
      links: [
        { label: "info@nexi-us.com", to: "/contact" },
        { label: "(310) 906-0360", to: "/contact" },
        { label: "Sacramento, CA", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative mt-20 md:mt-24 overflow-hidden footer-surface">
      <PlexusCanvas className="opacity-[0.28]" density={1.4} maxDist={160} />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-30 dark:opacity-30 light:opacity-40" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[1200px] -translate-x-1/2 rounded-full" style={{ background: "var(--gradient-radial)" }} />

      <div className="container-x relative">
        <Reveal>
          <h2 className="pt-14 md:pt-20 text-[clamp(2rem,4.5vw,4rem)] font-display font-semibold leading-[1.05] tracking-tight max-w-[28ch]">
            <bdi><HighlightText text={t("footer.statement")} /></bdi>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              {t("footer.newsletter")}
            </p>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/[0.06] px-4 py-3 text-sm text-primary max-w-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                You're subscribed! Thanks for joining us.
              </motion.div>
            ) : (
              <div className="flex flex-col gap-1.5 max-w-sm w-full">
                <form
                  onSubmit={handleSubscribe}
                  className={`flex w-full items-center gap-2 rounded-full border p-1.5 transition ${
                    status === "error"
                      ? "border-red-500/50 bg-red-500/[0.04]"
                      : "border-foreground/10 bg-foreground/[0.03] focus-within:border-primary/60"
                  }`}
                >
                  <Mail className="ml-3 h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                    placeholder={t("footer.email")}
                    disabled={status === "loading"}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:brightness-110 transition disabled:opacity-60 shrink-0"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : t("footer.subscribe")}
                  </button>
                </form>
                {status === "error" && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 pl-4 text-xs text-red-500"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errorMsg}
                  </motion.p>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 mt-2">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 hover:text-primary hover:border-primary/50"
                  aria-label="social"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1 text-sm text-foreground/90 hover:text-primary transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 hairline"
          style={{ transformOrigin: "inline-start" }}
        />

        {/* Brand mark */}
        <div className="mt-8 text-center" dir="ltr">
          <span className="footer-brand footer-giant-text select-none text-[clamp(5rem,18vw,16rem)] font-display font-bold leading-[0.85] tracking-tighter">
            NEXI.US
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 text-xs text-muted-foreground">
          <div><bdi>© {year} NEXI-US Digital Hub.</bdi> {t("footer.rights")}</div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> {t("footer.status")}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
