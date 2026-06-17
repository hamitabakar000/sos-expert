"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, getDemoUserByEmail, getDemoUserByRole, getRoleHome, verifyDemoPassword } from "@/lib/auth";
import type { UserRole } from "@/lib/types";

export async function loginAsRole(formData: FormData) {
  const role = String(formData.get("role") ?? "client") as UserRole;
  const password = String(formData.get("password") ?? "");
  const user = getDemoUserByRole(role);

  if (!verifyDemoPassword(user.role, password)) {
    redirect(`/auth/login?role=${user.role}&error=password`);
  }

  cookies().set(AUTH_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  redirect(getRoleHome(user.role));
}

export async function loginWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");
  const user = getDemoUserByEmail(email);

  if (!user || !verifyDemoPassword(user.role, password)) {
    redirect(`/auth/login?email=${encodeURIComponent(email)}&error=credentials${next ? `&next=${encodeURIComponent(next)}` : ""}`);
  }

  cookies().set(AUTH_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  redirect(next && next.startsWith("/") ? next : getRoleHome(user.role));
}

export async function registerDemoUser(formData: FormData) {
  const role = String(formData.get("role") ?? "client") as UserRole;
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const user = getDemoUserByRole(role);

  if (password.length < 6 || password !== confirmPassword) {
    redirect(`/auth/register?role=${role}&error=password`);
  }

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
