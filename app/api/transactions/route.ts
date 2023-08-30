import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
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
    description: z.string().optional(),
    amount: z.number(),
    date: z.string().datetime(),
  });

  const zodResponse = schema.safeParse(transaction);
  if (!zodResponse.success) {
    return NextResponse.json(
      { error: zodResponse.error.issues },
      { status: 400 },
    );
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
      walletId: walletId!.id,
      ownerId: user.id,
    },
  });

  return NextResponse.json(newTransaction, {
    status: 201,
    statusText: "Transaction added.",
  });
}

export async function PUT(req: NextRequest) {
  const transaction = await req.json();
  // Validate transaction shape
  const schema = z.object({
    id: z.string(),
    type: z.enum(["EXPENSE", "INCOME"]),
    category: z.string().min(2),
    description: z.string().optional(),
    amount: z.number(),
    date: z.string().datetime(),
  });

  const zodResponse = schema.safeParse(transaction);
  if (!zodResponse.success) {
    return NextResponse.json(
      { error: zodResponse.error.issues },
      {
        status: 500,
        statusText: "Invalid data",
      },
    );
  }

  try {
    // update the transaction
    const updatedTransaction = await db.transaction.update({
      where: { id: zodResponse.data.id },
      data: {
        ...zodResponse.data,
      },
    });

    return NextResponse.json(updatedTransaction, {
      status: 200,
      statusText: "Transaction updated.",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Invalid transaction ID." },
      { status: 400 },
    );
  }

  const user = await getUserFromCookie(cookies());
  if (!user) return new Response("Bad Request");

  try {
    await db.transaction.delete({
      where: { id, ownerId: user.id },
    });
    return NextResponse.json("deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
