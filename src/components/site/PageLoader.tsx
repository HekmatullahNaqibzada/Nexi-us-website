import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import darkLogo from "@/assets/nexi-logo-dark.png";
import whiteLogo from "@/assets/nexi-logo-whiite.png";
import { useTheme } from "@/lib/theme";

export function PageLoader() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(id);
  }, []);

  const logo = theme === "dark" ? whiteLogo : darkLogo;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--background)]"
        >
          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img src={logo} alt="NEXI-US" className="h-14 md:h-16 w-auto select-none" draggable={false} />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="h-0.5 w-32 rounded-full bg-primary/30 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-primary"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
