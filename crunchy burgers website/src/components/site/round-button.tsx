import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Small transparent circle button used for +/− and icon controls. */
export function RoundButton({ className, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/25 bg-transparent text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Sizing for InteractiveHoverButton so longer labels fit: pin the hover layer to the left edge
 * (it has no `left`, so extra padding would push its arrow out) and keep the dot clear of the text.
 */
export const hoverButtonClass =
  "h-11 w-auto border-foreground/30 px-7 font-sans text-sm [&>div:nth-child(2)]:left-0 [&>div:last-child]:left-3.5";
