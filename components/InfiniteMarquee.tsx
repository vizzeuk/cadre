"use client";

type InfiniteMarqueeProps = {
  items: string[];
  reverse?: boolean;
};

const icons: Record<string, string> = {
  HubSpot: "🔶",
  "Google Workspace": "🔵",
  "Meta Ads": "🔷",
  Shopify: "🟢",
  "WhatsApp Business": "💬",
  Stripe: "🟣",
  Notion: "⬜",
  "Microsoft 365": "🟦",
};

export default function InfiniteMarquee({ items, reverse = false }: InfiniteMarqueeProps) {
  // Triple the list to guarantee a seamless loop at all widths
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] py-1">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

      <div
        className={`flex w-max items-center gap-3 py-3 ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
        style={{ willChange: "transform" }}
      >
        {loopItems.map((item, index) => (
          <div
            key={item + "-" + index}
            className="group flex min-w-max items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs tracking-[0.12em] text-zinc-300 backdrop-blur transition-colors duration-300 hover:border-white/20 hover:text-white"
          >
            <span className="text-sm">{icons[item] ?? "◆"}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
