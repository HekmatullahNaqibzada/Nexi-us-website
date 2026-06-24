import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";
import darkLogo from "@/assets/nexi-logo-dark.png";
import whiteLogo from "@/assets/nexi-logo-whiite.png";

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

const LINES: [number, number][] = [
  [0,4],[4,11],[11,1],[1,10],[10,3],
  [3,7],[7,5],[5,8],[8,6],[6,2],
  [2,9],[9,0],[4,9],[10,7],[1,3],
];

export function HeroVisual() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const logoSrc = isDark ? whiteLogo : darkLogo;

  const P  = isDark ? "rgba(14,188,189,1)"    : "rgba(5,140,145,1)";
  const PD = isDark ? "rgba(14,188,189,0.38)" : "rgba(5,140,145,0.82)";
  const PF = isDark ? "rgba(14,188,189,0.13)" : "rgba(5,140,145,0.48)";
  const GL = isDark ? "rgba(14,188,189,0.20)" : "rgba(5,140,145,0.32)";

  return (
    <div className="relative flex justify-center items-center select-none">
      {/* Wide ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(14,188,189,0.14) 0%, transparent 70%)"
            : "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(5,140,145,0.14) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative w-full max-w-[480px] md:max-w-[520px] aspect-square mx-auto">

        {/* SVG rings, particles, lines — Note: cards moved outside to HomePage */}
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full" aria-hidden>
          <defs>
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={isDark ? "rgba(14,188,189,0.3)" : "rgba(5,140,145,0.38)"} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <filter id="particleGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Outer ring */}
          <circle cx="250" cy="250" r="222"
            stroke={PF} strokeWidth="0.6" strokeDasharray="2 18"
            style={{ animation: "spin 90s linear infinite", transformOrigin: "250px 250px" }} />
          {/* Mid ring */}
          <circle cx="250" cy="250" r="165"
            stroke={PD} strokeWidth="0.7" strokeDasharray="1 12"
            style={{ animation: "spin 55s linear infinite reverse", transformOrigin: "250px 250px" }} />
          {/* Inner ring */}
          <circle cx="250" cy="250" r="108"
            stroke={PD} strokeWidth="0.8" strokeDasharray="5 25"
            style={{ animation: "spin 32s linear infinite", transformOrigin: "250px 250px" }} />

          {/* Hub glow */}
          <circle cx="250" cy="250" r="80" fill="url(#hubGrad)" className="animate-pulse" />
          <circle cx="250" cy="250" r="78" stroke={PD} strokeWidth="1" />

          {/* Network lines between particles */}
          {LINES.map(([a, b], i) => {
            const pa = PARTICLES[a]; const pb = PARTICLES[b];
            return <line key={`l${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={PF} strokeWidth="0.5" />;
          })}

          {/* Lines from center to each particle */}
          {PARTICLES.map((p, i) => (
            <line key={`cl${i}`} x1={250} y1={250} x2={p.x} y2={p.y} stroke={PF} strokeWidth="0.35" />
          ))}

          {/* Particles */}
          {PARTICLES.map((p, i) => (
            <g key={`p${i}`}>
              <circle cx={p.x} cy={p.y} r="7" fill={GL} />
              <circle cx={p.x} cy={p.y} r="2.2" fill={P} filter="url(#particleGlow)"
                style={{ animation: `signal-pulse 3.2s ${p.delay}s infinite` }} />
            </g>
          ))}

          {/* Orbiting accent dots */}
          <circle r="3.5" fill={P} filter="url(#particleGlow)">
            <animateMotion dur="14s" repeatCount="indefinite"
              path="M 250 85 A 165 165 0 1 1 249.99 85" />
          </circle>
          <circle r="2" fill={PD}>
            <animateMotion dur="22s" repeatCount="indefinite" begin="-11s"
              path="M 250 85 A 165 165 0 1 0 249.99 85" />
          </circle>
        </svg>

        {/* Logo centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Soft radial glow behind the logo circle */}
          <div
            className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.13 195 / 0.25) 0%, transparent 70%)", filter: "blur(24px)" }}
          />
          {/* Animated highlight ring */}
          <motion.div
            className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full elevated-card"
            style={{
              boxShadow: isDark
                ? "0 0 0 8px rgba(14,188,189,0.12), 0 0 80px -5px rgba(14,188,189,0.7), 0 24px 60px -16px rgba(0,0,0,0.5)"
                : "0 0 0 8px rgba(5,140,145,0.10), 0 0 80px -5px rgba(5,140,145,0.55), 0 24px 60px -16px rgba(0,0,0,0.25)",
            }}
          >
            <img src={logoSrc} alt="NEXI-US" draggable={false}
              className="relative z-10 h-20 md:h-24 w-auto object-contain" />
          </div>
        </div>

      </div>
    </div>
  );
}
