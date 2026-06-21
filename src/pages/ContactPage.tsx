import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/PageHero";
import { Mail, Phone, MapPin, ArrowRight, Check, CalendarCheck, Loader2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    document.title = "Contact — NEXI-US Digital Hub";
  }, []);

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        compact
        title={<>{t("contact.title1")} <span className="text-gradient">{t("contact.titleHighlight")}</span>.</>}
        sub={t("contact.sub")}
        rightSlot={
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center w-full max-w-sm"
          >
            {/* Live indicator badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">Available Now</span>
            </motion.div>

            {/* Animated ring + calendar icon */}
            <div className="relative flex items-center justify-center mb-8">
              {/* Outer slow-pulse glow ring */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.38, 0.18] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute rounded-full"
                style={{ width: 200, height: 200, background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.35), transparent 70%)" }}
              />
              {/* Middle ring */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute rounded-full border border-primary/30"
                style={{ width: 148, height: 148 }}
              />
              {/* Inner ring */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute rounded-full border border-primary/50"
                style={{ width: 106, height: 106 }}
              />
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute"
                style={{ width: 148, height: 148 }}
              >
                <div
                  className="absolute rounded-full bg-primary shadow-[0_0_8px_3px_oklch(0.78_0.13_195/0.6)]"
                  style={{ width: 8, height: 8, top: -4, left: "50%", transform: "translateX(-50%)" }}
                />
              </motion.div>
              {/* Center icon */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-[0_12px_40px_-8px_oklch(0.78_0.13_195/0.6)]"
              >
                <CalendarCheck className="w-9 h-9" />
              </motion.div>
            </div>

            {/* Label */}
            <div className="text-center mb-6">
              <div className="text-xl font-display font-semibold tracking-tight">Book a Visit</div>
              <div className="text-sm text-muted-foreground mt-1">Personalized in-person support</div>
            </div>

            {/* CTA button */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold shadow-[0_8px_28px_-6px_oklch(0.78_0.13_195/0.55)] hover:brightness-110 transition-all duration-200"
              >
                <CalendarCheck className="w-4 h-4" />
                {t("contact.visitCta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="text-[10px] text-muted-foreground mt-3 uppercase tracking-[0.18em]">free · no credit card required</div>
          </motion.div>
        }
      />

      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-1/4 h-[300px] w-[500px] rounded-full opacity-45" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 60%)" }} />
        <div className="container-x grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <Reveal>
              <div className="elevated-card rounded-3xl p-8 space-y-5">
                <Info Icon={Mail} label={t("contactPreview.email")} value="info@nexi-us.com" />
                <div className="hairline" />
                <Info Icon={Phone} label={t("contactPreview.phone")} value="(310) 906-0360" />
                <div className="hairline" />
                <Info Icon={MapPin} label={t("contactPreview.office")} value="2180 Harvard St, Suite 100, Office 122, Sacramento, CA 95815" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="elevated-card rounded-3xl overflow-hidden" style={{ height: 280 }}>
                <iframe
                  title="NEXI-US Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.6!2d-121.4208!3d38.5882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ad0aa2b33ce2f%3A0x4b17a2a3b8b2e6c5!2s2180%20Harvard%20St%2C%20Sacramento%2C%20CA%2095815!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="elevated-card rounded-2xl px-6 py-5 flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("contact.hq")}</div>
                  <div className="mt-0.5 text-sm font-medium">{t("contact.hqValue")}</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setSubmitError(null);
                  const { error } = await supabase.from("contacts").insert({
                    name: form.name,
                    email: form.email,
                    company: form.company || null,
                    message: form.message || null,
                  });
                  setSubmitting(false);
                  if (error) { setSubmitError(error.message); return; }
                  setSent(true);
                }}
                className="elevated-card rounded-3xl p-6 md:p-10 space-y-5"
              >
                {sent ? (
                  <div className="py-16 text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground mb-5"><Check className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-display font-semibold">{t("contact.form.sent")}</h3>
                    <p className="mt-2 text-muted-foreground">{t("contact.form.sentSub")} {form.email}.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label={t("contact.form.name")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                      <Field label={t("contact.form.email")} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    </div>
                    <Field label={t("contact.form.company")} value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("contact.form.message")}</label>
                      <textarea
                        rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t("contact.form.placeholder")}
                        className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition resize-none"
                      />
                    </div>
                    {submitError && <p className="text-sm text-red-400">{submitError}</p>}
                    <div className="pt-2">
                      <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:brightness-110 transition disabled:opacity-50">
                        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>{t("contact.form.send")} <ArrowRight className="w-4 h-4" /></>}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ Icon, label, value }: { Icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0"><Icon className="w-4 h-4" /></div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-base text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition" />
    </div>
  );
}
