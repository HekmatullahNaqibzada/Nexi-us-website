import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { MagneticLink } from "./MagneticButton";

const SLIDE_INTERVAL = 5500;

export function HeroSlider() {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = [
    {
      title: t("hero.title1"),
      sub: t("hero.slide1.sub"),
      cta: t("hero.cta1"),
      to: "/book-appointment",
    },
    {
      title: t("hero.title2"),
      sub: t("hero.slide2.sub"),
      cta: t("hero.cta2"),
      to: "/services",
    },
    {
      title: t("hero.title3"),
      sub: t("hero.slide3.sub"),
      cta: t("nav.quote"),
      to: "/get-a-quote",
    },
  ];

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const isRtl = lang !== "en";
  const rtlTitle = isRtl
    ? "text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[1.18] tracking-normal"
    : "text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight";
  const rtlSub = isRtl
    ? "text-[clamp(1rem,1.9vw,1.25rem)] leading-[1.9]"
    : "text-base md:text-lg leading-relaxed";

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] text-primary text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        {t("hero.eyebrow")}
      </motion.div>

      {/* Slide content */}
      <div className="relative mt-6 md:mt-8 min-h-[340px] md:min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <h1 className={`font-display font-bold text-foreground ${rtlTitle}`}>
              {index === 0 ? (
                <>
                  {slides[index].title.split(" ")[0]}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-primary">
                    {slides[index].title.split(" ").slice(1).join(" ")}
                  </span>
                </>
              ) : index === 2 ? (
                <span className="text-gradient">{slides[index].title}</span>
              ) : (
                slides[index].title
              )}
            </h1>

            <p className={`mt-4 md:mt-5 max-w-lg text-muted-foreground ${rtlSub}`}>
              {slides[index].sub}
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
              <MagneticLink to={slides[index].to} variant="primary">
                {slides[index].cta} <ArrowRight className="w-4 h-4" />
              </MagneticLink>
              <MagneticLink to="/contact" variant="outline">
                {t("contactPreview.cta")}
              </MagneticLink>
            </div>
            {index === 0 && (
              <p className="mt-4 text-xs text-muted-foreground">
                Based in Sacramento, CA.{" "}
                <a href="/book-appointment" className="text-primary underline underline-offset-2 hover:opacity-80 transition">
                  Book your visit today for personalized support
                </a>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls — always LTR so arrows never flip confusingly */}
      <div className="mt-8 md:mt-12 flex items-center gap-4" dir="ltr">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 hover:border-primary/40 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next slide"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5 hover:border-primary/40 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
