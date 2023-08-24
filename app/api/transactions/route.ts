import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Transaction, User } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, res: Response) {
  const { searchParams } = req.nextUrl;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const user = await getUserFromCookie(cookies());
  if (!user) return new Response("Bad Request");

  const transactions = await db.transaction.findMany({
    where: {
      ownerId: user.id,
      ...(from &&
        to && {
          date: {
            gte: new Date(from).toISOString(),
            lte: new Date(to).toISOString(),
          },
        }),
    },
    orderBy: {
      date: "desc",
    },
  });
  const totalAmount = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      ownerId: user.id,
    },
  });

  return NextResponse.json({
    user,
    totalAmount: totalAmount._sum.amount,
    transactions,
  });
}

export async function POST(req: NextRequest) {
  const transaction = await req.json();
  // Validate transaction shape
  const schema = z.object({
    type: z.enum(["EXPENSE", "INCOME"]),
    category: z.string().min(2),
    description: z.string().min(2),
    amount: z.number().min(1),
    date: z.string().datetime(),
  });

  const zodResponse = schema.safeParse(transaction);
  if (!zodResponse.success) {
    return new Response("Invalid data!", {
      status: 400,
      statusText: "Invalid data",
    });
  }

  const user = await getUserFromCookie(cookies());
  if (!user) return new Response("Bad Request");

  const walletId = await db.wallet.findFirst({
    where: {
      ownerId: user.id,
    },
  });

  // add the transaction
  const newTransaction = await db.transaction.create({
    data: {
      ...zodResponse.data,
      amount:
        zodResponse.data.type === "EXPENSE"
          ? zodResponse.data.amount * -1
          : zodResponse.data.amount,
      walletId: walletId!.id,
      ownerId: user.id,
    },
  });

  return NextResponse.json(newTransaction, {
    status: 201,
    statusText: "Transaction added.",
  });
}
