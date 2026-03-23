import jwt, {
  JwtPayload as JwtPayloadBase,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload extends JwtPayloadBase {
  userID: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return new Response(null, { status: 401 });

  let decoded: JwtPayload;
  try {
    const secret = process.env.JWT_SECRET || "secret_key";
    decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    }) as JwtPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError)
      console.log("Token expired at", err.expiredAt);
    else if (err instanceof JsonWebTokenError)
      console.log("JWT error:", err.message);
    else console.log("Unexpected error:", err);
    
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = decoded.userID;
  if (!userId) {
     return new Response(JSON.stringify({ error: "Missing userID in token" }), { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
  const res = await fetch(`${baseUrl}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
