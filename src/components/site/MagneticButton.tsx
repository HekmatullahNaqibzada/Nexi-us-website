import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors will-change-transform";
const variants = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 btn-elevated",
  ghost: "text-foreground/80 hover:text-foreground",
  outline: "border border-foreground/15 text-foreground hover:bg-foreground/5 shadow-sm hover:shadow-md transition-shadow",
};

function useMagnet() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 18);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 14);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return { ref, x, y, onMove, onLeave };
}

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  const { ref, x, y, onMove, onLeave } = useMagnet();
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {children}
      </button>
    </motion.div>
  );
}

export function MagneticLink({
  children,
  variant = "primary",
  className = "",
  to,
}: CommonProps & { to: string }) {
  const { ref, x, y, onMove, onLeave } = useMagnet();
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
