import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorer les fichiers statiques
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return;
  }

  // Rediriger la racine vers /en (langue par défaut)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", req.url));
  }
}
