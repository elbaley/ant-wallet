import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // delete JWT cookie if there is one
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get(process.env.COOKIE_NAME as string);
  if (jwtCookie) {
    cookieStore.delete(process.env.COOKIE_NAME as string);
  }
  const url = req.nextUrl.clone();
  url.pathname = "/";
  console.log("REDIRECTING TO:", url);
  return new Response("Signed out.", {
    status: 200,
    statusText: "Signed out",
  });
}
