import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const { searchParams } = req.nextUrl;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const user = await getUserFromCookie(cookies());
  if (!user) return new Response("Bad Request");

  const getRandomDate = () => {
    const today = new Date();
    // const randomMonth = Math.floor(Math.random() * 4); // 0 to 3 for the last 3 months
    // const randomDay = Math.floor(Math.random() * 30) + 1; // 1 to 30 for day
    today.setUTCMonth(7);
    today.setUTCDate(31);
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);
    return today.toISOString();
  };
  // const newTransaction = await db.transaction.create({
  //   data: {
  //     amount: 500,
  //     ownerId: "9a982058-9c10-4382-9813-c53e09499f06",
  //     category: "Development",
  //     date: getRandomDate(),
  //     walletId: "796918b3-6b46-4bec-a8f8-5a30bb9547fe",
  //     type: "EXPENSE",
  //   },
  // });

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
    hello: "world",
    user,
    totalAmount: totalAmount._sum.amount,
    transactions,
  });
}
