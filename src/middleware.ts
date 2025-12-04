import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/session"; // Version qui renvoie null (pas de redirect)

// 1. Routes protégées
const protectedRoutes = [
  "/dashboard", 
  "/properties", 
  "/tenants", 
  "/payments", 
  "/settings", 
  "/ai-advisor",
  "/expenses",
  "/documents"
];

// 2. Routes d'authentification
const authRoutes = ["/login", "/register", "/forgot-password"];

export default async function middleware(request: NextRequest) {
  
  // A. Vérification de session
  // On utilise verifySession qui est maintenant "pure" (pas de redirect interne)
  const session = await verifySession(); 
  const isAuthenticated = !!session?.userId;

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  // B. Redirections Sécurité
  
  // 1. Visiteur sur route protégée -> Login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Utilisateur connecté sur Login -> Dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // C. Injection des Headers (Architecture Enterprise)
  const response = NextResponse.next();
  
  if (isAuthenticated && session) {
    // Ces headers seront lus par createSafeAction
    response.headers.set("x-user-id", session.userId as string);
    response.headers.set("x-user-role", session.role as string);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};