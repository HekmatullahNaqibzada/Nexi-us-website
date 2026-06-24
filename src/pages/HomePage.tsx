import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Search, Megaphone, BarChart3, Code2, Compass, PenTool, Hammer, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { MagneticLink } from "@/components/site/MagneticButton";
import { Reveal } from "@/components/site/Reveal";
import { HighlightText } from "@/components/site/HighlightText";
import { Counter } from "@/components/site/Counter";
import { HeroVisual } from "@/components/site/HeroVisual";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Partners } from "@/components/site/Partners";
import { Clients } from "@/components/site/Clients";
import { AmbientCanvas } from "@/components/site/AmbientCanvas";
import { PlexusCanvas } from "@/components/site/PlexusCanvas";

export default function HomePage() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = "NEXI-US Digital Hub — Digital Experiences. Software. Growth.";
  }, []);

  return (
    <>
      {/* HERO — Cyber-Organic Edge */}
      <section className="relative min-h-[92svh] flex items-center pt-28 md:pt-32 pb-14 md:pb-16 overflow-hidden ambient-glow">
        <AmbientCanvas className="opacity-60" />
        <div aria-hidden className="absolute inset-0 grid-bg opacity-[0.18]" />
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-ambient-left)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-ambient-right)" }} />
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[30%]" style={{ background: "var(--gradient-ambient-bottom)" }} />
        {/* Top-center radial glow */}
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full opacity-70" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.12), transparent 65%)" }} />
        {/* Floating orbs for depth */}
        <div aria-hidden className="pointer-events-none absolute top-[20%] left-[8%] h-[200px] w-[200px] rounded-full opacity-50 animate-pulse" style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.15), transparent 70%)", animationDuration: "4s" }} />
        <div aria-hidden className="pointer-events-none absolute bottom-[25%] right-[5%] h-[150px] w-[150px] rounded-full opacity-40 animate-pulse" style={{ background: "radial-gradient(circle, oklch(0.55 0.16 255 / 0.12), transparent 70%)", animationDuration: "5s" }} />
        {/* Bottom edge glow separator */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 5%, oklch(0.78 0.13 195 / 0.20) 30%, oklch(0.78 0.13 195 / 0.20) 70%, transparent 95%)" }} />

        <div className="container-x relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Slider */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <HeroSlider />
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <HeroVisual />
            </motion.div>
          </div>

          {/* Stat cards — below hero, side by side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 md:mt-14 grid grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0"
          >
            <div className="elevated-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">{t("hero.card1.label")}</span>
              </div>
              <div className="text-foreground text-xl md:text-2xl font-display font-bold tracking-tight">{t("hero.card1.value")}</div>
              <div className="mt-3 h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-glow w-3/4" />
              </div>
            </div>
            <div className="elevated-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">{t("hero.card2.label")}</span>
              </div>
              <div className="text-foreground text-xl md:text-2xl font-display font-bold tracking-tight">{t("hero.card2.value")}</div>
              <div className="text-muted-foreground text-xs mt-1">{t("hero.card2.sub")}</div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* TRUST / STATS */}
      <section className="relative py-14 md:py-20 overflow-hidden section-alt">
        <AmbientCanvas className="opacity-20" />
        <div className="container-x">
          <Reveal>
            <div className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("trust.kicker")}</div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { n: 50, s: "+", l: t("trust.projects") },
              { n: 84, s: "%", l: t("trust.clients") },
              { n: 5, s: "+", l: t("trust.years") },
              { n: 3, s: "+", l: t("trust.countries") },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1} scale={0.92} y={16}>
                <div className="text-center">
                  <div className="text-[clamp(2.4rem,5vw,4rem)] font-display font-semibold tracking-tight">
                    <span className="text-gradient"><Counter to={s.n} suffix={s.s} /></span>
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-14 md:py-20 overflow-hidden section-edge">
        <PlexusCanvas className="opacity-[0.22]" density={0.9} />
        <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[360px] w-[700px] rounded-full opacity-60" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.12), transparent 70%)" }} />
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <Reveal>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("services.kicker")}</div>
                <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-display font-semibold leading-tight tracking-tight">
                  <HighlightText text={t("services.title")} />
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/services" className="group inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-primary">
                {t("services.all")} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              { Icon: Search, k: "services.seo", d: "services.seoDesc" },
              { Icon: Megaphone, k: "services.smm", d: "services.smmDesc" },
              { Icon: BarChart3, k: "services.ads", d: "services.adsDesc" },
              { Icon: Code2, k: "services.soft", d: "services.softDesc" },
            ].map(({ Icon, k, d }, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="elevated-card group relative overflow-hidden rounded-3xl p-8 md:p-10 hover:border-primary/40 transition-colors"
                >
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">{t(k)}</h3>
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-md">{t(d)}</p>
                    <Link to="/services" className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
                      {t("services.learn")} <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <Partners />

      {/* WHY NEXI / TIMELINE */}
      <section className="relative py-14 md:py-20 overflow-hidden section-accent">
        <PlexusCanvas className="opacity-[0.28]" density={1.1} />
        <div aria-hidden className="pointer-events-none absolute -top-20 right-0 h-[300px] w-[500px] rounded-full opacity-50" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.15), transparent 65%)" }} />
        <div className="container-x">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("why.kicker")}</div>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-display font-semibold leading-tight tracking-tight"><HighlightText text={t("why.title")} /></h2>
          </Reveal>

          <div className="relative mt-12">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden md:block">
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.4, ease: [0.22,1,0.36,1] }} viewport={{ once: true }} className="origin-left h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { Icon: Compass, k: "why.discover", d: "why.discoverDesc" },
                { Icon: PenTool, k: "why.design", d: "why.designDesc" },
                { Icon: Hammer, k: "why.build", d: "why.buildDesc" },
                { Icon: TrendingUp, k: "why.scale", d: "why.scaleDesc" },
              ].map(({ Icon, k, d }, i) => (
                <Reveal key={k} delay={i * 0.1}>
                  <div className="relative flex flex-col items-start">
                    <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-foreground/10 bg-[color:var(--surface)] text-primary elevated-card">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="mt-5 text-xs text-muted-foreground">0{i + 1}</div>
                    <h3 className="mt-1 text-xl font-display font-semibold tracking-tight">{t(k)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t(d)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <Clients />

      {/* CTA */}
      <section className="relative py-14 md:py-20 overflow-hidden section-alt">
        <PlexusCanvas className="opacity-[0.32]" density={1.0} />
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-[280px] w-[600px] rounded-full opacity-40" style={{ background: "radial-gradient(ellipse at 20% 0%, oklch(0.78 0.13 195 / 0.18), transparent 65%)" }} />
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] elevated-card p-8 md:p-14">
              <div aria-hidden className="absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.5), transparent 60%)", filter: "blur(40px)" }} />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-[clamp(2rem,4.5vw,3.8rem)] font-display font-semibold leading-[1.05] tracking-tight"><HighlightText text={t("cta.title")} /></h2>
                  <p className="mt-4 text-muted-foreground max-w-md">{t("cta.sub")}</p>
                </div>
                <div className="flex md:justify-end">
                  <MagneticLink to="/book-appointment" variant="primary">{t("cta.btn")} <ArrowRight className="w-4 h-4" /></MagneticLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="relative py-14 md:py-20 overflow-hidden section-edge">
        <AmbientCanvas className="opacity-18" />
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/4 h-[320px] w-[500px] rounded-full opacity-50" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 60%)" }} />
        <div className="container-x grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h3 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-semibold tracking-tight leading-tight"><HighlightText text={t("contactPreview.title")} /></h3>
            <p className="mt-4 text-muted-foreground max-w-md">{t("contactPreview.sub")}</p>
            <div className="mt-6"><MagneticLink to="/contact" variant="outline">{t("contactPreview.cta")} <ArrowUpRight className="w-4 h-4" /></MagneticLink></div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="elevated-card rounded-3xl p-8 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("contactPreview.email")}</div>
                <div className="mt-1 text-lg">info@nexi-us.com</div>
              </div>
              <div className="hairline" />
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("contactPreview.phone")}</div>
                <div className="mt-1 text-lg">(310) 906-0360</div>
              </div>
              <div className="hairline" />
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("contactPreview.office")}</div>
                <div className="mt-1 text-lg">{t("contactPreview.officeValue")}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
