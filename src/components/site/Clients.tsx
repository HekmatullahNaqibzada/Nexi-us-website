import { Reveal } from "./Reveal";
import { HighlightText } from "./HighlightText";
import { useI18n } from "@/lib/i18n";

const ROW_1 = [
  { name: "Shopify",    slug: "shopify"    },
  { name: "HubSpot",   slug: "hubspot"    },
  { name: "Stripe",    slug: "stripe"     },
  { name: "Notion",    slug: "notion"     },
  { name: "Slack",     slug: "slack"      },
  { name: "Figma",     slug: "figma"      },
  { name: "Webflow",   slug: "webflow"    },
  { name: "Airtable",  slug: "airtable"   },
  { name: "Intercom",  slug: "intercom"   },
  { name: "Mailchimp", slug: "mailchimp"  },
  { name: "Zapier",    slug: "zapier"     },
  { name: "Typeform",  slug: "typeform"   },
];

function LogoStrip({ items }: { items: typeof ROW_1 }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden select-none" dir="ltr">
      <div
        className="flex gap-5 w-max"
        style={{ animation: "marquee 55s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {doubled.map(({ name, slug }, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-4 px-7 py-5 rounded-2xl elevated-card hover:border-primary/30 transition-colors cursor-default"
          >
            <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-foreground/5">
              <img
                src={`https://cdn.simpleicons.org/${slug}`}
                alt={name}
                className="h-6 w-6 object-contain dark:brightness-0 dark:invert"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
              />
            </span>
            <span className="text-base font-semibold text-foreground/75 whitespace-nowrap">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const { t } = useI18n();
  return (
    <section className="relative py-14 md:py-20 overflow-hidden section-alt">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[360px] w-[700px] rounded-full opacity-40"
        style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 195 / 0.10), transparent 70%)" }} />

      {/* Header */}
      <div className="container-x mb-10 md:mb-14">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.22em] text-primary mb-3">{t("clients.kicker")}</div>
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.4rem)] font-display font-semibold leading-tight tracking-tight">
            <HighlightText text={t("clients.title")} />
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground text-sm leading-relaxed">
            {t("clients.sub")}
          </p>
        </Reveal>
      </div>

      {/* Sliders */}
      <div className="relative space-y-4" dir="ltr">
        {/* Fade masks */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 md:w-48"
          style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 md:w-48"
          style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }} />

        <LogoStrip items={ROW_1} />
      </div>
    </section>
  );
}
