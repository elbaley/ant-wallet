"use client";
import InfoCard from "@/components/InfoCard";
import { useTransactions } from "@/context/transactionsProvider";
import { useEffect, useState } from "react";

type TSummaryValues = {
  currentBalance: number | null;
  periodChange: number | null;
  periodExpenses: number | null;
  periodIncomes: number | null;
};
interface SummaryCardsProps {}

const SummaryCards = ({}: SummaryCardsProps) => {
  const { transactions } = useTransactions();
  const [summaryValues, setSummaryValues] = useState<TSummaryValues>({
    currentBalance: null,
    periodChange: null,
    periodExpenses: null,
    periodIncomes: null,
  });
  useEffect(() => {
    const results = transactions.transactions.reduce(
      (sum: any, current: any) => {
        if (current.type === "EXPENSE") {
          sum = {
            ...sum,
            periodExpenses: sum.periodExpenses + current.amount,
          };
        } else if (current.type === "INCOME") {
          sum = {
            ...sum,
            periodIncomes: sum.periodIncomes + current.amount,
          };
        }
        sum = { ...sum, periodChange: sum.periodChange + current.amount };
        return sum;
      },
      {
        periodChange: 0,
        periodExpenses: 0,
        periodIncomes: 0,
        currentBalance: transactions.totalAmount,
      },
    );
    setSummaryValues(results);
  }, [transactions]);

  return (
    <div className="flex gap-2 py-3 overflow-x-scroll">
      <InfoCard name="Current Balance" amount={summaryValues.currentBalance} />
      <InfoCard name="Period Change" amount={summaryValues.periodChange} />
      <InfoCard name="Period Expenses" amount={summaryValues.periodExpenses} />
      <InfoCard name="Period Incomes" amount={summaryValues.periodIncomes} />
    </div>
  );
};

export default SummaryCards;
