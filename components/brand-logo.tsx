import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center overflow-hidden rounded-md bg-[#0d1537]",
        className
      )}
    >
      <Image
        src="/branding/sos-expert-logo.jpg"
        alt="SOS Expert"
        width={456}
        height={153}
        priority={priority}
        className="h-10 w-auto object-contain sm:h-11"
      />
    </span>
  );
}
