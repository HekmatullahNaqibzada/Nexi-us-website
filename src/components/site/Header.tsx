import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useI18n, type Lang } from "@/lib/i18n";
import { MagneticLink } from "./MagneticButton";
import { ThemeToggle } from "./ThemeToggle";
import { Globe, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

const NAV = [
  { to: "/", key: "nav.home" as const },
  { to: "/about", key: "nav.about" as const },
  { to: "/services", key: "nav.services" as const, mega: true },
  { to: "/book-appointment", key: "nav.book" as const },
  { to: "/contact", key: "nav.contact" as const },
];

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "us" },
  { code: "fa", label: "دری",     flag: "af" },
  { code: "ps", label: "پښتو",   flag: "af" },
];

function FlagImg({ code, className = "" }: { code: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w20/${code}.png`}
      srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      alt={code.toUpperCase()}
      className={`rounded-[2px] object-cover ${className}`}
      style={{ width: 18, height: 13 }}
    />
  );
}

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { scrollY } = useScroll();
  const pad = useTransform(scrollY, [0, 120], [10, 6]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { pathname } = useLocation();

  function handleServiceClick(e: React.MouseEvent, hash: string) {
    if (pathname === "/services") {
      e.preventDefault();
      setMega(false);
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setLangOpen(false); setMega(false); }, [pathname]);

  return (
    <motion.header
      style={{ paddingTop: pad, paddingBottom: pad }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-x !px-3 md:!px-4">
        <motion.div
          animate={{
            backgroundColor: scrolled ? "color-mix(in oklab, var(--surface) 65%, transparent)" : "transparent",
            borderColor: scrolled ? "var(--line)" : "transparent",
            boxShadow: scrolled ? "0 20px 50px -30px rgba(0,0,0,0.7)" : "none",
          }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between gap-4 rounded-full border px-4 md:px-5 py-2 md:py-2.5 backdrop-blur-xl"
        >
          <Logo className="h-12 md:h-14" />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => item.mega && setMega(true)}
                  onMouseLeave={() => item.mega && setMega(false)}
                >
                  <Link
                    to={item.to}
                    className="group relative px-4 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <span>{t(item.key)}</span>
                    {item.mega && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                    <span
                      className={`absolute left-4 right-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 ${
                        active ? "scale-x-100" : ""
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-foreground/80 hover:bg-foreground/5 transition-colors"
                aria-label="Language"
              >
                <FlagImg code={LANGS.find(l => l.code === lang)?.flag ?? "us"} />
                {lang.toUpperCase()}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 w-40 rounded-2xl glass p-1.5 shadow-xl"
                  >
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-foreground/5 transition ${
                          lang === l.code ? "text-primary" : ""
                        }`}
                      >
                        <FlagImg code={l.flag} />
                        <span className="flex-1">{l.label}</span>
                        <span className="text-[10px] opacity-60">{l.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <MagneticLink to="/get-a-quote" variant="primary" className="!py-2 !px-4 text-xs">
                {t("nav.quote")}
              </MagneticLink>
            </div>

            <button
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-foreground/10 hover:bg-foreground/5 transition"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="hidden lg:block absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[640px] rounded-3xl glass p-6 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "services.seo",  d: "services.seoDesc",  hash: "seo"  },
                  { k: "services.smm",  d: "services.smmDesc",  hash: "smm"  },
                  { k: "services.ads",  d: "services.adsDesc",  hash: "ads"  },
                  { k: "services.soft", d: "services.softDesc", hash: "soft" },
                ].map((s) => (
                  <Link
                    key={s.k}
                    to={`/services#${s.hash}`}
                    onClick={(e) => { handleServiceClick(e, s.hash); setMega(false); }}
                    className="group rounded-2xl p-4 hover:bg-foreground/[0.04] border border-transparent hover:border-foreground/10 transition"
                  >
                    <div className="text-sm font-semibold group-hover:text-primary transition-colors">{t(s.k)}</div>
                    <div className="text-xs text-muted-foreground mt-1">{t(s.d)}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-[color:var(--surface)] border-l border-foreground/10 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="container-x flex h-20 items-center justify-between">
                <Logo className="h-11" />
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-foreground/10 hover:bg-foreground/5 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                className="container-x flex-1 flex flex-col gap-1 py-6 overflow-y-auto"
              >
                {NAV.map((item) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } },
                    }}
                  >
                    {item.mega ? (
                      /* Services — accordion */
                      <div>
                        <button
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className="w-full flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-display font-semibold tracking-tight hover:bg-foreground/[0.04] transition"
                        >
                          <span>{t(item.key)}</span>
                          <motion.div animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mx-2 mb-2 rounded-2xl border border-foreground/8 bg-foreground/[0.02] p-2 flex flex-col gap-1">
                                {[
                                  { k: "services.seo",  d: "services.seoDesc",  hash: "seo"  },
                                  { k: "services.smm",  d: "services.smmDesc",  hash: "smm"  },
                                  { k: "services.ads",  d: "services.adsDesc",  hash: "ads"  },
                                  { k: "services.soft", d: "services.softDesc", hash: "soft" },
                                ].map((s) => (
                                  <Link
                                    key={s.k}
                                    to={`/services#${s.hash}`}
                                    onClick={(e) => {
                                      handleServiceClick(e, s.hash);
                                      setMobileServicesOpen(false);
                                      setOpen(false);
                                    }}
                                    className="group flex items-center justify-between rounded-xl px-4 py-3 hover:bg-primary/[0.07] transition"
                                  >
                                    <div>
                                      <div className="text-sm font-semibold group-hover:text-primary transition-colors">{t(s.k as any)}</div>
                                      <div className="text-xs text-muted-foreground mt-0.5">{t(s.d as any)}</div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary transition shrink-0 ml-2" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-display font-semibold tracking-tight hover:bg-foreground/[0.04] transition"
                      >
                        <span>{t(item.key)}</span>
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-primary transition" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              <div className="container-x border-t border-foreground/10 py-6 space-y-5">
                <div className="flex items-center gap-2">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium border transition ${
                        lang === l.code ? "border-primary bg-primary/10 text-primary" : "border-foreground/10 text-foreground/70 hover:border-foreground/20"
                      }`}
                    >
                      <FlagImg code={l.flag} /> {l.label}
                    </button>
                  ))}
                </div>
                <Link
                  to="/get-a-quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 text-base font-medium hover:brightness-110 transition"
                >
                  {t("nav.quote")} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
