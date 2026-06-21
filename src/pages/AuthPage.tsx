import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Lock, LogIn, KeyRound, Check } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password reset state
  const [isRecovery, setIsRecovery] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    document.title = "Admin Sign In — NEXI-US";
  }, []);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery") || hash.includes("type=email")) {
      setIsRecovery(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin");
    });

    // Also listen for auth state changes (Supabase sets session from hash automatically)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsRecovery(true);
      if (event === "SIGNED_IN" && !isRecovery) navigate("/admin");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    navigate("/admin");
  };

  const onResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setResetDone(true);
    setTimeout(() => navigate("/admin"), 1500);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <div className="elevated-card rounded-3xl p-8 md:p-10">

          {/* ── PASSWORD RESET MODE ── */}
          {isRecovery ? (
            resetDone ? (
              <div className="text-center py-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-display font-semibold">Password updated!</h2>
                <p className="mt-2 text-sm text-muted-foreground">Redirecting to admin…</p>
              </div>
            ) : (
              <>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">Set new password</h1>
                <p className="mt-2 text-sm text-muted-foreground">Choose a strong password you'll remember.</p>
                <form onSubmit={onResetPassword} className="mt-8 space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">New Password</label>
                    <input
                      type="password" required minLength={8} value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition"
                    />
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:brightness-110 transition disabled:opacity-50">
                    <KeyRound className="w-4 h-4" /> {loading ? "Saving…" : "Save new password"}
                  </button>
                </form>
              </>
            )
          ) : (
            /* ── NORMAL SIGN IN ── */
            <>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">Admin sign in</h1>
              <p className="mt-2 text-sm text-muted-foreground">Authorized personnel only.</p>
              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm outline-none focus:border-primary/60 transition" />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:brightness-110 transition disabled:opacity-50">
                  <LogIn className="w-4 h-4" /> {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
