import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TRANSACTION_TYPE } from "@prisma/client";

const getRandomDate = () => {
  const today = new Date();
  const randomMonth = Math.floor(Math.random() * 4); // 0 to 3 for the last 3 months
  const randomDay = Math.floor(Math.random() * 30) + 1; // 1 to 30 for day

  // temporary fix for UTC timezone problem
  today.setUTCMonth(today.getMonth() - randomMonth);
  today.setUTCDate(randomDay);
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0);
  today.setUTCMilliseconds(0);

  return today.toISOString();
};
const getRandomTransactionType = () => {
  // 90% of time it returns TRANSACTION_TYPE.EXPENSE
  return Math.random() < 0.9
    ? TRANSACTION_TYPE.EXPENSE
    : TRANSACTION_TYPE.INCOME;
};

const getRandomCategory = (type: TRANSACTION_TYPE) => {
  const expenseCategories = [
    "Food",
    "Transportation",
    "Bills",
    "Education",
    "Gifts",
    "Health",
    "Other",
  ];
  const incomeCategories = ["Work", "Family", "Other"];

  if (type === "EXPENSE") {
    return expenseCategories[
      Math.floor(Math.random() * expenseCategories.length)
    ];
  } else {
    return incomeCategories[
      Math.floor(Math.random() * incomeCategories.length)
    ];
  }
};

async function main() {
  const user = await db.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      firstName: "Test",
      lastName: "User",
      password: await hashPassword("123456"),
      wallets: {
        create: {
          name: "Test Wallet",
        },
      },
    },
    include: {
      wallets: true,
    },
  });

  const wallet = user.wallets[0];

  const transactions = await db.transaction.createMany({
    data: new Array(25).fill(1).map((_, i) => {
      const randomType = getRandomTransactionType();
      const randomTransaction = {
        type: randomType,
        category: getRandomCategory(randomType),
        amount:
          randomType === "INCOME"
            ? Math.floor(Math.random() * 1496) + 5
            : Math.abs(Math.floor(Math.random() * 1496) + 5) * -1, // 5-1500
        walletId: wallet.id,
        ownerId: user.id,
        date: getRandomDate(), // RANDOM DATE
        description: "",
      };

      return randomTransaction;
    }),
  });

  console.log({ user, transactions });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
