import { cookies } from "next/headers";
import { demoUsers } from "@/lib/demo-data";
import type { DemoUser, UserRole } from "@/lib/types";

export const AUTH_COOKIE = "sos_demo_user";

export function getDemoUserByRole(role: UserRole) {
  return demoUsers.find((user) => user.role === role) ?? demoUsers[0];
}

export function getDemoUserByEmail(email: string) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function getCurrentUser(): DemoUser {
  const cookieStore = cookies();
  const userId = cookieStore.get(AUTH_COOKIE)?.value;

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
