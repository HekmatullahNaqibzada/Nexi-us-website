import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoLightboxProps {
  youtubeId: string;
  open: boolean;
  onClose: () => void;
}

export function VideoLightbox({ youtubeId, open, onClose }: VideoLightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[81] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.82, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl pointer-events-auto"
              style={{
                borderRadius: "1.5rem",
                boxShadow: "0 40px 120px -20px rgba(0,0,0,0.8), 0 0 0 1px oklch(0.78 0.13 195 / 0.15), 0 0 80px -20px oklch(0.78 0.13 195 / 0.3)",
              }}
            >
              {/* Aspect ratio wrapper */}
              <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "16/9" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title="NEXI-US Agency Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                onClick={onClose}
                aria-label="Close video"
                className="absolute -top-4 -right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-xl hover:scale-110 active:scale-95 transition-transform duration-150"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
