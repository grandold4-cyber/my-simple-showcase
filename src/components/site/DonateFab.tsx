import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function DonateFab() {
  return (
    <Link
      to="/donate"
      aria-label="Donate"
      className="fixed bottom-6 left-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-pulse-glow" />
      <span className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-2xl glow-spirit group-hover:scale-105 transition-transform">
        <Heart className="h-4 w-4" /> Donate
      </span>
    </Link>
  );
}
