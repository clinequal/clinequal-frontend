import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  // Validate password by attempting a DELETE on a non-existent article.
  // The backend checks auth before checking if the resource exists,
  // so 401 = wrong password, 404 = password is correct.
  let testStatus: number;
  try {
    const testRes = await fetch(
      `${API_BASE}/api/articles/00000000-0000-0000-0000-000000000000`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      }
    );
    testStatus = testRes.status;
  } catch {
    // Non-ASCII password or network error — treat as invalid
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  if (testStatus === 401) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE_NAME, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
