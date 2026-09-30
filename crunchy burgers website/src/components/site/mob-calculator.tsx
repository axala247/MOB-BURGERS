import { useMemo, useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { hoverButtonClass } from "@/components/site/round-button";
import { Stepper } from "@/components/site/stepper";
import { MAX_SPLIT, useTray } from "@/hooks/use-tray";
import type { DictKey } from "@/lib/dictionary";
import { useI18n } from "@/lib/i18n";
import { buildRound, linesTotal, resolveLines, type Drinks } from "@/lib/round";

const DRINKS: { id: Drinks; label: DictKey }[] = [
  { id: "soft", label: "mob.drinks.soft" },
  { id: "beer", label: "mob.drinks.beer" },
  { id: "none", label: "mob.drinks.none" },
];

export function MobCalculator() {
  const { t, l, gel } = useI18n();
  const { addMany, setSplit, setOpen } = useTray();
  const [people, setPeople] = useState(4);
  const [veggie, setVeggie] = useState(1);
  const [drinks, setDrinks] = useState<Drinks>("soft");
  const [hungry, setHungry] = useState(false);

  const veg = Math.min(veggie, people);
  const lines = useMemo(
    () => buildRound({ people, veggie: veg, drinks, hungry }),
    [people, veg, drinks, hungry],
  );
  const rows = resolveLines(lines);
  const total = linesTotal(lines);

  const addRound = () => {
    addMany(lines);
    setSplit(people);
    setOpen(true);
  };

  return (
    <section id="mob" className="scroll-mt-16 border-t">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div>
          <h2 className="type-display text-5xl sm:text-6xl">{t("mob.title")}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-foreground/80">{t("mob.lede")}</p>

          <div className="mt-12 space-y-8">
            <Stepper
              size="lg"
              label={t("mob.people")}
              value={people}
              min={1}
              max={MAX_SPLIT}
              onChange={setPeople}
            />
            <Stepper
              label={t("mob.veggie")}
              value={veg}
              min={0}
              max={people}
              onChange={setVeggie}
            />

            <fieldset>
              <legend className="eyebrow">{t("mob.drinks")}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {DRINKS.map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="mob-drinks"
                      value={option.id}
                      checked={drinks === option.id}
                      onChange={() => setDrinks(option.id)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex h-9 items-center rounded-full border border-foreground/25 px-4 text-sm transition-colors hover:border-foreground peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                      {t(option.label)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={hungry}
                onChange={(e) => setHungry(e.target.checked)}
                className="size-4 accent-foreground"
              />
              {t("mob.hungry")}
            </label>
          </div>
        </div>

        <div className="lg:pt-3">
          <div className="rounded-t-2xl bg-muted p-6 font-mono text-sm sm:p-8">
            <p className="eyebrow">{t("mob.round")}</p>
            <ul className="mt-5 space-y-2.5" aria-live="polite">
              {rows.map(({ item, qty, total: lineTotal }) => (
                <li key={item.id} className="flex gap-3">
                  <span className="w-8 shrink-0 tabular-nums text-muted-foreground">{qty}×</span>
                  <span className="min-w-0 flex-1">{l(item.name)}</span>
                  <span className="tabular-nums">{gel(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t border-dashed border-foreground/25 pt-5">
              <span>{t("mob.total")}</span>
              <span className="type-display-soft text-3xl tabular-nums">{gel(total)}</span>
            </div>
            <div className="mt-1 flex justify-between text-muted-foreground">
              <span>{t("mob.each")}</span>
              <span className="tabular-nums">{gel(Math.round((total / people) * 100) / 100)}</span>
            </div>
            <div className="mt-8">
              <InteractiveHoverButton
                text={t("mob.add")}
                className={hoverButtonClass}
                onClick={addRound}
              />
            </div>
          </div>
          <div className="ticket-edge" aria-hidden />
        </div>
      </div>
    </section>
  );
}
