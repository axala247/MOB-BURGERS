import { SITE } from "@/data/site";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="flex items-center gap-5">
          <img src="/logo-384.png" alt="MOB" width={96} height={96} loading="lazy" className="size-24 rounded-full" />
          <p className="font-mono text-xs text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
          <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
            {SITE.phone}
          </a>
          {SITE.instagram && (
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              Instagram ↗
            </a>
          )}
          <a href="#top" className="underline-offset-4 hover:underline">
            {t("footer.top")} ↑
          </a>
          <span className="text-muted-foreground">© {new Date().getFullYear()} MOB</span>
        </div>
      </div>
    </footer>
  );
}
