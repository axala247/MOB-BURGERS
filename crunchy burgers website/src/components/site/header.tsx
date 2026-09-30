import { Moon, ShoppingBag, Sun } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { RoundButton } from "@/components/site/round-button";
import { StatusLabel } from "@/components/site/status-label";
import { useNightShift } from "@/hooks/use-night-shift";
import { useTray } from "@/hooks/use-tray";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useNightShift();
  const { count, setOpen } = useTray();
  const other = lang === "en" ? "ka" : "en";

  const links = [
    { href: "#menu", label: t("nav.menu") },
    { href: "#mob", label: t("nav.mob") },
    { href: "#reviews", label: t("nav.reviews") },
    { href: "#visit", label: t("nav.visit") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <a
        href="#menu"
        className="sr-only rounded-full bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t("nav.skip")}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="shrink-0" aria-label="MOB">
          <img src="/logo-128.png" alt="" width={36} height={36} className="size-9 rounded-full" />
        </a>

        <nav aria-label="Sections" className="ml-6 hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="underline-offset-[6px] decoration-1 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <StatusLabel className="hidden lg:inline-flex" />
          <StatusLabel compact className="lg:hidden" />

          <RoundButton
            onClick={() => setLang(other)}
            aria-label={t("lang.switch")}
            lang={other}
            className="font-mono text-[11px]"
          >
            {t("lang.short")}
          </RoundButton>

          <RoundButton
            onClick={toggle}
            aria-label={theme === "night" ? t("theme.toDay") : t("theme.toNight")}
            title={theme === "night" ? t("theme.toDay") : t("theme.toNight")}
          >
            {theme === "night" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </RoundButton>

          <div className="relative">
            <LiquidMetalButton
              viewMode="icon"
              icon={<ShoppingBag size={17} strokeWidth={1.75} />}
              label={t("tray.open", { n: count })}
              onClick={() => setOpen(true)}
            />
            {count > 0 && (
              <span
                key={count}
                aria-hidden
                className="smash-sm pointer-events-none absolute -right-1.5 -top-1.5 z-50 grid h-5 min-w-5 place-items-center rounded-full bg-cheese px-1 font-mono text-[11px] font-medium text-[#5b141a]"
              >
                {count}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
