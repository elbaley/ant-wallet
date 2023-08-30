import { Transaction as TTransaction } from "@prisma/client";
import { format } from "date-fns";
import Transaction from "./Transaction";
interface TransactionMonthProps {
  transactions: TTransaction[];
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
          <Transaction
            key={transaction.id}
            transaction={transaction}
            month={month}
            day={day.toString()}
          />
        );
      })}
    </div>
  );
};

export default TransactionMonth;
