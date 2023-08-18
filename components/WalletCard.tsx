import { IoWallet } from "react-icons/io5";

interface WalletCardProps {
  name: string;
  amount: number;
}

const WalletCard = ({ name, amount }: WalletCardProps) => {
  return (
    <div className="bg-white max-w-md rounded-xl shadow-lg pt-8 pl-8 pb-5 flex gap-4">
      <IoWallet size={55} className="text-actions-warning" />
      <div>
        <h2>{name}</h2>
        <h4>Cash</h4>
        <h1>${amount}</h1>
      </div>
    </div>
  );
};

export default WalletCard;
