"use client";
import SummaryCards from "@/components/SummaryCards";
import TransactionList from "@/components/TransactionList";
import DateFilter from "@/components/DateFilter";
import AddModal from "@/components/AddModal";

interface TransactionsPageProps {}

const TransactionsPage = ({}: TransactionsPageProps) => {
  return (
    <main className="pl-10 pt-9">
      <div className="flex justify-between pr-5">
        <h1 className="pb-3">Transactions</h1>
        <DateFilter />
      </div>
      <SummaryCards />
      <AddModal />

      <TransactionList />
    </main>
  );
};

export default TransactionsPage;
