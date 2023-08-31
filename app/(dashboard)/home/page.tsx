interface HomePageProps {}
import CallToAction from "@/components/CallToAction";
import CtaSkeleton from "@/components/CtaSkeleton";
import WalletCard from "@/components/WalletCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/lib/delay";
import { cookies } from "next/headers";
import { Suspense } from "react";

const getData = async () => {
  // await delay(15000);
  const user = await getUserFromCookie(cookies());
  if (!user) return {};
  const wallets = await db.wallet.findMany({
    where: {
      ownerId: user.id,
    },
  });

  const totalAmount = await db.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      walletId: wallets[0].id,
    },
  });

  return { wallets, totalAmount: totalAmount._sum.amount };
};
const HomePage = async ({}: HomePageProps) => {
  const { wallets, totalAmount } = await getData();

  return (
    <main className="sm:pl-10 px-2">
      <h1 className="pb-3">Wallet</h1>
      {wallets?.map((wallet) => (
        <WalletCard key={wallet.id} name={wallet.name} amount={totalAmount} />
      ))}
      <Suspense fallback={<CtaSkeleton />}>
        <CallToAction />
      </Suspense>
    </main>
  );
};

export default HomePage;
