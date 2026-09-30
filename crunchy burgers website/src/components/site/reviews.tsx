import { MENTIONS, REVIEWS } from "@/data/reviews";
import { SITE } from "@/data/site";
import { useI18n } from "@/lib/i18n";

export function Reviews() {
  const { t, l } = useI18n();

  return (
    <section id="reviews" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="type-display text-5xl sm:text-6xl">{t("reviews.title")}</h2>
          <div className="flex items-end gap-4">
            <span className="type-display text-7xl tabular-nums">{SITE.rating}</span>
            <span className="pb-1.5 font-mono text-xs leading-relaxed text-muted-foreground">
              <span aria-hidden className="text-cheese">★★★★★</span>
              <br />
              {t("reviews.count", { n: SITE.reviewCount })}
            </span>
          </div>
        </div>

        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {REVIEWS.map((review) => (
            <li key={review.quote}>
              <figure>
                <blockquote lang="en" className="text-lg leading-snug sm:text-xl">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-5 font-mono text-xs text-muted-foreground">
                  {l(review.author)} · {l(review.source)}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 font-mono text-xs">
          <span className="text-muted-foreground">{t("reviews.mentions")}</span>
          {MENTIONS.map((m) => (
            <span key={m.term.en}>
              {l(m.term)} <span className="text-muted-foreground">×{m.count}</span>
            </span>
          ))}
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 sm:ml-auto"
          >
            {t("reviews.all")} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
