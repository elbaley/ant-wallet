import { useTransactions } from "@/context/transactionsProvider";
import { Transaction } from "@prisma/client";
import TransactionMonth from "./TransactionMonth";

interface TransactionListProps {}

const TransactionList = ({}: TransactionListProps) => {
  const { transactions } = useTransactions();
  const transactionsGroupedByMonth = transactions.transactions.reduce(
    (acc: { [key: string]: Transaction[] }, current) => {
      const date = new Date(current.date);
      const currentMonth = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (acc[currentMonth]) {
        // if the month is present push the new transaction
        acc[currentMonth].push(current);
      } else {
        // if the month is not present create it
        acc[currentMonth] = [current];
      }
      return acc;
    },
    {},
  );
  const transactionMonthComponents = Object.entries(
    transactionsGroupedByMonth,
  ).map(([month, transactionsInMonth]) => (
    <TransactionMonth key={month} transactions={transactionsInMonth} />
  ));

  return <div className="mt-7">{transactionMonthComponents}</div>;
};

export default TransactionList;
