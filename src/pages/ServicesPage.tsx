import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { MagneticLink } from "@/components/site/MagneticButton";
import { HighlightText } from "@/components/site/HighlightText";
import {
  Search, Megaphone, BarChart3, Code2, Headphones, ArrowRight, Check,
  FileText, Stamp, ClipboardList, Globe, HeartHandshake,
  Home, Briefcase, Wifi, Settings, Car,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ServicesPage() {
  const { t } = useI18n();
  const { hash } = useLocation();

  useEffect(() => { document.title = "Services — NEXI-US Digital Hub"; }, []);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const timer = setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  const mainServices = [
    {
      Icon: Search, key: "services.seo", id: "seo",
      overview: t("services.seoDesc"),
      process: [t("services.seo.process.1"), t("services.seo.process.2"), t("services.seo.process.3"), t("services.seo.process.4")],
      benefits: [t("services.seo.benefits.1"), t("services.seo.benefits.2"), t("services.seo.benefits.3")],
    },
    {
      Icon: Megaphone, key: "services.smm", id: "smm",
      overview: t("services.smmDesc"),
      process: [t("services.smm.process.1"), t("services.smm.process.2"), t("services.smm.process.3"), t("services.smm.process.4")],
      benefits: [t("services.smm.benefits.1"), t("services.smm.benefits.2"), t("services.smm.benefits.3")],
    },
    {
      Icon: BarChart3, key: "services.ads", id: "ads",
      overview: t("services.adsDesc"),
      process: [t("services.ads.process.1"), t("services.ads.process.2"), t("services.ads.process.3"), t("services.ads.process.4")],
      benefits: [t("services.ads.benefits.1"), t("services.ads.benefits.2"), t("services.ads.benefits.3")],
    },
    {
      Icon: Code2, key: "services.soft", id: "soft",
      overview: t("services.softDesc"),
      process: [t("services.soft.process.1"), t("services.soft.process.2"), t("services.soft.process.3"), t("services.soft.process.4")],
      benefits: [t("services.soft.benefits.1"), t("services.soft.benefits.2"), t("services.soft.benefits.3")],
    },
    {
      Icon: Headphones, key: "services.it", id: "it",
      overview: t("services.itDesc"),
      process: [t("services.it.process.1"), t("services.it.process.2"), t("services.it.process.3"), t("services.it.process.4")],
      benefits: [t("services.it.benefits.1"), t("services.it.benefits.2"), t("services.it.benefits.3")],
    },
  ];

  const otherServices = [
    {
      Icon: FileText, slug: "tax",
      name: t("services.other.tax" as any),
      desc: t("services.other.taxDesc" as any),
      process: ["services.other.tax.process.1","services.other.tax.process.2","services.other.tax.process.3","services.other.tax.process.4"],
      benefits: ["services.other.tax.benefits.1","services.other.tax.benefits.2","services.other.tax.benefits.3"],
    },
    {
      Icon: Stamp, slug: "notary",
      name: t("services.other.notary" as any),
      desc: t("services.other.notaryDesc" as any),
      process: ["services.other.notary.process.1","services.other.notary.process.2","services.other.notary.process.3","services.other.notary.process.4"],
      benefits: ["services.other.notary.benefits.1","services.other.notary.benefits.2","services.other.notary.benefits.3"],
    },
    {
      Icon: ClipboardList, slug: "docs",
      name: t("services.other.docs" as any),
      desc: t("services.other.docsDesc" as any),
      process: ["services.other.docs.process.1","services.other.docs.process.2","services.other.docs.process.3","services.other.docs.process.4"],
      benefits: ["services.other.docs.benefits.1","services.other.docs.benefits.2","services.other.docs.benefits.3"],
    },
    {
      Icon: Globe, slug: "immigration",
      name: t("services.other.immigration" as any),
      desc: t("services.other.immigrationDesc" as any),
      process: ["services.other.immigration.process.1","services.other.immigration.process.2","services.other.immigration.process.3","services.other.immigration.process.4"],
      benefits: ["services.other.immigration.benefits.1","services.other.immigration.benefits.2","services.other.immigration.benefits.3"],
    },
    {
      Icon: HeartHandshake, slug: "social",
      name: t("services.other.social" as any),
      desc: t("services.other.socialDesc" as any),
      process: ["services.other.social.process.1","services.other.social.process.2","services.other.social.process.3","services.other.social.process.4"],
      benefits: ["services.other.social.benefits.1","services.other.social.benefits.2","services.other.social.benefits.3"],
    },
    {
      Icon: Home, slug: "housing",
      name: t("services.other.housing" as any),
      desc: t("services.other.housingDesc" as any),
      process: ["services.other.housing.process.1","services.other.housing.process.2","services.other.housing.process.3","services.other.housing.process.4"],
      benefits: ["services.other.housing.benefits.1","services.other.housing.benefits.2","services.other.housing.benefits.3"],
    },
    {
      Icon: Briefcase, slug: "jobs",
      name: t("services.other.jobs" as any),
      desc: t("services.other.jobsDesc" as any),
      process: ["services.other.jobs.process.1","services.other.jobs.process.2","services.other.jobs.process.3","services.other.jobs.process.4"],
      benefits: ["services.other.jobs.benefits.1","services.other.jobs.benefits.2","services.other.jobs.benefits.3"],
    },
    {
      Icon: Wifi, slug: "utility",
      name: t("services.other.utility" as any),
      desc: t("services.other.utilityDesc" as any),
      process: ["services.other.utility.process.1","services.other.utility.process.2","services.other.utility.process.3","services.other.utility.process.4"],
      benefits: ["services.other.utility.benefits.1","services.other.utility.benefits.2","services.other.utility.benefits.3"],
    },
    {
      Icon: Settings, slug: "admin",
      name: t("services.other.admin" as any),
      desc: t("services.other.adminDesc" as any),
      process: ["services.other.admin.process.1","services.other.admin.process.2","services.other.admin.process.3","services.other.admin.process.4"],
      benefits: ["services.other.admin.benefits.1","services.other.admin.benefits.2","services.other.admin.benefits.3"],
    },
    {
      Icon: Car, slug: "dmv",
      name: t("services.other.dmv" as any),
      desc: t("services.other.dmvDesc" as any),
      process: ["services.other.dmv.process.1","services.other.dmv.process.2","services.other.dmv.process.3","services.other.dmv.process.4"],
      benefits: ["services.other.dmv.benefits.1","services.other.dmv.benefits.2","services.other.dmv.benefits.3"],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("services.kicker")}
        title={<HighlightText text={t("services.title")} />}
        sub={t("services.sub")}
      />

      {/* ── MAIN DIGITAL SERVICES ── */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[350px] w-[650px] rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 65%)" }} />
        <div className="container-x flex flex-col gap-5">
          {mainServices.map(({ Icon, key, id, overview, process, benefits }, i) => (
            <Reveal key={key} delay={i * 0.05}>
              <motion.article
                id={id}
                whileHover={{ y: -3 }}
                className="elevated-card group relative overflow-hidden rounded-3xl p-8 md:p-12 scroll-mt-28"
              >
                <div aria-hidden className="absolute -top-32 -right-20 h-[380px] w-[380px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.3), transparent 60%)", filter: "blur(30px)" }} />
                <div className="relative grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{t(key)}</h2>
                    <p className="mt-4 text-muted-foreground">{overview}</p>
                    <div className="mt-6">
                      <MagneticLink to="/get-a-quote" variant="primary" className="!py-2.5 !px-5 text-xs">
                        {t("services.requestQuote")} <ArrowRight className="w-3.5 h-3.5" />
                      </MagneticLink>
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">{t("services.process")}</div>
                    <ul className="space-y-2.5 text-sm">
                      {process.map((p, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-foreground/85">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">{t("services.benefits")}</div>
                    <ul className="space-y-2.5 text-sm">
                      {benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/85">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── OTHER SERVICES ── */}
      <section className="relative py-14 md:py-20 overflow-hidden section-alt">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-[400px] w-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.12), transparent 70%)" }} />

        <div className="container-x">
          <Reveal>
            <div className="mb-12">
              <div className="text-xs uppercase tracking-[0.22em] text-primary mb-3">{t("services.other.label" as any)}</div>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-display font-semibold leading-tight tracking-tight max-w-2xl">
                <HighlightText text={t("services.other.sectionTitle" as any)} />
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed">
                {t("services.other.sectionSub" as any)}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {otherServices.map(({ Icon, slug, name, desc, process, benefits }, i) => (
              <Reveal key={slug} delay={i * 0.04}>
                <motion.article
                  id={`other-${slug}`}
                  whileHover={{ y: -2 }}
                  className="elevated-card group relative overflow-hidden rounded-3xl p-7 md:p-8 scroll-mt-28 flex flex-col gap-6"
                >
                  <div aria-hidden className="absolute -top-16 -right-10 h-[200px] w-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.2), transparent 65%)", filter: "blur(24px)" }} />

                  {/* Header */}
                  <div className="relative flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold tracking-tight leading-snug">{name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  {/* Process + Benefits */}
                  <div className="relative grid grid-cols-2 gap-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">{t("services.other.process" as any)}</div>
                      <ul className="space-y-2 text-xs">
                        {process.map((pk, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-foreground/80">{t(pk as any)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">{t("services.other.benefits" as any)}</div>
                      <ul className="space-y-2 text-xs">
                        {benefits.map((bk, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <span className="text-foreground/80">{t(bk as any)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="relative pt-1">
                    <MagneticLink to="/book-appointment" variant="outline" className="!py-2 !px-4 text-xs">
                      {t("services.other.cta" as any)} <ArrowRight className="w-3.5 h-3.5" />
                    </MagneticLink>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
