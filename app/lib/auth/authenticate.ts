"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type AuthState = { success: false; message: string } | undefined;

export async function authenticate(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("http://localhost:3333/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return { 
        success: false, 
        message: isJson && data.message ? data.message : "Service unavailable or invalid response." 
      };
    }

    const token = data.access_token;

    if (!token) {
      throw new Error("Token missing from backend response.");
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    return { success: false, message: "A connection error occurred. Please try again later." };
  }

  redirect("/");
}
