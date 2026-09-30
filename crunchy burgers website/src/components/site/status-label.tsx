import { useNightShift } from "@/hooks/use-night-shift";
import { formatDuration } from "@/lib/hours";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function StatusLabel({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { t, lang } = useI18n();
  const { status } = useNightShift();
  const d = formatDuration(status.minutesLeft, lang);

  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-xs", className)}>
      <span className="status-dot" data-open={status.open} aria-hidden />
      <span>{status.open ? t("status.open") : t("status.closed")}</span>
      {!compact && (
        <span className="text-muted-foreground">
          · {status.open ? t("status.closesIn", { d }) : t("status.opensIn", { d })}
        </span>
      )}
    </span>
  );
}
