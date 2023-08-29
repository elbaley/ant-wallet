import { Transaction } from "@prisma/client";
import { format } from "date-fns";
interface TransactionMonthProps {
  transactions: Transaction[];
}

function formatDate(date: Date) {
  return {
    month: new Date(date).toLocaleDateString("en-us", { month: "short" }),
    day: new Date(date).getDate(),
  };
}

const TransactionMonth = ({ transactions }: TransactionMonthProps) => {
  const monthName = format(new Date(transactions[0].date), "LLLL yyyy");
  return (
    <div className="max-w-4xl">
      <h2>{monthName}</h2>
      {transactions.map((transaction) => {
        const { month, day } = formatDate(transaction.date);
        return (
          <div
            key={transaction.id}
            className="bg-white dark:bg-darkSecondary rounded-lg text-xl px-4 py-4 flex gap-3 mt-2 items-center shadow-sm"
          >
            <div className="block rounded-t  bg-white dark:bg-darkSecondary text-center w-16 h-16">
              <div className="text-sm bg-red-500 text-white py-1">{month}</div>
              <div className="pt-1 border-l border-r border-b dark:border-black">
                <span className="text-2xl font-bold w-[2ch]">{day}</span>
              </div>
            </div>
            <span>{transaction.category}</span>
            <span>{transaction.description}</span>
            <span
              className={`font-bold ml-auto ${
                transaction.type === "EXPENSE"
                  ? "text-actions-danger"
                  : "text-actions-success"
              }`}
            >
              {transaction.type === "EXPENSE" ? "-" : "+"}$
              {Math.abs(transaction.amount)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionMonth;
