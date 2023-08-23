import { Transaction } from "@prisma/client";
import { format } from "date-fns";
interface TransactionMonthProps {
  transactions: Transaction[];
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

const TransactionMonth = ({ transactions }: TransactionMonthProps) => {
  const monthName = format(new Date(transactions[0].date), "LLLL yyyy");
  return (
    <div className="max-w-4xl">
      <h2>{monthName}</h2>
      {transactions.map((transaction) => {
        return (
          <div
            key={transaction.id}
            className="bg-white rounded-lg text-xl px-3 py-7 flex gap-3 mt-2"
          >
            <span>{formatDate(transaction.date)}</span>
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
