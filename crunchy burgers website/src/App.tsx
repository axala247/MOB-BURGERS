import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { MenuSection } from "@/components/site/menu-section";
import { MobCalculator } from "@/components/site/mob-calculator";
import { Reviews } from "@/components/site/reviews";
import { TrayDrawer } from "@/components/site/tray-drawer";
import { Visit } from "@/components/site/visit";
import { NightShiftProvider } from "@/hooks/use-night-shift";
import { TrayProvider } from "@/hooks/use-tray";
import { I18nProvider } from "@/lib/i18n";

export default function App() {
  return (
    <I18nProvider>
      <NightShiftProvider>
        <TrayProvider>
          <Header />
          <main>
            <Hero />
            <MenuSection />
            <MobCalculator />
            <Reviews />
            <Visit />
          </main>
          <Footer />
          <TrayDrawer />
        </TrayProvider>
      </NightShiftProvider>
    </I18nProvider>
  );
}
