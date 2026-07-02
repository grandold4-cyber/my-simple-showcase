import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Heart, ChevronDown, Church, GraduationCap, Building2, Plane, HeartHandshake } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/impact", label: "Impact" },
  { to: "/foundation", label: "Foundation" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const orgs = [
  { to: "/organizations", label: "All Organizations", Icon: ChevronDown },
  { to: "/church", label: "Praise Church Nairobi", Icon: Church },
  { to: "/school", label: "Halel School Nairobi", Icon: GraduationCap },
  { to: "/properties", label: "Sinap Properties", Icon: Building2 },
  { to: "/tours", label: "Praise Adventures & Tours", Icon: Plane },
  { to: "/foundation", label: "54 Global Foundation", Icon: HeartHandshake },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [orgsOpen, setOrgsOpen] = useState(false);
  const [mobileOrgsOpen, setMobileOrgsOpen] = useState(false);
  const orgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (orgsRef.current && !orgsRef.current.contains(e.target as Node)) setOrgsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
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
            {links.slice(0, 2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}

            {/* Organizations dropdown */}
            <div className="relative" ref={orgsRef}>
              <button
                onClick={() => setOrgsOpen((v) => !v)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Organizations
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${orgsOpen ? "rotate-180" : ""}`} />
              </button>
              {orgsOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 glass rounded-2xl shadow-2xl p-2 border border-border/60 z-50">
                  {orgs.map((o) => (
                    <Link
                      key={o.to}
                      to={o.to}
                      onClick={() => setOrgsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                      activeProps={{ className: "text-primary bg-primary/5" }}
                    >
                      <o.Icon className="h-4 w-4" />
                      {o.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links.slice(2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
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
            {links.slice(0, 2).map((l) => (
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
            <button
              onClick={() => setMobileOrgsOpen((v) => !v)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center justify-between hover:bg-primary/5"
            >
              Organizations
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileOrgsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileOrgsOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                {orgs.map((o) => (
                  <Link
                    key={o.to}
                    to={o.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/5"
                    activeProps={{ className: "text-primary bg-primary/5" }}
                  >
                    <o.Icon className="h-4 w-4" />
                    {o.label}
                  </Link>
                ))}
              </div>
            )}
            {links.slice(2).map((l) => (
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
