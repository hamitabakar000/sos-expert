"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, getDemoUserByEmail, getDemoUserByRole, getRoleHome } from "@/lib/auth";
import type { UserRole } from "@/lib/types";

export async function loginAsRole(formData: FormData) {
  const role = String(formData.get("role") ?? "client") as UserRole;
  const user = getDemoUserByRole(role);

  cookies().set(AUTH_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  redirect(getRoleHome(user.role));
}

export async function loginWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const user = getDemoUserByEmail(email) ?? getDemoUserByRole("client");

  cookies().set(AUTH_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  redirect(getRoleHome(user.role));
}

export async function registerDemoUser(formData: FormData) {
  const role = String(formData.get("role") ?? "client") as UserRole;
  const user = getDemoUserByRole(role);

  cookies().set(AUTH_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  redirect(role === "expert" ? "/settings/expert-profile" : "/settings/preferences");
}

export async function signOut() {
  cookies().delete(AUTH_COOKIE);
  redirect("/auth/login");
}
