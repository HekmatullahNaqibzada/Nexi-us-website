import { useEffect, useState } from "react";
import { VideoLightbox } from "@/components/site/VideoLightbox";
import thumbnail from "@/assets/thumbnail.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import {
  Target,
  Eye,
  Search,
  Share2,
  MousePointerClick,
  Code2,
  Sparkles,
  Award,
  Handshake,
  ScanLine,
  TrendingUp,
  Check,
  ArrowRight,
  User,
  FileText,
  Stamp,
  ClipboardList,
  Globe,
  HeartHandshake,
  Home,
  Briefcase,
  Wifi,
  Settings,
  Car,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { HighlightText } from "@/components/site/HighlightText";
import { useTheme } from "@/lib/theme";
import darkLogo from "@/assets/nexi-logo-dark.png";
import whiteLogo from "@/assets/nexi-logo-whiite.png";
import teamPhoto1 from "@/assets/team/Abdul-Ghafoor-Sahel.png";
import teamPhoto2 from "@/assets/team/ahmad-Safi.png";
import teamPhoto3 from "@/assets/team/jawad-moradi.webp";

const YT_ID = "5YWqbjypNn4";

export default function AboutPage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? whiteLogo : darkLogo;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.title = "About — NEXI-US Digital Hub";
  }, []);

  const services = [
    { Icon: Search, title: t("about.what.seo"), body: t("about.what.seoDesc") },
    { Icon: Share2, title: t("about.what.smm"), body: t("about.what.smmDesc") },
    { Icon: MousePointerClick, title: t("about.what.ads"), body: t("about.what.adsDesc") },
    { Icon: Code2, title: t("about.what.soft"), body: t("about.what.softDesc") },
  ];

  const values = [
    { Icon: Sparkles, title: t("about.value.innovation"), body: t("about.value.innovationDesc") },
    { Icon: Award, title: t("about.value.excellence"), body: t("about.value.excellenceDesc") },
    { Icon: Handshake, title: t("about.value.partnership"), body: t("about.value.partnershipDesc") },
    { Icon: ScanLine, title: t("about.value.transparency"), body: t("about.value.transparencyDesc") },
    { Icon: TrendingUp, title: t("about.value.growth"), body: t("about.value.growthDesc") },
  ];

  const reasons = [
    t("about.why.1"),
    t("about.why.2"),
    t("about.why.3"),
    t("about.why.4"),
    t("about.why.5"),
    t("about.why.6"),
  ];

  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        compact
        title={
          <>
            {t("about.title1")}{" "}
            <span className="text-gradient">{t("about.titleHighlight")}</span>.
          </>
        }
        sub={t("about.sub")}
        rightSlot={
          <div className="relative flex items-center justify-center w-72 h-72 xl:w-80 xl:h-80">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
            {/* Animated pulse rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ scale: [1, 1.08 + i * 0.06, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3 + i * 0.8, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
              />
            ))}
            {/* Logo circle container */}
            <div className="relative z-10 flex items-center justify-center w-52 h-52 xl:w-60 xl:h-60 rounded-full elevated-card"
              style={{ boxShadow: "0 0 60px -10px oklch(0.78 0.13 195 / 0.35), 0 20px 50px -20px oklch(0 0 0 / 0.3)" }}>
              <img
                src={logoSrc}
                alt="NEXI-US"
                className="h-24 xl:h-28 w-auto select-none"
                draggable={false}
              />
            </div>
          </div>
        }
      />

      {/* Intro paragraphs */}
      <section className="relative py-14 md:py-20">
        <div className="container-x grid lg:grid-cols-12 gap-8">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-primary">Our Story</div>
            <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)] font-display font-semibold tracking-tight leading-tight">
              <HighlightText text={t("about.storyHeading")} />
            </h2>

            {/* Video Thumbnail — opens lightbox on click */}
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="Watch agency video"
              className="mt-6 relative w-full rounded-2xl overflow-hidden elevated-card group block text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              style={{ aspectRatio: "16/9" }}
            >
              {/* Thumbnail image */}
              <img
                src={thumbnail}
                alt="NEXI-US Agency Video"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20 group-hover:from-black/40 transition-all duration-500" />
              {/* Top badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-[10px] font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                NEXI-US
              </div>
              {/* Centered play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 0 10px oklch(0.78 0.13 195 / 0.18), 0 12px 40px -8px oklch(0.78 0.13 195 / 0.65)" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary-foreground ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-white text-xs font-medium opacity-90 flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 opacity-70"><path d="M8 5v14l11-7z" /></svg>
                  Watch our agency story
                </div>
              </div>
            </button>

            <VideoLightbox
              youtubeId={YT_ID}
              open={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />
          </Reveal>
          <div className="lg:col-span-7 space-y-4 text-lg text-muted-foreground leading-relaxed">
            <Reveal delay={0.05}><p>{t("about.lead1")}</p></Reveal>
            <Reveal delay={0.1}><p>{t("about.lead2")}</p></Reveal>
            <Reveal delay={0.15}><p>{t("about.lead3")}</p></Reveal>
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="relative py-14 md:py-20 section-alt overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/3 h-[300px] w-[500px] rounded-full opacity-50" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 65%)" }} />
        <div className="container-x grid md:grid-cols-2 gap-5">
          {[
            { Icon: Eye, title: t("about.vision"), body: t("about.visionBody") },
            { Icon: Target, title: t("about.mission"), body: t("about.missionBody") },
          ].map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="elevated-card group relative overflow-hidden rounded-3xl p-8 md:p-10 h-full"
              >
                <div aria-hidden className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-radial)" }} />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 text-muted-foreground max-w-md">{body}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-20 right-1/4 h-[280px] w-[450px] rounded-full opacity-40" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.12), transparent 60%)" }} />
        <div className="container-x">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("about.whatWeDo")}</div>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-display font-semibold tracking-tight leading-tight">
              <HighlightText text={t("about.whatHeading")} />
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="elevated-card group h-full rounded-3xl p-7 hover:border-primary/40 transition">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-14 md:py-20 section-accent overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-16 left-0 h-[250px] w-[400px] rounded-full opacity-45" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.14), transparent 60%)" }} />
        <div className="container-x">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("about.valuesTitle")}</div>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-display font-semibold tracking-tight leading-tight">
              <HighlightText text={t("about.valuesHeading")} />
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="elevated-card h-full rounded-3xl p-7"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative py-14 md:py-20">
        <div className="container-x">
          <div className="elevated-card relative overflow-hidden rounded-[2rem] p-8 md:p-12">
            <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full" style={{ background: "var(--gradient-radial)" }} />
            <div className="relative grid lg:grid-cols-12 gap-8">
              <Reveal className="lg:col-span-5">
                <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("about.whyKicker")}</div>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-display font-semibold tracking-tight leading-tight">
                  <HighlightText text={t("about.whyTitle")} />
                </h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  {t("about.whyBody")}
                </p>
              </Reveal>
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
                {reasons.map((r, i) => (
                  <Reveal key={r} delay={i * 0.05}>
                    <div className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4">
                      <div className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-base text-foreground/90">{r}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full opacity-40" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.12), transparent 65%)" }} />
        <div className="container-x">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("about.team.title")}</div>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-display font-semibold tracking-tight leading-tight">
              <HighlightText text={t("about.team.heading")} />
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">{t("about.team.sub")}</p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                nameKey: "about.team.3.name", roleKey: "about.team.3.role", bioKey: "about.team.3.bio", photo: teamPhoto3, color: "oklch(0.72 0.14 155)",
                socials: [
                  { label: "Facebook", href: "https://www.facebook.com/nexi.hub", icon: "facebook" },
                  { label: "Instagram", href: "https://www.instagram.com/nexi.hub", icon: "instagram" },
                ],
              },
              { nameKey: "about.team.1.name", roleKey: "about.team.1.role", bioKey: "about.team.1.bio", photo: teamPhoto1, color: "oklch(0.78 0.13 195)",
                socials: [
                  { label: "Facebook", href: "https://www.facebook.com/nexi.hub", icon: "facebook" },
                  { label: "Instagram", href: "https://www.instagram.com/nexi.hub", icon: "instagram" },
                ],
              },
              {
                nameKey: "about.team.2.name", roleKey: "about.team.2.role", bioKey: "about.team.2.bio", photo: teamPhoto2, color: "oklch(0.68 0.16 260)",
                socials: [
                  { label: "Facebook", href: "https://www.facebook.com/nexi.hub", icon: "facebook" },
                  { label: "Instagram", href: "https://www.instagram.com/nexi.hub", icon: "instagram" },
                ],
              },
            ].map(({ nameKey, roleKey, bioKey, photo, color, socials }, i) => (
              <Reveal key={nameKey} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="elevated-card rounded-3xl p-7 flex flex-col gap-4">
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
                    style={{ boxShadow: `0 10px 32px -8px ${color}` }}
                  >
                    <img
                      src={photo}
                      alt={t(nameKey as any)}
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                    />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-base leading-tight">{t(nameKey as any)}</div>
                    <div className="text-xs text-primary mt-1 uppercase tracking-[0.14em]">{t(roleKey as any)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(bioKey as any)}</p>
                  {/* Social links */}
                  <div className="flex items-center gap-2 pt-1 border-t border-foreground/[0.07]">
                    {socials.map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-foreground/[0.05] text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {icon === "facebook" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                          </svg>
                        )}
                        {icon === "linkedin" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {icon === "instagram" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                          </svg>
                        )}
                        {icon === "x" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-20 right-1/3 h-[300px] w-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.12), transparent 65%)" }} />
        <div className="container-x">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("about.otherServices.kicker" as any)}</div>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-display font-semibold tracking-tight leading-tight">
              <HighlightText text={t("about.otherServices.title" as any)} />
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">{t("about.otherServices.sub" as any)}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {([
              { Icon: FileText,      labelKey: "services.other.tax" },
              { Icon: Stamp,         labelKey: "services.other.notary" },
              { Icon: ClipboardList, labelKey: "services.other.docs" },
              { Icon: Globe,         labelKey: "services.other.immigration" },
              { Icon: HeartHandshake,labelKey: "services.other.social" },
              { Icon: Home,          labelKey: "services.other.housing" },
              { Icon: Briefcase,     labelKey: "services.other.jobs" },
              { Icon: Wifi,          labelKey: "services.other.utility" },
              { Icon: Settings,      labelKey: "services.other.admin" },
              { Icon: Car,           labelKey: "services.other.dmv" },
            ] as const).map(({ Icon, labelKey }, i) => (
              <Reveal key={labelKey} delay={i * 0.05}>
                <div className="elevated-card rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-primary/30 transition-colors">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium leading-snug">{t(labelKey as any)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-14 md:py-24 section-alt overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.15), transparent 60%)" }} />
        <div className="container-x text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("about.philosophy")}</div>
            <h2 className="mt-4 mx-auto max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-display font-semibold tracking-tight leading-[1.05]">
              <span className="text-gradient">{t("about.philosophyTagline")}</span>
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("about.philosophyBody")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:brightness-110 transition"
              >
                {t("nav.book")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium hover:border-primary/60 transition"
              >
                {t("nav.services")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
