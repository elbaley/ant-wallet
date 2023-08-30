"use client";
import { getTransactionsData } from "@/lib/api";
import { Transaction } from "@prisma/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// TODO instead of harcoded currency list use Intl API!
export const CURRENCY_SYMBOLS = ["$", "€", "¥", "£", "₺"] as const;
export type TCurrencySymbol = (typeof CURRENCY_SYMBOLS)[number];

interface TransactionsState {
  transactions: Transaction[];
  from: string;
  to: string;
  totalAmount: number | null;
}

interface TransactionsContextValues {
  refetchTransactions: () => void;
  transactions: TransactionsState;
  setTransactions: Dispatch<SetStateAction<TransactionsState>>;
  currencySymbol: TCurrencySymbol;
  setCurrencySymbol: Dispatch<SetStateAction<TCurrencySymbol>>;
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

  const [currencySymbol, setCurrencySymbol] = useState<TCurrencySymbol>("₺");
  const [transactions, setTransactions] = useState<TransactionsState>({
    transactions: [],
    totalAmount: 0,
    from: fromFilter,
    to: toFilter,
  });

  const refetchTransactions = () => {
    getTransactionsData(transactions.from, transactions.to).then((response) => {
      setTransactions((oldTransactions) => {
        return {
          ...oldTransactions,
          totalAmount: response.totalAmount,
          transactions: response.transactions,
        };
      });
    });
  };

  // when from - to filter changes update refetch the transactions
  useEffect(() => {
    refetchTransactions();
  }, [transactions.from, transactions.to]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        refetchTransactions,
        currencySymbol,
        setCurrencySymbol,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  return context;
};
