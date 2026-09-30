import { Minus, Plus } from "lucide-react";
import { RoundButton } from "@/components/site/round-button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type StepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  size?: "md" | "lg";
};

export function Stepper({ label, value, min, max, onChange, size = "md" }: StepperProps) {
  const { t } = useI18n();

  return (
    <div role="group" aria-label={label} className="flex items-center gap-4">
      <RoundButton
        aria-label={`${t("mob.fewer")}: ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="size-4" />
      </RoundButton>
      <output
        aria-live="polite"
        className={cn(
          "min-w-[2ch] text-center tabular-nums",
          size === "lg" ? "type-display text-7xl sm:text-8xl" : "type-display-soft text-3xl",
        )}
      >
        <span key={value} className="smash-sm">
          {value}
        </span>
      </output>
      <RoundButton
        aria-label={`${t("mob.more")}: ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="size-4" />
      </RoundButton>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
