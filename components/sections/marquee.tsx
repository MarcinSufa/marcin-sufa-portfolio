import { marqueeItems } from "@/lib/content";

export function Marquee() {
  return (
    <div className="overflow-hidden border-b border-border bg-bg py-[15px]">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] whitespace-nowrap font-mono text-[13px] text-text2">
        {[0, 1].map((copy) =>
          marqueeItems.map((item) => (
            <span key={`${copy}-${item}`} className="contents">
              <span className="px-[22px]">{item}</span>
              <span className="text-accent">✦</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
