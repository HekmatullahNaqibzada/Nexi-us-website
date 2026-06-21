import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  opacityDir: number;
}

export function AmbientCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";
    // Light mode: brand primary teal oklch(0.62 0.13 195) = rgb(5,140,145)
    const rgb = isDark ? "14,188,189" : "5,140,145";
    const maxAlpha = isDark ? 0.55 : 0.92;
    const lineAlphaFactor = isDark ? 0.10 : 0.38;

    const parent = canvas.parentElement;
    let W = parent ? parent.offsetWidth : window.innerWidth;
    let H = parent ? parent.offsetHeight : 400;
    canvas.width = W;
    canvas.height = H;

    // Particle count scales with area but capped
    const COUNT = Math.min(20, Math.floor((W * H) / 28000) + 10);
    const MAX_DIST = Math.min(W, H) * 0.3;

    const make = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.35 + 0.55,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    });

    const particles: Particle[] = Array.from({ length: COUNT }, make);

    let frameCount = 0;

    const draw = () => {
      frameCount++;
      // Throttle to ~30fps for performance
      if (frameCount % 2 !== 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.004;
        if (p.opacity > 0.55 || p.opacity < 0.08) p.opacityDir *= -1;

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const a = Math.min(p.opacity * maxAlpha, maxAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fill();

        const haloSize = isDark ? p.r * 5 : p.r * 3.5;
        const haloA    = isDark ? a * 0.30 : a * 0.28;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloSize);
        grad.addColorStop(0, `rgba(${rgb},${haloA})`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const lineA = (1 - dist / MAX_DIST) * lineAlphaFactor;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb},${lineA})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ""}`}
    />
  );
}
