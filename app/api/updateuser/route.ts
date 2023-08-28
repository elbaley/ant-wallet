import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request, res: Response) {
  const body = await req.json();

  // validate body shape
  const schema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
  });

  const response = schema.safeParse(body);
  if (!response.success) {
    return NextResponse.json({ status: "Invalid data" }, { status: 400 });
  }

  const user = await getUserFromCookie(cookies());
  if (!user) return new Response("Bad Request");

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...response.data,
    },
  });
  if (updatedUser) {
    return NextResponse.json(updatedUser, { status: 200 });
  }
}
