"use client";

import { useTransactions } from "@/context/transactionsProvider";

interface InfoCardProps {
  name: string;
  amount: number | null;
}

const InfoCard = ({ name, amount }: InfoCardProps) => {
  const { currencySymbol } = useTransactions();
  return (
    <div className="bg-white min-w-[180px] max-w-[220px] w-full rounded-xl shadow-md pt-8 pl-5 pb-5 flex flex-col gap-4">
      <span className="text-xl">{name}</span>
      {amount || amount === 0 ? (
        <span
          className={`text-3xl font-medium ${
            amount < 0 ? "text-actions-danger" : "text-actions-success"
          }`}
        >
          {amount < 0
            ? `-${currencySymbol}${Math.abs(amount)}`
            : `${currencySymbol}${amount}`}
        </span>
      ) : (
        <div className="h-3 bg-gray-300 animate-pulse w-3/4"></div>
      )}
    </div>
  );
};

export default InfoCard;
