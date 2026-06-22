import type { Notification } from "@/lib/types";

const READ_KEY = "sos-expert-notifications-read";
const DISMISSED_KEY = "sos-expert-notifications-dismissed";
const CUSTOM_KEY = "sos-expert-notifications-custom";
export const NOTIFICATIONS_UPDATED_EVENT = "sos-expert-notifications-updated";

function readStringArray(key: string) {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeStringArray(key: string, value: string[]) {
  window.localStorage.setItem(key, JSON.stringify(Array.from(new Set(value))));
  window.dispatchEvent(new Event(NOTIFICATIONS_UPDATED_EVENT));
}

export function getReadNotificationIds() {
  return readStringArray(READ_KEY);
}

export function markNotificationRead(id: string) {
  writeStringArray(READ_KEY, [...getReadNotificationIds(), id]);
}

export function markNotificationsRead(ids: string[]) {
  writeStringArray(READ_KEY, [...getReadNotificationIds(), ...ids]);
}

export function getDismissedNotificationIds() {
  return readStringArray(DISMISSED_KEY);
}

export function dismissNotification(id: string) {
  writeStringArray(DISMISSED_KEY, [...getDismissedNotificationIds(), id]);
}

export function getCustomNotifications(): Notification[] {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(CUSTOM_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveCustomNotifications(notifications: Notification[]) {
  window.localStorage.setItem(CUSTOM_KEY, JSON.stringify([...notifications, ...getCustomNotifications()]));
  window.dispatchEvent(new Event(NOTIFICATIONS_UPDATED_EVENT));
}

export function mergeNotifications(base: Notification[], userId: string) {
  const readIds = new Set(getReadNotificationIds());
  const dismissedIds = new Set(getDismissedNotificationIds());
  const custom = getCustomNotifications().filter((notification) => notification.userId === userId);

  return [...custom, ...base]
    .filter((notification) => !dismissedIds.has(notification.id))
    .map((notification) => ({
      ...notification,
      read: notification.read || readIds.has(notification.id)
    }));
}
