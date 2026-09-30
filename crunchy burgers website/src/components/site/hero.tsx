import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { hoverButtonClass } from "@/components/site/round-button";
import { SITE } from "@/data/site";
import { formatClock } from "@/lib/hours";
import { useI18n } from "@/lib/i18n";

const PHOTO = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd";
const photo = (w: number) => `${PHOTO}?auto=format&fit=crop&crop=entropy&w=${w}&h=${w}&q=75`;

export function Hero() {
  const { t } = useI18n();
  // Tapping the headline smashes it again.
  const [smashes, setSmashes] = useState(0);

  const facts = [
    { value: String(SITE.rating), label: t("hero.rating", { n: SITE.reviewCount }) },
    { value: SITE.pricePerPerson, label: t("hero.price") },
    {
      value: `${formatClock(SITE.hours.open)}–${formatClock(SITE.hours.close)}`,
      label: t("hero.everyDay"),
    },
  ];

  return (
    <section id="top" className="overflow-x-clip">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 md:pt-14 lg:pb-24">
        <p className="eyebrow">{t("hero.eyebrow")}</p>

        {/* Sized in container units so the word always spans the column, phone to desktop. */}
        <div className="[container-type:inline-size]">
          <h1
            className="type-display mt-6 text-[length:14cqi] [&:lang(ka)]:text-[length:min(24cqi,12rem)]"
            onPointerDown={() => setSmashes((n) => n + 1)}
          >
            <span key={smashes} className="smash">
              {t("hero.smash")}
            </span>
            <span className="type-display-soft mt-[0.1em] block text-[0.4em]">{t("hero.till")}</span>
          </h1>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <p className="max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg">
              {t("hero.lede")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LiquidMetalButton
                label={t("hero.order")}
                onClick={() => document.getElementById("menu")?.scrollIntoView({ block: "start" })}
              />
              <InteractiveHoverButton
                text={t("hero.directions")}
                className={hoverButtonClass}
                onClick={() => window.open(SITE.directionsUrl, "_blank", "noopener")}
              />
            </div>
          </div>

          <img
            src={photo(800)}
            srcSet={`${photo(480)} 480w, ${photo(800)} 800w, ${photo(1200)} 1200w`}
            sizes="(min-width: 1024px) 24rem, 60vw"
            alt={t("hero.photoAlt")}
            width={800}
            height={800}
            fetchPriority="high"
            className="aspect-square w-3/5 max-w-[24rem] justify-self-end rounded-full object-cover lg:-mt-28 lg:w-full"
          />
        </div>

        <ul className="mt-14 grid gap-3 border-t pt-6 sm:grid-cols-3 sm:gap-6">
          {facts.map((fact) => (
            <li key={fact.label} className="flex items-baseline justify-between gap-4 sm:block">
              <p className="type-display-soft text-lg whitespace-nowrap tabular-nums sm:text-2xl">{fact.value}</p>
              <p className="font-mono text-[11px] leading-snug text-muted-foreground sm:mt-1.5">{fact.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
