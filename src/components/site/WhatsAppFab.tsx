import { MessageCircle } from "lucide-react";

export const CONTACT_PHONE = "+254715297696";
export const CONTACT_PHONE_DISPLAY = "+254 715 297 696";
export const CONTACT_WHATSAPP_URL = "https://wa.me/254715297696";

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT_WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500/40 blur-2xl animate-pulse-glow" />
      <span className="relative grid place-items-center h-14 w-14 rounded-full bg-green-500 text-white shadow-2xl group-hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </span>
    </a>
  );
}
