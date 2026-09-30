import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { hoverButtonClass } from "@/components/site/round-button";
import { StatusLabel } from "@/components/site/status-label";
import { SITE } from "@/data/site";
import type { DictKey } from "@/lib/dictionary";
import { formatClock } from "@/lib/hours";
import { useI18n } from "@/lib/i18n";
import { copyText } from "@/lib/storage";

const SERVICES: DictKey[] = ["visit.dineIn", "visit.takeaway", "visit.delivery", "visit.lgbtq"];

export function Visit() {
  const { t, l } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <section id="visit" className="scroll-mt-16 border-t">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20 lg:py-28">
        <div>
          <h2 className="type-display text-5xl sm:text-6xl">{t("visit.title")}</h2>
          <address className="type-display-soft mt-8 text-3xl leading-tight not-italic sm:text-4xl">
            {l(SITE.address)}
            <br />
            <span className="text-muted-foreground">{l(SITE.city)}</span>
          </address>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <InteractiveHoverButton
              text={t("visit.directions")}
              className={hoverButtonClass}
              onClick={() => window.open(SITE.directionsUrl, "_blank", "noopener")}
            />
            <button
              type="button"
              onClick={async () => setCopied(await copyText(SITE.taxiAddress))}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-foreground/30 bg-transparent px-5 text-sm font-semibold transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span aria-live="polite">{copied ? t("visit.copied") : t("visit.copyTaxi")}</span>
            </button>
          </div>
          <p className="mt-3 max-w-sm text-xs text-muted-foreground">
            {t("visit.copyTaxiHint")}{" "}
            <span lang="ka" className="text-foreground/70">
              {SITE.taxiAddress}
            </span>
          </p>

          <ul className="mt-12 flex flex-wrap gap-2 font-mono text-xs">
            {SERVICES.map((key) => (
              <li key={key} className="rounded-full border px-3 py-1.5">
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <dl className="self-end divide-y border-y font-mono text-sm">
          <div className="flex items-start justify-between gap-6 py-5">
            <dt className="text-muted-foreground">{t("visit.hours")}</dt>
            <dd className="flex flex-col items-end gap-2 text-right">
              <span>
                {t("visit.everyDay")} {formatClock(SITE.hours.open)}–{formatClock(SITE.hours.close)}
              </span>
              <StatusLabel />
            </dd>
          </div>
          <div className="flex items-start justify-between gap-6 py-5">
            <dt className="text-muted-foreground">{t("visit.phone")}</dt>
            <dd>
              <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
                {SITE.phone}
              </a>
            </dd>
          </div>
          <div className="flex items-start justify-between gap-6 py-5">
            <dt className="text-muted-foreground">{t("visit.plusCode")}</dt>
            <dd>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {SITE.plusCode}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
