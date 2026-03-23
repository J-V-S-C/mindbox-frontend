import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_BASE_URL),
  );
  res.cookies.delete("auth_token");
  return res;
}
