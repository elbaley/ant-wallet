import { comparePasswords, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const nextResponse = NextResponse.next();

  // validate body shape
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
  });

  const response = schema.safeParse(body);

  if (!response.success) {
    return NextResponse.json(
      {
        error: { message: response.error.issues[0].message },
        validation: response.error.issues,
      },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: {
      email: response.data.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: { message: "Invalid credentials!" } },
      { status: 401 },
    );
  }

  const isUser = await comparePasswords(response.data.password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);

    nextResponse.headers.set(
      "Set-Cookie",
      `${process.env.COOKIE_NAME as string}=${jwt}`,
    );
    // delete password from the user object when returned
    const responseUser: Partial<User> = { ...user };
    delete responseUser.password;
    const response = NextResponse.json(responseUser);
    response.headers.set(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    );
    return response;
  } else {
    return NextResponse.json(
      { error: { message: "Invalid credentials!" } },
      { status: 401 },
    );
  }
}
