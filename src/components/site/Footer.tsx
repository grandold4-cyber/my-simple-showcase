import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Mail, MapPin, Phone, Heart, HandHeart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-white/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />

      {/* Persistent donate band */}
      <div className="border-b border-border/60 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg sm:text-xl text-foreground">
            Your gift sends a child to school, plants a church, raises a leader.
          </p>
          <div className="flex gap-3">
            <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-spirit">
              <Heart className="h-4 w-4" /> Donate Now
            </Link>
            <Link to="/partnership" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground glow-gold">
              <HandHeart className="h-4 w-4" /> Partner
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <div>
              <div className="font-display text-xl font-bold">
                <span className="text-gradient-spirit">54</span> Global Afrikan
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Faith · Education · Leadership
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">
            54 Global Afrikan unites Praise Church International, Halel School Nairobi,
            and our community leadership programs into one ecosystem raising whole
            people for whole transformation across Africa.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { href: "https://www.facebook.com/Praisechurchinternational/", Icon: Facebook, label: "Facebook" },
              { href: "https://youtube.com/@praisechurchlive", Icon: Youtube, label: "YouTube" },
              { href: "#", Icon: Instagram, label: "Instagram" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-full glass hover:text-primary hover:glow-spirit transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Ecosystem</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/church" className="hover:text-primary">Praise Church International</Link></li>
            <li><Link to="/school" className="hover:text-primary">Halel School Nairobi</Link></li>
            <li><Link to="/community" className="hover:text-primary">Community Programs</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events & Conferences</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Get Involved</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/donate" className="hover:text-primary">Donate</Link></li>
            <li><Link to="/partnership" className="hover:text-primary">Partnership</Link></li>
            <li><Link to="/school" className="hover:text-primary">Enroll your child</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Prayer requests</Link></li>
          </ul>
          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">Policies</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/policies/child-protection" className="hover:text-primary">Child Protection</Link></li>
            <li><Link to="/policies/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/policies/terms" className="hover:text-primary">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Nairobi, Kenya</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /><a href="tel:+254715297696" className="hover:text-primary">+254 715 297 696</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /><a href="mailto:rsimiyu7@gmail.com" className="hover:text-primary">rsimiyu7@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>“Let your light so shine before men…” — Matthew 5:16</p>
          <p>© {new Date().getFullYear()} 54 Global Afrikan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
