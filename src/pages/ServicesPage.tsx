import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { MagneticLink } from "@/components/site/MagneticButton";
import { Search, Megaphone, BarChart3, Code2, ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { HighlightText } from "@/components/site/HighlightText";

export default function ServicesPage() {
  const { t } = useI18n();
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Services — NEXI-US Digital Hub";
  }, []);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  const services = [
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
  ];

  return (
    <>
      <PageHero
        eyebrow={t("services.kicker")}
        title={<HighlightText text={t("services.title")} />}
        sub={t("services.sub")}
      />

      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-[350px] w-[650px] rounded-full opacity-50" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 65%)" }} />
        <div className="container-x flex flex-col gap-5">
          {services.map(({ Icon, key, id, overview, process, benefits }, i) => (
            <Reveal key={key} delay={i * 0.05}>
              <motion.article
                id={id}
                whileHover={{ y: -3 }}
                className="elevated-card group relative overflow-hidden rounded-3xl p-8 md:p-12 scroll-mt-28"
              >
                <div aria-hidden className="absolute -top-32 -right-20 h-[380px] w-[380px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.3), transparent 60%)", filter: "blur(30px)" }} />
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
    </>
  );
}
