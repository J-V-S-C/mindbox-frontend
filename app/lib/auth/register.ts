"use server";

import { redirect } from "next/navigation";

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return isJson && data.message ? data.message : "Registration failed due to a server error.";
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return "API unreachable. Please check your connection.";
  }

  redirect("/login");
}
