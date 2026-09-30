import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { RoundButton, hoverButtonClass } from "@/components/site/round-button";
import { SITE } from "@/data/site";
import { MAX_SPLIT, useTray } from "@/hooks/use-tray";
import { useI18n } from "@/lib/i18n";
import { resolveLines } from "@/lib/round";
import { copyText } from "@/lib/storage";
import { cn } from "@/lib/utils";

const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function TrayDrawer() {
  const { t, l, gel } = useI18n();
  const { open, setOpen, lines, total, split, setSplit, setQty, clear } = useTray();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const rows = resolveLines(lines);
  const hasBeer = rows.some((row) => row.item.abv !== undefined);
  const each = Math.round((total / split) * 100) / 100;

  useEffect(() => {
    if (!open) return;
    const returnFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      returnFocus?.focus?.();
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const orderText = () => {
    const out = [
      t("tray.orderHeading"),
      ...rows.map((row) => `${row.qty} × ${l(row.item.name)} — ${gel(row.total)}`),
      `${t("tray.total")}: ${gel(total)}`,
    ];
    if (split > 1) out.push(`${t("tray.people", { n: split })}: ${t("tray.each", { x: gel(each) })}`);
    return out.join("\n");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-[visibility] duration-500",
        open ? "visible" : "invisible",
      )}
      inert={!open}
    >
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-[#1d0709]/40 backdrop-blur-[2px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tray-title"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 id="tray-title" className="type-display text-3xl">
            {t("tray.title")}
          </h2>
          <RoundButton ref={closeRef} aria-label={t("tray.close")} onClick={() => setOpen(false)}>
            <X className="size-4" />
          </RoundButton>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {rows.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{t("tray.empty")}</p>
          ) : (
            <>
              <div className="rounded-t-2xl bg-muted p-5 font-mono text-sm">
                <ul className="space-y-3">
                  {rows.map(({ item, qty, total: lineTotal }) => {
                    const name = l(item.name);
                    return (
                      <li key={item.id} className="flex items-center gap-3">
                        <span className="min-w-0 flex-1 leading-snug">{name}</span>
                        <span className="flex items-center gap-1.5">
                          <RoundButton
                            className="size-7"
                            aria-label={t("tray.less", { name })}
                            onClick={() => setQty(item.id, qty - 1)}
                          >
                            <Minus className="size-3" />
                          </RoundButton>
                          <span className="w-6 text-center tabular-nums">{qty}</span>
                          <RoundButton
                            className="size-7"
                            aria-label={t("tray.more", { name })}
                            onClick={() => setQty(item.id, qty + 1)}
                          >
                            <Plus className="size-3" />
                          </RoundButton>
                        </span>
                        <span className="w-16 text-right tabular-nums">{gel(lineTotal)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 flex items-baseline justify-between border-t border-dashed border-foreground/25 pt-4">
                  <span>{t("tray.total")}</span>
                  <span className="type-display-soft text-2xl tabular-nums">{gel(total)}</span>
                </div>
              </div>
              <div className="ticket-edge" aria-hidden />

              <div className="mt-8 flex items-center justify-between gap-3">
                <span className="text-sm">{t("tray.split")}</span>
                <span role="group" aria-label={t("tray.split")} className="flex items-center gap-2">
                  <RoundButton
                    className="size-8"
                    aria-label={`${t("mob.fewer")}: ${t("tray.split")}`}
                    disabled={split <= 1}
                    onClick={() => setSplit(split - 1)}
                  >
                    <Minus className="size-3.5" />
                  </RoundButton>
                  <output aria-live="polite" className="w-8 text-center font-mono tabular-nums">
                    {split}
                  </output>
                  <RoundButton
                    className="size-8"
                    aria-label={`${t("mob.more")}: ${t("tray.split")}`}
                    disabled={split >= MAX_SPLIT}
                    onClick={() => setSplit(split + 1)}
                  >
                    <Plus className="size-3.5" />
                  </RoundButton>
                </span>
              </div>
              {split > 1 && (
                <p className="mt-3 text-right font-mono text-sm">
                  {t("tray.people", { n: split })} · {t("tray.each", { x: gel(each) })}
                </p>
              )}

              {hasBeer && (
                <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs">
                  <span className="rounded-full bg-cheese px-2 py-0.5 text-[#5b141a]">18+</span>
                  {t("tray.id")}
                </p>
              )}
            </>
          )}
        </div>

        {rows.length > 0 && (
          <div className="border-t px-6 py-5">
            <p className="text-xs leading-relaxed text-muted-foreground">{t("tray.howto")}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {open && (
                <LiquidMetalButton
                  label={t("tray.call")}
                  onClick={() => {
                    window.location.href = SITE.phoneHref;
                  }}
                />
              )}
              <InteractiveHoverButton
                text={copied ? t("tray.copied") : t("tray.copy")}
                className={hoverButtonClass}
                onClick={async () => setCopied(await copyText(orderText()))}
              />
            </div>
            <button
              type="button"
              onClick={clear}
              className="mt-4 cursor-pointer text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {t("tray.clear")}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
