import logo from "@/assets/logo.png";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl animate-pulse-glow" />
      <img src={logo} alt="54 Global Afrikan" className="relative h-full w-full object-contain" />
    </div>
  );
}
