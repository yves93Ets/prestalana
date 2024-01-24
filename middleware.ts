import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) return NextResponse.redirect(new URL("/auth", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/item/create", "/api/items/create", "/api/items", "/api/columns"],
};
