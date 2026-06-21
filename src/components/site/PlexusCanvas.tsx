import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isAccent: boolean;
  opacity: number;
  opacityDir: number;
}

interface PlexusCanvasProps {
  className?: string;
  /** Multiplier for particle density — default 1 */
  density?: number;
  /** Max connection distance override */
  maxDist?: number;
}

export function PlexusCanvas({ className, density = 1, maxDist }: PlexusCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    // Colour palettes
    // Light mode: brand primary teal oklch(0.62 0.13 195) = rgb(5,140,145)
    const dotRgb    = isDark ? "195,225,240" : "5,140,145";      // blue-white / brand teal
    const accentRgb = isDark ? "225,165,50"  : "0,175,180";      // golden / lighter teal accent
    const lineRgb   = isDark ? "180,215,235" : "5,140,145";      // line colour
    const triRgb    = isDark ? "140,190,220" : "5,140,145";      // triangle fill

    const parent = canvas.parentElement;
    let W = parent ? parent.offsetWidth  : window.innerWidth;
    let H = parent ? parent.offsetHeight : 400;
    canvas.width  = W;
    canvas.height = H;

    const COUNT    = Math.min(70, Math.floor(((W * H) / 14000) * density) + 18);
    const DIST     = maxDist ?? Math.min(200, Math.max(120, W * 0.18));
    const ACCENT_N = Math.max(2, Math.floor(COUNT * 0.1)); // ~10% golden dots

    const make = (i: number): Node => ({
      x:          Math.random() * W,
      y:          Math.random() * H,
      vx:         (Math.random() - 0.5) * 0.38,
      vy:         (Math.random() - 0.5) * 0.38,
      r:          Math.random() * 2.2 + 0.7,
      isAccent:   i < ACCENT_N,
      opacity:    Math.random() * 0.25 + 0.75,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    });

    // Shuffle so accent dots are distributed randomly, not all at index 0
    const nodes: Node[] = Array.from({ length: COUNT }, (_, i) => make(i));
    for (let i = nodes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nodes[i].isAccent, nodes[j].isAccent] = [nodes[j].isAccent, nodes[i].isAccent];
    }

    let frame = 0;

    const tick = () => {
      frame++;
      // ~30 fps throttle
      if (frame % 2 !== 0) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // ── Update positions ──────────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.opacity += n.opacityDir * 0.004;
        if (n.opacity >= 1)    { n.opacity = 1;    n.opacityDir = -1; }
        if (n.opacity <= 0.28) { n.opacity = 0.28; n.opacityDir =  1; }
        if (n.x < -30) n.x = W + 30;
        if (n.x > W + 30) n.x = -30;
        if (n.y < -30) n.y = H + 30;
        if (n.y > H + 30) n.y = -30;
      }

      // Pre-compute which pairs are connected (within DIST)
      // Store as array of {i, j, alpha} for reuse in triangle check
      const pairs: { i: number; j: number; alpha: number }[] = [];

      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DIST) {
            pairs.push({ i, j, alpha: 1 - dist / DIST });
          }
        }
      }

      // ── Draw triangle fills for triplets ─────────────────────────
      // Build adjacency set for quick triangle lookup
      const adj = new Set<string>();
      for (const p of pairs) adj.add(`${p.i}-${p.j}`);

      const triA = isDark ? 0.055 : 0.048;
      for (let p = 0; p < pairs.length; p++) {
        const { i, j, alpha: a1 } = pairs[p];
        for (let q = p + 1; q < pairs.length; q++) {
          const { i: pi2, j: pj2, alpha: a2 } = pairs[q];
          // Find if there's a third node shared by both pairs
          let k = -1;
          if      (pi2 === i && adj.has(`${Math.min(j, pj2)}-${Math.max(j, pj2)}`)) k = pj2;
          else if (pi2 === j && adj.has(`${Math.min(i, pj2)}-${Math.max(i, pj2)}`)) k = pj2;
          else if (pj2 === i && adj.has(`${Math.min(j, pi2)}-${Math.max(j, pi2)}`)) k = pi2;
          else if (pj2 === j && adj.has(`${Math.min(i, pi2)}-${Math.max(i, pi2)}`)) k = pi2;

          if (k >= 0 && k !== i && k !== j) {
            const avgA = ((a1 + a2) * 0.5) * triA;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.lineTo(nodes[k].x, nodes[k].y);
            ctx.closePath();
            ctx.fillStyle = `rgba(${triRgb},${avgA})`;
            ctx.fill();
            break; // one triangle per pair is enough
          }
        }
      }

      // ── Draw connecting lines ─────────────────────────────────────
      const lineBaseA = isDark ? 0.45 : 0.78;
      ctx.lineWidth = isDark ? 0.7 : 1.1;
      for (const { i, j, alpha } of pairs) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${lineRgb},${alpha * lineBaseA})`;
        ctx.stroke();
      }

      // ── Draw nodes ───────────────────────────────────────────────
      for (const n of nodes) {
        const rgb = n.isAccent ? accentRgb : dotRgb;
        const a   = n.opacity;

        // Glow halo (larger for accent / bigger nodes)
        const haloR = n.isAccent ? n.r * 9 : n.r * 5;
        const haloFade = isDark ? (n.isAccent ? 0.55 : 0.28) : (n.isAccent ? 0.50 : 0.30);
        const grad  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        grad.addColorStop(0, `rgba(${rgb},${a * haloFade})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(tick);
    };

    tick();

    const onResize = () => {
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [theme, density, maxDist]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ""}`}
    />
  );
}
