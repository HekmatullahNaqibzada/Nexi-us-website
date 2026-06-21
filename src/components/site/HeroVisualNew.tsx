import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import darkLogo from "@/assets/nexi-logo-dark.png";
import whiteLogo from "@/assets/nexi-logo-whiite.png";

// Particle positions around the logo (viewBox 500x500, center 250,250)
const PARTICLES = [
  { x: 75,  y: 90,  delay: 0 },
  { x: 430, y: 80,  delay: 0.6 },
  { x: 55,  y: 270, delay: 1.1 },
  { x: 455, y: 250, delay: 0.3 },
  { x: 170, y: 35,  delay: 0.8 },
  { x: 340, y: 460, delay: 0.4 },
  { x: 65,  y: 420, delay: 1.5 },
  { x: 440, y: 390, delay: 0.9 },
  { x: 260, y: 480, delay: 1.3 },
  { x: 100, y: 175, delay: 0.2 },
  { x: 400, y: 155, delay: 0.7 },
  { x: 340, y: 65,  delay: 1.0 },
];

// Connection line pairs between particles (indices)
const LINES = [
  [0, 4], [4, 11], [11, 1], [1, 10], [10, 3],
  [3, 7], [7, 5],  [5, 8],  [8, 6],  [6, 2],
  [2, 9], [9, 0],  [4, 9],  [10, 7], [1, 3],
];

export function HeroVisual() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const logoSrc = isDark ? whiteLogo : darkLogo;

  // Use raw hex/rgba for SVG attributes (oklch not universally supported in SVG)
  const P  = isDark ? "rgba(14,188,189,1)"    : "rgba(5,120,121,1)";
  const PD = isDark ? "rgba(14,188,189,0.4)"  : "rgba(5,120,121,0.5)";
  const PF = isDark ? "rgba(14,188,189,0.14)" : "rgba(5,120,121,0.18)";
  const GL = isDark ? "rgba(14,188,189,0.22)" : "rgba(5,120,121,0.16)";

  return (
    <div className="relative flex justify-center items-center select-none">
      {/* Wide ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(14,188,189,0.12) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(5,120,121,0.08) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      <div className="relative w-full max-w-[480px] md:max-w-[540px] aspect-square mx-auto">

        {/* ── SVG layer: rings, particles, lines ── */}
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="logoHubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={isDark ? "rgba(14,188,189,0.35)" : "rgba(5,120,121,0.3)"} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Outer ring — very slow CW ── */}
          <circle
            cx="250" cy="250" r="220"
            stroke={PF} strokeWidth="0.6" strokeDasharray="2 18"
            style={{ animation: "spin 90s linear infinite", transformOrigin: "250px 250px" }}
          />

          {/* ── Mid ring — slower CCW ── */}
          <circle
            cx="250" cy="250" r="168"
            stroke={PD} strokeWidth="0.7" strokeDasharray="1 12"
            style={{ animation: "spin 55s linear infinite reverse", transformOrigin: "250px 250px" }}
          />

          {/* ── Inner ring — CW ── */}
          <circle
            cx="250" cy="250" r="112"
            stroke={PD} strokeWidth="0.8" strokeDasharray="4 24"
            style={{ animation: "spin 35s linear infinite", transformOrigin: "250px 250px" }}
          />

          {/* ── Pulsing hub glow ── */}
          <circle cx="250" cy="250" r="80" fill="url(#logoHubGrad)" className="animate-pulse" />

          {/* ── Hub border ── */}
          <circle cx="250" cy="250" r="78" stroke={PD} strokeWidth="1" />

          {/* ── Particle network lines ── */}
          {LINES.map(([a, b], i) => {
            const pa = PARTICLES[a];
            const pb = PARTICLES[b];
            if (!pa || !pb) return null;
            return (
              <line
                key={`l${i}`}
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={PF} strokeWidth="0.5"
              />
            );
          })}

          {/* ── Lines from center to each particle ── */}
          {PARTICLES.map((p, i) => (
            <line
              key={`cl${i}`}
              x1={250} y1={250} x2={p.x} y2={p.y}
              stroke={PF} strokeWidth="0.4"
            />
          ))}

          {/* ── Particles ── */}
          {PARTICLES.map((p, i) => (
            <g key={`p${i}`}>
              {/* Halo */}
              <circle cx={p.x} cy={p.y} r="6" fill={GL} />
              {/* Core dot */}
              <circle
                cx={p.x} cy={p.y} r="2"
                fill={P}
                filter="url(#glow)"
                style={{ animation: `signal-pulse 3s ${p.delay}s infinite` }}
              />
            </g>
          ))}

          {/* ── Orbiting accent dot on mid ring ── */}
          <circle r="3.5" fill={P} filter="url(#glow)">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M 250 82 A 168 168 0 1 1 249.99 82"
            />
          </circle>
          <circle r="2.5" fill={PD} filter="url(#glow)">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              begin="-9s"
              path="M 250 82 A 168 168 0 1 0 249.99 82"
            />
          </circle>
        </svg>

        {/* ── Logo centered over SVG ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            <img
              src={logoSrc}
              alt="NEXI-US"
              draggable={false}
              className="relative z-10 h-20 md:h-24 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* ── Floating stats cards ── */}
        <div className="absolute -top-6 -right-4 md:-right-6 animate-parallax z-20">
          <div className="bg-[color:var(--surface)]/85 backdrop-blur-xl border border-foreground/10 p-4 md:p-5 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] min-w-[168px]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">{t("hero.card1.label")}</span>
            </div>
            <div className="text-foreground text-lg md:text-xl font-display font-bold tracking-tight mt-1">{t("hero.card1.value")}</div>
            <div className="mt-3 h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-glow w-3/4" />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 left-0 md:-left-6 animate-parallax-delayed z-20">
          <div className="bg-[color:var(--surface)]/85 backdrop-blur-xl border border-foreground/10 p-4 md:p-5 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] min-w-[168px]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">{t("hero.card2.label")}</span>
            </div>
            <div className="text-foreground text-lg md:text-xl font-display font-bold tracking-tight mt-1">{t("hero.card2.value")}</div>
            <div className="text-muted-foreground text-[10px] mt-1">{t("hero.card2.sub")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
