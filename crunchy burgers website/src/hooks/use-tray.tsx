import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MENU_BY_ID } from "@/data/menu";
import { linesTotal, type Lines } from "@/lib/round";
import { readStorage, writeStorage } from "@/lib/storage";

type Tray = {
  lines: Lines;
  count: number;
  total: number;
  split: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string, n?: number) => void;
  addMany: (lines: Lines) => void;
  setQty: (id: string, qty: number) => void;
  setSplit: (n: number) => void;
  clear: () => void;
};

const TrayContext = createContext<Tray | null>(null);

const MAX_QTY = 99;
export const MAX_SPLIT = 30;

const isLines = (v: unknown): v is Lines =>
  typeof v === "object" &&
  v !== null &&
  Object.entries(v).every(
    ([id, qty]) => id in MENU_BY_ID && Number.isInteger(qty) && qty > 0 && qty <= MAX_QTY,
  );

const isSplit = (v: unknown): v is number =>
  Number.isInteger(v) && (v as number) >= 1 && (v as number) <= MAX_SPLIT;

export function TrayProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Lines>(() => readStorage<Lines>("mob-tray", {}, isLines));
  const [split, setSplitState] = useState<number>(() => readStorage<number>("mob-split", 1, isSplit));
  const [open, setOpen] = useState(false);

  useEffect(() => writeStorage("mob-tray", lines), [lines]);
  useEffect(() => writeStorage("mob-split", split), [split]);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, MAX_QTY);
      return next;
    });
  }, []);

  const addMany = useCallback((more: Lines) => {
    setLines((prev) => {
      const next = { ...prev };
      for (const [id, n] of Object.entries(more)) {
        next[id] = Math.min((next[id] ?? 0) + n, MAX_QTY);
      }
      return next;
    });
  }, []);

  const add = useCallback((id: string, n = 1) => addMany({ [id]: n }), [addMany]);

  const setSplit = useCallback(
    (n: number) => setSplitState(Math.max(1, Math.min(MAX_SPLIT, n))),
    [],
  );

  const clear = useCallback(() => {
    setLines({});
    setSplitState(1);
  }, []);

  const value = useMemo<Tray>(
    () => ({
      lines,
      count: Object.values(lines).reduce((a, b) => a + b, 0),
      total: linesTotal(lines),
      split,
      open,
      setOpen,
      add,
      addMany,
      setQty,
      setSplit,
      clear,
    }),
    [lines, split, open, add, addMany, setQty, setSplit, clear],
  );

  return <TrayContext.Provider value={value}>{children}</TrayContext.Provider>;
}

export function useTray() {
  const ctx = useContext(TrayContext);
  if (!ctx) throw new Error("useTray must be used inside <TrayProvider>");
  return ctx;
}
