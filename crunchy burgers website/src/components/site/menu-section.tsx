import { Check, Leaf, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { RoundButton } from "@/components/site/round-button";
import { CATEGORIES, MENU, type MenuItem } from "@/data/menu";
import { useTray } from "@/hooks/use-tray";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const { t, l } = useI18n();

  return (
    <section id="menu" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] lg:gap-16 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="type-display text-5xl sm:text-6xl">{t("menu.title")}</h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{t("menu.note")}</p>
          <nav aria-label={t("menu.title")} className="mt-10 hidden flex-col items-start gap-2.5 font-mono text-xs lg:flex">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="underline-offset-4 hover:underline"
              >
                {l(cat.name)}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 space-y-16 lg:mt-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
              <h3 className="eyebrow flex items-baseline justify-between border-b pb-3">
                <span>{l(cat.name)}</span>
                {cat.id === "beer" && <span>18+</span>}
              </h3>
              <ul className="divide-y">
                {MENU.filter((item) => item.category === cat.id).map((item) => (
                  <MenuRow key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const { t, l, gel } = useI18n();
  const { add } = useTray();
  const [added, setAdded] = useState(false);
  const name = l(item.name);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(id);
  }, [added]);

  // Mains get the full-width photo; sauces and drinks are narrow, so a square crop shows them bigger.
  const large = item.category === "burgers" || item.category === "sides";

  return (
    <li className="group grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 py-5 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:gap-x-6">
      {/* The photos have white studio backgrounds; multiplying them onto the cream tile makes
          the food sit straight on the page by day, and shows as a small cream card at night. */}
      <div
        className={cn(
          "isolate row-span-2 self-start overflow-hidden rounded-xl bg-[#eee8d8] sm:row-span-1 sm:self-center",
          large ? "aspect-[3/2] w-full" : "aspect-square w-16 justify-self-center sm:w-24",
        )}
      >
        <img
          src={`/menu/${item.id}.jpg`}
          alt=""
          width={172}
          height={114}
          loading="lazy"
          decoding="async"
          className="size-full object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="type-display-soft text-xl sm:text-2xl">{name}</h4>
          {item.popular && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-cheese" aria-hidden />
              {t("menu.popular")}
            </span>
          )}
          {item.veggie && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <Leaf className="size-3" aria-hidden />
              {t("menu.veggie")}
            </span>
          )}
          {item.abv !== undefined && (
            <span className="font-mono text-[11px] text-muted-foreground">{item.abv}% · 18+</span>
          )}
        </div>
        {item.description && (
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {l(item.description)}
          </p>
        )}
      </div>

      <div className="col-start-2 flex items-center justify-between gap-4 sm:col-start-3 sm:row-start-1 sm:justify-end">
        <span className="font-mono text-sm tabular-nums">{gel(item.price)}</span>
        <RoundButton
          aria-label={t("menu.add", { name })}
          onClick={() => {
            add(item.id);
            setAdded(true);
          }}
        >
          {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        </RoundButton>
      </div>
      <span className="sr-only" aria-live="polite">
        {added ? t("menu.added", { name }) : ""}
      </span>
    </li>
  );
}
