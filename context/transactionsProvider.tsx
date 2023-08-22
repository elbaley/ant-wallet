"use client";
import { getTransactionsData } from "@/lib/api";
import { Transaction } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionsState {
  transactions: Transaction[];
  from: string;
  to: string;
  totalAmount: number | null;
}

interface TransactionsContextValues {
  transactions: TransactionsState;
  setTransactions: Dispatch<SetStateAction<TransactionsState>>;
}

const TransactionsContext = createContext({} as TransactionsContextValues);

export const TransactionsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const monthWithZero = month < 10 ? `0${month}` : month;
  const fromFilter = `${year}-${monthWithZero}-01`;
  const toFilter = `${year}-${monthWithZero}-${lastDayOfMonth}`;

  const [transactions, setTransactions] = useState<TransactionsState>({
    transactions: [],
    totalAmount: null,
    from: fromFilter,
    to: toFilter,
  });

  // when from - to filter changes update refetch the transactions
  useEffect(() => {
    getTransactionsData(transactions.from, transactions.to).then((response) => {
      setTransactions((oldTransactions) => {
        return {
          ...oldTransactions,
          totalAmount: response.totalAmount,
          transactions: response.transactions,
        };
      });
    });
  }, [transactions.from, transactions.to]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  return context;
};
