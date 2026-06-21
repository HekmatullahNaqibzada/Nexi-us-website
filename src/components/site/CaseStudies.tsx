import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

const studies = [
  {
    title: "Helios Finance",
    tag: "Software · Web Platform",
    desc: "A modern web platform that streamlined operations and increased user engagement by 214%.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Atlas Retail",
    tag: "SEO · Growth",
    desc: "Organic growth strategy that doubled search traffic within six months.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=900&q=80",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    title: "NorthLake Health",
    tag: "Brand · Web",
    desc: "Digital presence and patient experience redesign for a regional healthcare group.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    span: "md:col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Vector Studio",
    tag: "PPC · Strategy",
    desc: "Performance marketing system that reduced CAC by 40% and scaled revenue.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
];

export function CaseStudies() {
  const { t } = useI18n();

  return (
    <section className="py-14 md:py-20">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("work.kicker")}</div>
              <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-display font-semibold leading-tight tracking-tight">
                {t("work.title")}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-sm text-muted-foreground">{t("services.sub")}</span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {studies.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className={c.span}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl elevated-card cursor-pointer"
              >
                <div className={`relative ${c.aspect} overflow-hidden`}>
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white/90 border border-white/10">
                      {c.tag}
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">{c.title}</h3>
                        <p className="mt-1 max-w-md text-sm text-white/75 line-clamp-2">{c.desc}</p>
                      </div>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-black transition">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
