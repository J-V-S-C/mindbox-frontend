import jwt, {
  JwtPayload as JwtPayloadBase,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload extends JwtPayloadBase {
  sub: string;
}

function getPublicKey(): string {
  const keyBase64 = process.env.JWT_PUBLIC_KEY!;
  return Buffer.from(keyBase64, "base64").toString("utf-8");
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return new Response(null, { status: 401 });

  let decoded: JwtPayload;
  try {
    const publicKey = getPublicKey();
    decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
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

  const userId = decoded.sub;

  const res = await fetch(`http://localhost:3333/accounts/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
