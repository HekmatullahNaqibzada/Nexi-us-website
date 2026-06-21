import { Reveal } from "./Reveal";
import { HighlightText } from "./HighlightText";
import { useI18n } from "@/lib/i18n";

const partners = [
  { name: "Google",       badge: "Premier Partner",      slug: "google"          },
  { name: "Meta",         badge: "Business Partner",     slug: "meta"            },
  { name: "Shopify",      badge: "Expert Partner",       slug: "shopify"         },
  { name: "HubSpot",      badge: "Solutions Partner",    slug: "hubspot"         },
  { name: "Mailchimp",    badge: "Pro Partner",          slug: "mailchimp"       },
  { name: "SEMrush",      badge: "Agency Partner",       slug: "semrush"         },
  { name: "WordPress",    badge: "VIP Partner",          slug: "wordpress"       },
  { name: "Stripe",       badge: "Verified Partner",     slug: "stripe"          },
  { name: "Adobe",        badge: "Certified Partner",    slug: "adobe"           },
  { name: "Salesforce",   badge: "Consulting Partner",   slug: "salesforce"      },
  { name: "AWS",          badge: "Advanced Partner",     slug: "amazonaws"       },
  { name: "Klaviyo",      badge: "Elite Partner",        slug: "klaviyo"         },
  { name: "Zapier",       badge: "Automation Partner",   slug: "zapier"          },
  { name: "Figma",        badge: "Design Partner",       slug: "figma"           },
  { name: "WooCommerce",  badge: "Commerce Partner",     slug: "woocommerce"     },
  { name: "Google Ads",   badge: "Certified Partner",    slug: "googleads"       },
];

export function Partners() {
  const { t } = useI18n();
  const doubled = [...partners, ...partners];

  return (
    <section className="relative py-14 md:py-20 overflow-hidden section-edge">
      {/* Section header */}
      <div className="container-x mb-10 md:mb-14">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.22em] text-primary">{t("partners.kicker")}</div>
          <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-display font-semibold leading-tight tracking-tight">
            <HighlightText text={t("partners.title")} />
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed">
            {t("partners.sub")}
          </p>
        </Reveal>
      </div>

      {/* Marquee track — force LTR so translateX animation is consistent in all languages */}
      <div className="relative" dir="ltr">
        {/* Left & right fade masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 md:w-40"
          style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 md:w-40"
          style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
        />

        {/* Scrolling strip — row 1 */}
        <div className="flex overflow-hidden select-none" dir="ltr">
          <div
            className="flex gap-4 w-max"
            style={{ animation: "marquee 55s linear infinite" }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
          >
            {doubled.map(({ name, badge, slug }, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl elevated-card hover:border-primary/30 cursor-default w-48"
              >
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-foreground/5">
                  <img
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt={name}
                    className="h-5 w-5 object-contain dark:brightness-0 dark:invert"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                  />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight truncate">{name}</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5 truncate">{badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row — slower, reverse direction */}
        <div className="flex overflow-hidden select-none mt-4" dir="ltr">
          <div
            className="flex gap-4 w-max"
            style={{ animation: "marquee 72s linear infinite reverse" }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
          >
            {[...doubled].reverse().map(({ name, badge, slug }, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl elevated-card hover:border-primary/30 cursor-default w-48"
              >
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-foreground/5">
                  <img
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt={name}
                    className="h-5 w-5 object-contain dark:brightness-0 dark:invert"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                  />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight truncate">{name}</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5 truncate">{badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
