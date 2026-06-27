import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { DonateFab } from "./DonateFab";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
      <DonateFab />
    </div>
  );
}
