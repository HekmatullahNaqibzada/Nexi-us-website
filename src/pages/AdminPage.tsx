import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, LogOut, Mail, Phone, Building2, Search, Filter, Loader2, MessageSquare, FileText, Globe, Trash2, Eye, X } from "lucide-react";

type Appointment = {
  id: string; name: string; email: string; phone: string | null;
  company: string | null; service: string; message: string | null;
  requested_date: string; requested_time: string; status: string; created_at: string;
};

type Contact = {
  id: string; name: string; email: string;
  company: string | null; message: string | null; created_at: string;
};

type Quote = {
  id: string; name: string; email: string;
  company: string | null; website: string | null;
  service: string; budget: string; timeline: string;
  notes: string | null; status: string; created_at: string;
};

type ViewState =
  | { kind: "appointment"; item: Appointment }
  | { kind: "contact"; item: Contact }
  | { kind: "quote"; item: Quote };

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}

function ViewModal({ viewing, onClose }: { viewing: ViewState; onClose: () => void }) {
  const { kind, item } = viewing;
  const title = { appointment: "Appointment", contact: "Contact", quote: "Quote Request" }[kind];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-background elevated-card w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold">{title} — {item.name}</h3>
          <button onClick={onClose} className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-6">
          {kind === "appointment" && (
            <>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <DetailRow label="Name" value={item.name} />
                <DetailRow label="Email" value={item.email} />
                {item.phone && <DetailRow label="Phone" value={item.phone} />}
                {item.company && <DetailRow label="Company" value={item.company} />}
                <DetailRow label="Service" value={item.service} />
                <DetailRow label="Date / Time" value={`${item.requested_date} · ${item.requested_time}`} />
                <DetailRow label="Status" value={item.status} />
                <DetailRow label="Submitted" value={new Date(item.created_at).toLocaleString()} />
              </div>
              {item.message && (
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Message</div>
                  <div className="text-sm bg-foreground/[0.02] rounded-2xl p-4 border border-foreground/10 whitespace-pre-wrap">{item.message}</div>
                </div>
              )}
            </>
          )}
          {kind === "contact" && (
            <>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <DetailRow label="Name" value={item.name} />
                <DetailRow label="Email" value={item.email} />
                {item.company && <DetailRow label="Company" value={item.company} />}
                <DetailRow label="Submitted" value={new Date(item.created_at).toLocaleString()} />
              </div>
              {item.message && (
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Message</div>
                  <div className="text-sm bg-foreground/[0.02] rounded-2xl p-4 border border-foreground/10 whitespace-pre-wrap">{item.message}</div>
                </div>
              )}
            </>
          )}
          {kind === "quote" && (
            <>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <DetailRow label="Name" value={item.name} />
                <DetailRow label="Email" value={item.email} />
                {item.company && <DetailRow label="Company" value={item.company} />}
                {item.website && <DetailRow label="Website" value={item.website} />}
                <DetailRow label="Service" value={item.service} />
                <DetailRow label="Budget" value={item.budget} />
                <DetailRow label="Timeline" value={item.timeline} />
                <DetailRow label="Status" value={item.status} />
                <DetailRow label="Submitted" value={new Date(item.created_at).toLocaleString()} />
              </div>
              {item.notes && (
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Notes</div>
                  <div className="text-sm bg-foreground/[0.02] rounded-2xl p-4 border border-foreground/10 whitespace-pre-wrap">{item.notes}</div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <button onClick={onClose} className="rounded-full bg-foreground/10 px-5 py-2.5 text-sm font-medium hover:bg-foreground/20 transition">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<"appointments" | "contacts" | "quotes">("appointments");

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [apptLoading, setApptLoading] = useState(true);
  const [apptQuery, setApptQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactQuery, setContactQuery] = useState("");

  // Quotes state
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteQuery, setQuoteQuery] = useState("");

  // Modal state
  const [viewing, setViewing] = useState<ViewState | null>(null);

  useEffect(() => { document.title = "Admin Dashboard — NEXI-US"; }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      const { data: roleData } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
      if (!mounted) return;
      if (!roleData) { await supabase.auth.signOut(); navigate("/auth"); return; }
      setAuthorized(true);
      setChecking(false);
      loadAppointments();
      loadContacts();
      loadQuotes();
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const loadAppointments = async () => {
    setApptLoading(true);
    const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (!error && data) setAppointments(data as Appointment[]);
    setApptLoading(false);
  };

  const loadContacts = async () => {
    setContactLoading(true);
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (!error && data) setContacts(data as Contact[]);
    setContactLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const loadQuotes = async () => {
    setQuoteLoading(true);
    const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false });
    if (!error && data) setQuotes(data as Quote[]);
    setQuoteLoading(false);
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    await supabase.from("quotes").update({ status }).eq("id", id);
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm("Delete this appointment? This action cannot be undone.")) return;
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const deleteContact = async (id: string) => {
    if (!window.confirm("Delete this contact submission? This action cannot be undone.")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteQuote = async (id: string) => {
    if (!window.confirm("Delete this quote request? This action cannot be undone.")) return;
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };

  const filteredAppts = useMemo(() => appointments.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (!apptQuery) return true;
    const q = apptQuery.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q) || (a.company ?? "").toLowerCase().includes(q);
  }), [appointments, apptQuery, statusFilter]);

  const filteredContacts = useMemo(() => contacts.filter((c) => {
    if (!contactQuery) return true;
    const q = contactQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) ||
      (c.company ?? "").toLowerCase().includes(q) || (c.message ?? "").toLowerCase().includes(q);
  }), [contacts, contactQuery]);

  const filteredQuotes = useMemo(() => quotes.filter((q) => {
    if (!quoteQuery) return true;
    const qq = quoteQuery.toLowerCase();
    return q.name.toLowerCase().includes(qq) || q.email.toLowerCase().includes(qq) ||
      (q.company ?? "").toLowerCase().includes(qq) || q.service.toLowerCase().includes(qq);
  }), [quotes, quoteQuery]);

  const counts = useMemo(() => {
    const c = { all: appointments.length, pending: 0, confirmed: 0, completed: 0, cancelled: 0 } as Record<string, number>;
    appointments.forEach((a) => { c[a.status] = (c[a.status] ?? 0) + 1; });
    return c;
  }, [appointments]);

  if (checking) return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  if (!authorized) return null;

  return (
    <section className="pt-24 pb-14 md:pt-28 md:pb-20">
      {viewing && <ViewModal viewing={viewing} onClose={() => setViewing(null)} />}
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Admin Dashboard</div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">NEXI-US</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage appointments, contact submissions, and quote requests.</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm hover:bg-foreground/5">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("appointments")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${tab === "appointments" ? "bg-primary text-primary-foreground" : "border border-foreground/10 hover:bg-foreground/5"}`}
          >
            <CalendarDays className="w-4 h-4" /> Appointments
            <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{appointments.length}</span>
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${tab === "contacts" ? "bg-primary text-primary-foreground" : "border border-foreground/10 hover:bg-foreground/5"}`}
          >
            <MessageSquare className="w-4 h-4" /> Contact Forms
            <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{contacts.length}</span>
          </button>
          <button
            onClick={() => setTab("quotes")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${tab === "quotes" ? "bg-primary text-primary-foreground" : "border border-foreground/10 hover:bg-foreground/5"}`}
          >
            <FileText className="w-4 h-4" /> Quote Requests
            <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{quotes.length}</span>
          </button>
        </div>

        {/* ── APPOINTMENTS TAB ── */}
        {tab === "appointments" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
              {[{ k: "all", l: "Total" }, { k: "pending", l: "Pending" }, { k: "confirmed", l: "Confirmed" }, { k: "completed", l: "Completed" }, { k: "cancelled", l: "Cancelled" }].map((s) => (
                <button key={s.k} onClick={() => setStatusFilter(s.k)}
                  className={`elevated-card text-left rounded-2xl p-4 transition ${statusFilter === s.k ? "border-primary bg-primary/5" : ""}`}>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
                  <div className="mt-1 text-2xl font-display font-semibold">{counts[s.k] ?? 0}</div>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={apptQuery} onChange={(e) => setApptQuery(e.target.value)}
                  placeholder="Search by name, email, company, service…"
                  className="w-full rounded-full border border-foreground/10 bg-foreground/[0.02] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary/60" />
              </div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> {filteredAppts.length} of {appointments.length}
              </div>
            </div>
            <div className="elevated-card rounded-3xl overflow-hidden">
              {apptLoading ? (
                <div className="p-12 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
              ) : filteredAppts.length === 0 ? (
                <div className="p-12 text-center text-sm text-muted-foreground">No appointments yet.</div>
              ) : (
                <div className="divide-y divide-foreground/5">
                  {filteredAppts.map((a) => (
                    <div key={a.id} className="p-5 md:p-6 hover:bg-foreground/[0.02] transition">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-semibold">{a.name}</h3>
                            <StatusBadge status={a.status} />
                            <span className="text-xs text-muted-foreground">· {a.service}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-primary" /> {a.requested_date} · {a.requested_time}</span>
                            <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="w-3.5 h-3.5" /> {a.email}</a>
                            {a.phone && <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Phone className="w-3.5 h-3.5" /> {a.phone}</a>}
                            {a.company && <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {a.company}</span>}
                          </div>
                          {a.message && (
                            <>
                              <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{a.message}</p>
                              <button onClick={() => setViewing({ kind: "appointment", item: a })}
                                className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition">
                                <Eye className="w-3.5 h-3.5" /> View full message
                              </button>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)}
                            className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1.5 text-xs outline-none focus:border-primary/60">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => deleteAppointment(a.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── CONTACTS TAB ── */}
        {tab === "contacts" && (
          <>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={contactQuery} onChange={(e) => setContactQuery(e.target.value)}
                  placeholder="Search by name, email, company, message…"
                  className="w-full rounded-full border border-foreground/10 bg-foreground/[0.02] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary/60" />
              </div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> {filteredContacts.length} of {contacts.length}
              </div>
            </div>
            <div className="elevated-card rounded-3xl overflow-hidden">
              {contactLoading ? (
                <div className="p-12 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-12 text-center text-sm text-muted-foreground">No contact submissions yet.</div>
              ) : (
                <div className="divide-y divide-foreground/5">
                  {filteredContacts.map((c) => (
                    <div key={c.id} className="p-5 md:p-6 hover:bg-foreground/[0.02] transition">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-semibold">{c.name}</h3>
                            {c.company && <span className="text-xs text-muted-foreground">· {c.company}</span>}
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="w-3.5 h-3.5" /> {c.email}</a>
                            <span>{new Date(c.created_at).toLocaleDateString()} · {new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          {c.message && (
                            <>
                              <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{c.message}</p>
                              <button onClick={() => setViewing({ kind: "contact", item: c })}
                                className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition">
                                <Eye className="w-3.5 h-3.5" /> View full message
                              </button>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <a href={`mailto:${c.email}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition">
                            <Mail className="w-3.5 h-3.5" /> Reply
                          </a>
                          <button onClick={() => deleteContact(c.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── QUOTES TAB ── */}
        {tab === "quotes" && (
          <>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={quoteQuery} onChange={(e) => setQuoteQuery(e.target.value)}
                  placeholder="Search by name, email, company, service…"
                  className="w-full rounded-full border border-foreground/10 bg-foreground/[0.02] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary/60" />
              </div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> {filteredQuotes.length} of {quotes.length}
              </div>
            </div>
            <div className="elevated-card rounded-3xl overflow-hidden">
              {quoteLoading ? (
                <div className="p-12 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
              ) : filteredQuotes.length === 0 ? (
                <div className="p-12 text-center text-sm text-muted-foreground">No quote requests yet.</div>
              ) : (
                <div className="divide-y divide-foreground/5">
                  {filteredQuotes.map((q) => (
                    <div key={q.id} className="p-5 md:p-6 hover:bg-foreground/[0.02] transition">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-semibold">{q.name}</h3>
                            <StatusBadge status={q.status} />
                            <span className="text-xs text-muted-foreground">· {q.service}</span>
                            <span className="text-xs text-muted-foreground">· {q.budget}</span>
                            {q.timeline !== "ASAP" && <span className="text-xs text-muted-foreground">· {q.timeline}</span>}
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                            <a href={`mailto:${q.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="w-3.5 h-3.5" /> {q.email}</a>
                            {q.company && <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {q.company}</span>}
                            {q.website && <span className="inline-flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {q.website}</span>}
                            <span>{new Date(q.created_at).toLocaleDateString()} · {new Date(q.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          {q.notes && (
                            <>
                              <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{q.notes}</p>
                              <button onClick={() => setViewing({ kind: "quote", item: q })}
                                className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition">
                                <Eye className="w-3.5 h-3.5" /> View full notes
                              </button>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <a href={`mailto:${q.email}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition">
                            <Mail className="w-3.5 h-3.5" /> Reply
                          </a>
                          <select value={q.status} onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                            className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1.5 text-xs outline-none focus:border-primary/60">
                            <option value="new">New</option>
                            <option value="pending">Pending</option>
                            <option value="responded">Responded</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button onClick={() => deleteQuote(q.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    pending: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    confirmed: "bg-primary/10 text-primary border-primary/30",
    responded: "bg-primary/10 text-primary border-primary/30",
    completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    closed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-300 border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${styles[status] ?? "border-foreground/10 text-muted-foreground"}`}>
      {status}
    </span>
  );
}
