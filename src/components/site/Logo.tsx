import darkLogo from "@/assets/nexi-logo-dark.png";
import whiteLogo from "@/assets/nexi-logo-whiite.png";
import { Link } from "react-router-dom";
import { useTheme } from "@/lib/theme";

export function Logo({ className = "h-12 md:h-14" }: { className?: string }) {
  const { theme } = useTheme();
  const src = theme === "dark" ? whiteLogo : darkLogo;

  return (
    <Link to="/" className="flex items-center group">
      <img
        src={src}
        alt="NEXI-US"
        className={`${className} w-auto select-none transition-transform duration-500 group-hover:rotate-[6deg]`}
        draggable={false}
      />
    </Link>
  );
}
