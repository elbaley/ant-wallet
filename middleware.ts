import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// This regex is needed to exclude middleware on files served from public
// TODO use matcher config instead of this!
const PUBLIC_FILE = /\.(.*)$/;

// recreating verifyJWT instead of using the one from @/lib/auth.ts
// because it has "bcrypt" package in it which is not supported on edge runtime
const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload;
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  // verify JWT
  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}
