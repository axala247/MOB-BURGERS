import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

export type ServiceStatus = {
  open: boolean;
  /** Minutes until closing (when open) or until opening (when closed). */
  minutesLeft: number;
  /** Between SITE.nightFrom and closing time. Drives the night shift theme. */
  night: boolean;
};

const DAY = 24 * 60;

/** Minutes after midnight in Tbilisi, whatever the visitor's own time zone is. */
export function tbilisiMinutes(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timeZone,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function isBetween(now: number, from: number, to: number) {
  return from <= to ? now >= from && now < to : now >= from || now < to;
}

export function getStatus(date = new Date()): ServiceStatus {
  const now = tbilisiMinutes(date);
  const { open, close } = SITE.hours;
  const isOpen = isBetween(now, open, close);
  return {
    open: isOpen,
    minutesLeft: ((isOpen ? close : open) - now + DAY) % DAY,
    night: isBetween(now, SITE.nightFrom, close),
  };
}

export function useServiceStatus(): ServiceStatus {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getStatus()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}

export function formatClock(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function formatDuration(minutes: number, lang: "en" | "ka"): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const [hu, mu] = lang === "ka" ? ["სთ", "წთ"] : ["h", "m"];
  if (h === 0) return `${m}${mu}`;
  return m === 0 ? `${h}${hu}` : `${h}${hu} ${m}${mu}`;
}
