import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  // validate body shape
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(2),
  });

  const zodResponse = schema.safeParse(body);

  if (!zodResponse.success) {
    return new Response("Invalid data!", {
      status: 400,
      statusText: "Invalid data",
    });
  }

  try {
    const user = await db.user.create({
      data: {
        firstName: zodResponse.data.firstName,
        lastName: zodResponse.data.lastName,
        email: zodResponse.data.email,
        password: await hashPassword(zodResponse.data.password),
      },
    });

    // add the default wallet
    const wallet = await db.wallet.create({
      data: {
        ownerId: user.id,
      },
    });

    const jwt = await createJWT(user);

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
  } catch (error) {
    return new Response("Couldn't register the user!", {
      status: 400,
      statusText: "Database error",
    });
  }
}
