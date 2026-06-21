import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, LogOut, Mail, Phone, Building2, Search, Filter, Loader2 } from "lucide-react";

type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  message: string | null;
  requested_date: string;
  requested_time: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Admin Dashboard — NEXI-US";
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      const { data: roleData } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!mounted) return;
      if (!roleData) {
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }
      setAuthorized(true);
      setChecking(false);
      await load();
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("requested_date", { ascending: false })
      .order("requested_time", { ascending: false });
    if (!error && data) setAppointments(data as Appointment[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        (a.company ?? "").toLowerCase().includes(q)
      );
    });
  }, [appointments, query, statusFilter]);

  const counts = useMemo(() => {
    const c = { all: appointments.length, pending: 0, confirmed: 0, completed: 0, cancelled: 0 } as Record<string, number>;
    appointments.forEach((a) => { c[a.status] = (c[a.status] ?? 0) + 1; });
    return c;
  }, [appointments]);

  if (checking) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Admin</div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">Appointments</h1>
            <p className="mt-2 text-sm text-muted-foreground">All booking requests submitted from the website.</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm hover:bg-foreground/5">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          {[
            { k: "all", l: "Total" },
            { k: "pending", l: "Pending" },
            { k: "confirmed", l: "Confirmed" },
            { k: "completed", l: "Completed" },
            { k: "cancelled", l: "Cancelled" },
          ].map((s) => (
            <button
              key={s.k}
              onClick={() => setStatusFilter(s.k)}
              className={`elevated-card text-left rounded-2xl p-4 transition ${
                statusFilter === s.k ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
              <div className="mt-1 text-2xl font-display font-semibold">{counts[s.k] ?? 0}</div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, company, service…"
              className="w-full rounded-full border border-foreground/10 bg-foreground/[0.02] pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> {filtered.length} of {appointments.length}
          </div>
        </div>

        {/* List */}
        <div className="elevated-card rounded-3xl overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">No appointments yet.</div>
          ) : (
            <div className="divide-y divide-foreground/5">
              {filtered.map((a) => (
                <div key={a.id} className="p-5 md:p-6 hover:bg-foreground/[0.02] transition">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-semibold">{a.name}</h3>
                        <StatusBadge status={a.status} />
                        <span className="text-xs text-muted-foreground">· {a.service}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-primary" /> {new Date(a.requested_date).toLocaleDateString()} · {a.requested_time}</span>
                        <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="w-3.5 h-3.5" /> {a.email}</a>
                        {a.phone && <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1.5 hover:text-foreground"><Phone className="w-3.5 h-3.5" /> {a.phone}</a>}
                        {a.company && <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {a.company}</span>}
                      </div>
                      {a.message && <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{a.message}</p>}
                    </div>
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1.5 text-xs outline-none focus:border-primary/60"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    confirmed: "bg-primary/10 text-primary border-primary/30",
    completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-300 border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${styles[status] ?? "border-foreground/10 text-muted-foreground"}`}>
      {status}
    </span>
  );
}
