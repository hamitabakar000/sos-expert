import { cookies } from "next/headers";
import { demoUsers } from "@/lib/demo-data";
import type { DemoUser, UserRole } from "@/lib/types";

export const AUTH_COOKIE = "sos_demo_user";
export const DEMO_DEFAULT_PASSWORD = "sos12345";

const rolePasswords: Record<UserRole, string> = {
  client: "client123",
  expert: "expert123",
  admin: "admin123"
};

export function getDemoUserByRole(role: UserRole) {
  return demoUsers.find((user) => user.role === role) ?? demoUsers[0];
}

export function getDemoUserByEmail(email: string) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function verifyDemoPassword(role: UserRole, password: string) {
  return password === rolePasswords[role] || password === DEMO_DEFAULT_PASSWORD;
}

export function getRolePassword(role: UserRole) {
  return rolePasswords[role];
}

export function getCurrentUserId() {
  return cookies().get(AUTH_COOKIE)?.value;
}

export function getCurrentUser(): DemoUser {
  const userId = getCurrentUserId();

  if (!userId) {
    return demoUsers[0];
  }

  return demoUsers.find((user) => user.id === userId) ?? demoUsers[0];
}

export function getRoleHome(role: UserRole) {
  if (role === "admin") {
    return "/admin";
  }

  return "/dashboard";
}
