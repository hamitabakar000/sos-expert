import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span className={cn("brand-logo inline-flex items-center gap-2.5", className)}>
      <span className="brand-logo__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
          <circle cx="24" cy="24" r="5" fill="currentColor" />
          <path
            d="M24 7v12M24 29v12M7 24h12M29 24h12M12 12l8.5 8.5M27.5 27.5 36 36M36 12l-8.5 8.5M20.5 27.5 12 36"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="5" r="3" fill="currentColor" />
          <circle cx="24" cy="43" r="3" fill="currentColor" />
          <circle cx="5" cy="24" r="3" fill="currentColor" />
          <circle cx="43" cy="24" r="3" fill="currentColor" />
          <circle cx="10.5" cy="10.5" r="3" fill="currentColor" />
          <circle cx="37.5" cy="37.5" r="3" fill="currentColor" />
          <circle cx="37.5" cy="10.5" r="3" fill="currentColor" />
          <circle cx="10.5" cy="37.5" r="3" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-logo__name">
        <span className="brand-logo__sos">SOS</span>
        <span className="brand-logo__expert">Expert</span>
      </span>
    </span>
  );
}
