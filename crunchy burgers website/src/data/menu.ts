export type L10n = { en: string; ka: string };

export type CategoryId = "burgers" | "sides" | "sauces" | "soft" | "beer";

export type MenuItem = {
  id: string;
  category: CategoryId;
  name: L10n;
  description?: L10n;
  /** Lari */
  price: number;
  popular?: boolean;
  veggie?: boolean;
  /** Alcohol by volume, percent. Anything with this is 18+. */
  abv?: number;
};

export const CATEGORIES: { id: CategoryId; name: L10n }[] = [
  { id: "burgers", name: { en: "burgers", ka: "ბურგერები" } },
  { id: "sides", name: { en: "sides", ka: "გარნირი" } },
  { id: "sauces", name: { en: "sauces", ka: "სოუსები" } },
  { id: "soft", name: { en: "soft drinks", ka: "უალკოჰოლო" } },
  { id: "beer", name: { en: "beer", ka: "ლუდი" } },
];

export const MENU: MenuItem[] = [
  {
    id: "mob-smash",
    category: "burgers",
    name: { en: "mob smash", ka: "მობ სმეში" },
    description: {
      en: "Beef patty, American cheese, special sauce, iceberg lettuce, pickles",
      ka: "საქონლის ხორცი, ამერიკული ყველი, სპეციალური სოუსი, აისბერგი, მწნილი",
    },
    price: 30,
    popular: true,
  },
  {
    id: "cheeseburger",
    category: "burgers",
    name: { en: "cheeseburger", ka: "ჩიზბურგერი" },
    description: {
      en: "Beef patty, American cheese, pickles, ketchup, mustard",
      ka: "საქონლის ხორცი, ამერიკული ყველი, მწნილი, კეჩუპი, მდოგვი",
    },
    price: 29,
    popular: true,
  },
  {
    id: "chicken-burger",
    category: "burgers",
    name: { en: "chicken burger", ka: "ქათმის ბურგერი" },
    description: {
      en: "Crispy chicken, coleslaw, pickles",
      ka: "ქათამი, კოლსლოუ, მწნილი",
    },
    price: 27,
    popular: true,
  },
  {
    id: "falafel-smash",
    category: "burgers",
    name: { en: "falafel smash", ka: "ფალაფელის სმეში" },
    description: {
      en: "Falafel, eggplant, tahini, yogurt, zhug, pomegranate",
      ka: "ფალაფელი, ბადრიჯანი, თახინი, იოგურტი, შუგი, ბროწეული",
    },
    price: 27,
    veggie: true,
  },
  {
    id: "fries",
    category: "sides",
    name: { en: "fries", ka: "კარტოფილი ფრი" },
    price: 10,
    popular: true,
  },
  {
    id: "onion-rings",
    category: "sides",
    name: { en: "onion rings", ka: "ხახვის რგოლები" },
    price: 15,
  },
  {
    id: "sriracha-gochujang",
    category: "sauces",
    name: { en: "sriracha gochujang", ka: "სრირაჩა გოჩუჯანგი" },
    price: 4,
    popular: true,
  },
  {
    id: "aioli",
    category: "sauces",
    name: { en: "aioli", ka: "აიოლი" },
    price: 4,
  },
  {
    id: "ketchup",
    category: "sauces",
    name: { en: "ketchup", ka: "კეჩუპი" },
    price: 3,
  },
  {
    id: "coke",
    category: "soft",
    name: { en: "coca-cola classic", ka: "კოკა-კოლა კლასიკი" },
    price: 4,
  },
  {
    id: "coke-zero",
    category: "soft",
    name: { en: "coca-cola zero", ka: "კოკა-კოლა ზერო" },
    price: 4,
  },
  {
    id: "water",
    category: "soft",
    name: { en: "water", ka: "წყალი" },
    description: { en: "500 ml", ka: "500 მლ" },
    price: 3,
  },
  {
    id: "mineral-water",
    category: "soft",
    name: { en: "mineral water", ka: "მინერალური წყალი" },
    description: { en: "330 ml, glass bottle", ka: "0.33 ლ, შუშის ბოთლი" },
    price: 4,
  },
  {
    id: "svia-blonde",
    category: "beer",
    name: { en: "svia blonde", ka: "სვია ბლონდი" },
    price: 15,
    abv: 6,
  },
  {
    id: "svia-weti",
    category: "beer",
    name: { en: "svia weti", ka: "სვია ვეთი" },
    price: 15,
    abv: 5.5,
  },
  {
    id: "svia-ipa",
    category: "beer",
    name: { en: "svia ipa", ka: "სვია იპა" },
    price: 15,
    abv: 5.5,
  },
  {
    id: "shavi-lomi",
    category: "beer",
    name: { en: "shavi lomi", ka: "შავი ლომი" },
    price: 12,
    abv: 4.8,
  },
];

export const MENU_BY_ID: Record<string, MenuItem> = Object.fromEntries(
  MENU.map((item) => [item.id, item]),
);
