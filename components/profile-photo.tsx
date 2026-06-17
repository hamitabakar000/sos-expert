import Image from "next/image";
import { cn } from "@/lib/utils";

type ProfilePhotoProps = {
  src?: string;
  alt: string;
  initials: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  xs: "h-7 w-7 text-xs",
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-base",
  lg: "h-20 w-20 text-xl",
  xl: "h-28 w-28 text-2xl"
};

const pixels = {
  xs: 28,
  sm: 40,
  md: 56,
  lg: 80,
  xl: 112
};

export function ProfilePhoto({ src, alt, initials, size = "md", className }: ProfilePhotoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={pixels[size]}
        height={pixels[size]}
        className={cn("shrink-0 rounded-full object-cover ring-2 ring-white", sizes[size], className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary font-display font-bold text-white ring-2 ring-white",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
