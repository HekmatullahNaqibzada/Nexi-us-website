import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import {
  Check, ArrowLeft, ArrowRight, Loader2,
  Search, Megaphone, BarChart3, Code2,
  FileText, Stamp, ClipboardList, Globe, HeartHandshake,
  Home, Briefcase, Wifi, Settings, Car,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k – $150k", "$150k+"];

export default function GetAQuotePage() {
  const { t } = useI18n();
  const MAIN_SERVICES = [
    { id: "seo",  label: t("services.seo"),  Icon: Search },
    { id: "smm",  label: t("services.smm"),  Icon: Megaphone },
    { id: "ads",  label: t("services.ads"),  Icon: BarChart3 },
    { id: "soft", label: t("services.soft"), Icon: Code2 },
  ];
  const OTHER_SERVICES = [
    { id: "tax",         label: t("services.other.tax" as any),         Icon: FileText },
    { id: "notary",      label: t("services.other.notary" as any),      Icon: Stamp },
    { id: "docs",        label: t("services.other.docs" as any),        Icon: ClipboardList },
    { id: "immigration", label: t("services.other.immigration" as any), Icon: Globe },
    { id: "social",      label: t("services.other.social" as any),      Icon: HeartHandshake },
    { id: "housing",     label: t("services.other.housing" as any),     Icon: Home },
    { id: "jobs",        label: t("services.other.jobs" as any),        Icon: Briefcase },
    { id: "utility",     label: t("services.other.utility" as any),     Icon: Wifi },
    { id: "admin",       label: t("services.other.admin" as any),       Icon: Settings },
    { id: "dmv",         label: t("services.other.dmv" as any),         Icon: Car },
  ];
  const ALL_SERVICES = [...MAIN_SERVICES, ...OTHER_SERVICES];

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState({
    service: "",
    company: "", website: "", name: "", email: "",
    budget: "", timeline: "ASAP", notes: "",
  });

  useEffect(() => {
    document.title = "Get a Quote — NEXI-US Digital Hub";
  }, []);

  const steps = [t("quote.step.service"), t("quote.step.business"), t("quote.step.budget"), t("quote.step.summary")];
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from("quotes").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      website: data.website || null,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      notes: data.notes || null,
      status: "new",
    });
    setSubmitting(false);
    if (error) { setSubmitError(error.message); return; }
    setDone(true);
  };

  const canNext =
    (step === 0 && data.service) ||
    (step === 1 && data.company && data.name && data.email) ||
    (step === 2 && data.budget) ||
    step === 3;

  return (
    <>
      <PageHero
        eyebrow={t("quote.eyebrow")}
        title={<>{t("quote.title1")} <span className="text-gradient">{t("quote.titleHighlight")}</span>.</>}
        sub={t("quote.sub")}
      />

      <section className="relative py-14 md:py-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-1/3 h-[300px] w-[480px] rounded-full opacity-40" style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 60%)" }} />
        <div className="container-x max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-9 w-9 inline-flex items-center justify-center rounded-full border text-xs font-semibold transition ${
                  i < step ? "bg-primary border-primary text-primary-foreground" :
                  i === step ? "border-primary text-primary" :
                  "border-foreground/10 text-muted-foreground"
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-foreground/10 relative overflow-hidden">
                    <motion.div initial={false} animate={{ scaleX: i < step ? 1 : 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 origin-left bg-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="elevated-card rounded-3xl p-6 md:p-10 min-h-[420px]">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-6"><Check className="w-7 h-7" /></div>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{t("quote.doneTitle")}</h2>
                  <p className="mt-4 text-muted-foreground max-w-md mx-auto">{t("quote.doneSub").replace("{email}", data.email)}</p>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                  {step === 0 && (
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-1">{t("quote.q1.title")}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{t("quote.q1.sub")}</p>
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">{t("services.kicker")}</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {MAIN_SERVICES.map(({ id, label, Icon }) => (
                              <button key={id} type="button" onClick={() => setData({ ...data, service: id })}
                                className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                                  data.service === id ? "border-primary bg-primary/10" : "border-foreground/10 hover:border-primary/40"
                                }`}>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="w-4 h-4" /></span>
                                <span className="text-sm font-medium">{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">{t("services.other.label" as any)}</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {OTHER_SERVICES.map(({ id, label, Icon }) => (
                              <button key={id} type="button" onClick={() => setData({ ...data, service: id })}
                                className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                                  data.service === id ? "border-primary bg-primary/10" : "border-foreground/10 hover:border-primary/40"
                                }`}>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="w-4 h-4" /></span>
                                <span className="text-sm font-medium">{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-1">{t("quote.q2.title")}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{t("quote.q2.sub")}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label={t("quote.q2.companyField")} value={data.company} onChange={(v) => setData({ ...data, company: v })} required />
                        <Field label={t("quote.q2.website")} value={data.website} onChange={(v) => setData({ ...data, website: v })} placeholder="company.com" />
                        <Field label={t("quote.q2.name")} value={data.name} onChange={(v) => setData({ ...data, name: v })} required />
                        <Field label={t("quote.q2.email")} type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} required />
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-1">{t("quote.q3.title")}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{t("quote.q3.sub")}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {BUDGETS.map((b) => (
                          <button key={b} type="button" onClick={() => setData({ ...data, budget: b })}
                            className={`rounded-xl border py-3 text-sm transition ${data.budget === b ? "border-primary bg-primary/10 text-primary" : "border-foreground/10 hover:border-primary/40"}`}>
                            {b}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6">
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("quote.q3.notes")}</label>
                        <textarea
                          value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })}
                          rows={4}
                          className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition resize-none"
                          placeholder={t("quote.q3.notesPlaceholder")}
                        />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">{t("quote.q4.title")}</h3>
                      <dl className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <Row k={t("quote.step.service")} v={ALL_SERVICES.find((s) => s.id === data.service)?.label || "-"} />
                        <Row k={t("quote.step.budget")} v={data.budget || "-"} />
                        <Row k={t("quote.q2.companyField")} v={data.company} />
                        <Row k={t("quote.q2.website")} v={data.website || "-"} />
                        <Row k={t("quote.q2.name")} v={data.name} />
                        <Row k={t("quote.q2.email")} v={data.email} />
                        <Row k={t("quote.q3.notes")} v={data.notes || "-"} full />
                      </dl>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && (
              <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {submitError}
              </div>
            )}

            {!done && (
              <div className="mt-8 flex items-center justify-between border-t border-foreground/5 pt-6">
                <button onClick={prev} disabled={step === 0 || submitting} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ArrowLeft className="w-4 h-4" /> {t("quote.back")}
                </button>
                {step < 3 ? (
                  <button onClick={next} disabled={!canNext || submitting} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium disabled:opacity-40">
                    {t("quote.continue")} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={submit} disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium disabled:opacity-40">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{t("quote.submit")} <Check className="w-4 h-4" /></>}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</label>
      <input type={type} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition" />
    </div>
  );
}

function Row({ k, v, full }: { k: string; v: string; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
      <dd className="mt-1 text-foreground">{v}</dd>
    </div>
  );
}
