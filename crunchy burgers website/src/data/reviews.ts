/** Taken from the Google Maps listing. Quotes stay in the language they were written in. */
export const REVIEWS = [
  {
    author: { en: "Ana", ka: "Ana" },
    source: { en: "Local Guide, Google", ka: "Local Guide, Google" },
    quote:
      "One of the best smash burgers I’ve had. Fresh ingredients, great taste, and super satisfying!",
  },
  {
    author: { en: "Elena S", ka: "Elena S" },
    source: { en: "Local Guide, Google", ka: "Local Guide, Google" },
    quote:
      "Excellent burgers and the vibe in the venue is also very cool! We’ve got the smash burger and fries with beer, delicious.",
  },
  {
    author: { en: "A visitor", ka: "სტუმარი" },
    source: { en: "Update on Google Maps", ka: "Google Maps" },
    quote:
      "I tried the falafel burger, it’s the best! The French fries are perfect.",
  },
] as const;

/** What reviewers mention most, with counts from the Google listing. */
export const MENTIONS = [
  { term: { en: "burgers", ka: "ბურგერები" }, count: 24 },
  { term: { en: "smash burger", ka: "სმეშ ბურგერი" }, count: 9 },
  { term: { en: "cheeseburger", ka: "ჩიზბურგერი" }, count: 3 },
  { term: { en: "onion rings", ka: "ხახვის რგოლები" }, count: 2 },
] as const;
