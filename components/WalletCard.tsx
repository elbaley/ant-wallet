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
    <div className="bg-white max-w-md rounded-xl shadow-lg pt-8 pl-8 pb-5 flex gap-4">
      <IoWallet size={55} className="text-actions-warning" />
      <div>
        <h2>{name}</h2>
        <h4>Cash</h4>
        {amount ? (
          <h1>
            {amount < 0 && "-"}
            {currencySymbol}
            {Math.abs(amount)}
          </h1>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
