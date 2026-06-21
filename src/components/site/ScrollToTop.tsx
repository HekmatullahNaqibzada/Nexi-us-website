import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollUp}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          whileHover={{ y: -3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-[color:var(--surface)]/85 backdrop-blur-md text-foreground/60 shadow-md hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-colors duration-200 md:bottom-10"
        >
          <ChevronUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
