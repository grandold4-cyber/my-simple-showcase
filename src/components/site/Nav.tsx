import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/organizations", label: "Organizations" },
  { to: "/impact", label: "Impact" },
  { to: "/foundation", label: "Foundation" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass shadow-xl" : "bg-white/70 backdrop-blur border border-white/40"}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
            <div className="leading-tight">
              <div className="font-display text-base sm:text-lg font-bold tracking-wide">
                <span className="text-gradient-spirit">54</span>{" "}
                <span className="text-foreground">Global Afrikan</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">
                Faith · Education · Leadership
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-spirit hover:brightness-110 transition"
            >
              <Heart className="h-4 w-4" /> Donate
            </Link>
            <Link
              to="/partnership"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground glow-gold hover:brightness-110 transition"
            >
              Partner
            </Link>
            <button
              className="lg:hidden p-2 rounded-md glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/5"
                activeProps={{ className: "text-primary bg-primary/5" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/donate" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              <Heart className="h-4 w-4" /> Donate
            </Link>
            <Link to="/partnership" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
              Become a Partner
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
