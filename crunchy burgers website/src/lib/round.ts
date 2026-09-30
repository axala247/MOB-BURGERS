import { MENU, MENU_BY_ID } from "@/data/menu";

/** item id -> quantity */
export type Lines = Record<string, number>;

export type Drinks = "soft" | "beer" | "none";

export type RoundOptions = {
  people: number;
  veggie: number;
  drinks: Drinks;
  hungry: boolean;
};

// House favourite first, then a bit of variety as the mob grows.
const MEAT = ["mob-smash", "cheeseburger", "mob-smash", "chicken-burger"];
const SAUCES = ["sriracha-gochujang", "aioli", "ketchup"];
const SOFT = ["coke", "coke-zero"];
const BEER = ["svia-blonde", "svia-ipa", "svia-weti"];

/** A sensible round for a group: one burger and one drink each, fries to share, a sauce each. */
export function buildRound({ people, veggie, drinks, hungry }: RoundOptions): Lines {
  const lines: Lines = {};
  const add = (id: string, n = 1) => {
    if (n > 0) lines[id] = (lines[id] ?? 0) + n;
  };
  const rotate = (ids: string[], n: number) => {
    for (let i = 0; i < n; i++) add(ids[i % ids.length]);
  };

  const veg = Math.min(veggie, people);
  rotate(MEAT, people - veg);
  add("falafel-smash", veg);
  add("fries", Math.ceil(people / 2));
  if (hungry) add("onion-rings", Math.ceil(people / 2));
  rotate(SAUCES, people);
  if (drinks === "soft") rotate(SOFT, people);
  if (drinks === "beer") rotate(BEER, people);

  return lines;
}

/** Lines in menu order, with prices resolved. */
export function resolveLines(lines: Lines) {
  return MENU.filter((item) => (lines[item.id] ?? 0) > 0).map((item) => ({
    item,
    qty: lines[item.id],
    total: lines[item.id] * item.price,
  }));
}

export function linesTotal(lines: Lines): number {
  return Object.entries(lines).reduce(
    (sum, [id, qty]) => sum + (MENU_BY_ID[id]?.price ?? 0) * qty,
    0,
  );
}
