import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
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

  const response = schema.safeParse(body);

  if (!response.success) {
    return new Response("Invalid data!", {
      status: 400,
      statusText: "Invalid data",
    });
  }

  try {
    const user = await db.user.create({
      data: {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        password: await hashPassword(response.data.password),
      },
    });
    const jwt = await createJWT(user);

    return new Response("Success", {
      status: 201,
      headers: {
        "Set-Cookie": serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }),
      },
    });
  } catch (error) {
    return new Response("Couldn't register the user!", {
      status: 400,
      statusText: "Database error",
    });
  }
}
