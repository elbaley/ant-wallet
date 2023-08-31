"use client";
import { useTransactions } from "@/context/transactionsProvider";
import { IoWallet } from "react-icons/io5";

interface WalletCardProps {
  name: string;
  amount: number | null;
}

const WalletCard = ({ name, amount }: WalletCardProps) => {
  const { currencySymbol } = useTransactions();
  return (
    <div className="bg-white dark:bg-darkSecondary max-w-md rounded-xl shadow-lg pt-8 pl-2 xs:pl-8 pb-5 flex gap-4">
      <IoWallet size={55} className="text-actions-warning" />
      <div>
        <h2>{name}</h2>
        <h4>Cash</h4>
        <h1>{amount ? currencySymbol + amount : currencySymbol + 0}</h1>
      </div>
    </div>
  );
};

export default WalletCard;
