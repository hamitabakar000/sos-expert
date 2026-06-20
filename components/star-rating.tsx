"use client";

import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10"
};

export function StarRating({ value, onChange, size = "md", label = "Note" }: StarRatingProps) {
  const interactive = Boolean(onChange);

  return (
    <div
      className="flex items-center gap-1"
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${label} : ${value} sur 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const icon = (
          <Star
            className={`${sizes[size]} ${
              star <= Math.round(value) ? "fill-warning text-warning" : "fill-transparent text-slate-300"
            }`}
          />
        );

        if (!interactive) {
          return <span key={star}>{icon}</span>;
        }

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
            className="focus-ring rounded-sm transition-transform hover:scale-110"
            onClick={() => onChange?.(star)}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}
