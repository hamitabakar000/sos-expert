import type { Review } from "@/lib/types";

const STORAGE_KEY = "sos-expert-reviews";

export function readStoredReviews(): Review[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveStoredReview(review: Review) {
  const reviews = readStoredReviews().filter((item) => item.consultationId !== review.consultationId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([review, ...reviews]));
  window.dispatchEvent(new Event("sos-expert-reviews-updated"));
}
