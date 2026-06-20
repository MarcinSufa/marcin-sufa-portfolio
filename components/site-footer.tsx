import { footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg2">
      <div className="pad-x mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-10 py-6 font-mono text-[12px] text-text3">
        <span>{footer.left}</span>
        <span>{footer.center}</span>
        <span>{footer.right}</span>
      </div>
    </footer>
  );
}
