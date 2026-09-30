import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useServiceStatus, type ServiceStatus } from "@/lib/hours";
import { readStorage, writeStorage } from "@/lib/storage";

type Theme = "day" | "night";

type NightShift = {
  theme: Theme;
  status: ServiceStatus;
  toggle: () => void;
};

const NightShiftContext = createContext<NightShift | null>(null);

const isTheme = (v: unknown): v is Theme | null => v === "day" || v === "night" || v === null;

/**
 * Day or night colours. Follows Tbilisi time (night shift from 22:00 until closing)
 * unless the visitor has picked one. The same rule runs inline in index.html before first paint.
 */
export function NightShiftProvider({ children }: { children: ReactNode }) {
  const status = useServiceStatus();
  const [override, setOverride] = useState<Theme | null>(() =>
    readStorage<Theme | null>("mob-theme", null, isTheme),
  );
  const theme: Theme = override ?? (status.night ? "night" : "day");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "night");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "night" ? "#1d0709" : "#eee8d8");
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = theme === "night" ? "day" : "night";
    setOverride(next);
    writeStorage("mob-theme", next);
  }, [theme]);

  const value = useMemo(() => ({ theme, status, toggle }), [theme, status, toggle]);

  return <NightShiftContext.Provider value={value}>{children}</NightShiftContext.Provider>;
}

export function useNightShift() {
  const ctx = useContext(NightShiftContext);
  if (!ctx) throw new Error("useNightShift must be used inside <NightShiftProvider>");
  return ctx;
}
