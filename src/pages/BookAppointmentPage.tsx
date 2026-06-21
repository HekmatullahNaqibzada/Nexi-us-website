import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

const SLOTS = ["09:00", "09:30", "10:00", "11:00", "13:00", "14:30", "15:30", "16:00", "16:30", "17:00"];

export default function BookAppointmentPage() {
  const { t } = useI18n();
  const SERVICES = [t("services.seo"), t("services.smm"), t("services.ads"), t("services.soft")];
  const today = new Date();

  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [service, setService] = useState<string>(SERVICES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Book Appointment — NEXI-US Digital Hub";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from("appointments").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      service,
      message: form.message || null,
      requested_date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      requested_time: slot,
    });
    setSubmitting(false);
    if (error) { setError(error.message); return; }
    setSubmitted(true);
  };

  const days = useMemo(() => {
    const first = new Date(month);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));
    return cells;
  }, [month]);

  const isPast = (d: Date | null) => {
    if (!d) return true;
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const monthLabel = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        eyebrow={t("book.eyebrow")}
        title={<>{t("book.title1")} <span className="text-gradient">{t("book.titleHighlight")}</span> {t("book.title2")}</>}
        sub={t("book.sub")}
      />

      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-20 left-1/3 h-[280px] w-[500px] rounded-full opacity-40" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 60%)" }} />
        <div className="container-x">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="elevated-card rounded-3xl border border-primary/30 p-10 md:p-14 text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-6">
                  <Check className="w-7 h-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{t("book.bookedTitle")}</h2>
                <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                  {t("book.bookedSubA")} <span className="text-foreground">{service}</span> {t("book.bookedSubB")}{" "}
                  <span className="text-foreground">{date?.toLocaleDateString()} · {slot}</span>. {t("book.bookedSubC")}{" "}
                  <span className="text-foreground">{form.email}</span>.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid lg:grid-cols-12 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-5 elevated-card rounded-3xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="font-display font-semibold text-lg">{monthLabel}</div>
                    <div className="flex gap-1">
                      <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5"><ChevronLeft className="w-4 h-4" /></button>
                      <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground/5"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-2">
                    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="text-center py-1">{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((d, i) => {
                      const disabled = isPast(d);
                      const selected = date && d && d.toDateString() === date.toDateString();
                      return (
                        <button
                          key={i}
                          disabled={!d || disabled}
                          onClick={() => d && setDate(d)}
                          className={`aspect-square rounded-xl text-sm transition ${
                            !d ? "" :
                            disabled ? "text-muted-foreground/40 cursor-not-allowed" :
                            selected ? "bg-primary text-primary-foreground font-semibold" :
                            "hover:bg-foreground/5 text-foreground"
                          }`}
                        >
                          {d?.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t("book.availableTimes")}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {SLOTS.map((s) => (
                        <button
                          key={s}
                          disabled={!date}
                          onClick={() => setSlot(s)}
                          className={`rounded-xl border py-2 text-xs transition ${
                            slot === s ? "border-primary bg-primary/10 text-primary" :
                            !date ? "border-foreground/5 text-muted-foreground/40 cursor-not-allowed" :
                            "border-foreground/10 hover:border-primary/50 text-foreground/85"
                          }`}
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-7 elevated-card rounded-3xl p-6 md:p-10 space-y-5"
                >
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("book.service")}</label>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s} type="button" onClick={() => setService(s)}
                          className={`rounded-xl border px-4 py-3 text-sm text-left transition ${
                            service === s ? "border-primary bg-primary/10 text-primary" : "border-foreground/10 hover:border-primary/40"
                          }`}
                        >{s}</button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label={t("book.fullName")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <Field label={t("book.email")} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    <Field label={t("book.phone")} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field label={t("book.company")} value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("book.message")}</label>
                    <textarea
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder={t("book.messagePlaceholder")}
                      className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={!date || !slot || !form.name || !form.email || submitting}
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4" /> {submitting ? t("book.sending") : t("book.confirm")}
                    </button>
                    <div className="text-xs text-muted-foreground">
                      {date && slot ? `${date.toLocaleDateString()} · ${slot} · ${service}` : t("book.selectPrompt")}
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</label>
      <input
        type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition"
      />
    </div>
  );
}
