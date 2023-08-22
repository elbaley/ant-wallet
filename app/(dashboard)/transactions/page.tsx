import SummaryCards from "@/components/SummaryCards";
import TransactionList from "@/components/TransactionList";
import DateFilter from "@/components/DateFilter";

interface TransactionsPageProps { }

const TransactionsPage = async ({ }: TransactionsPageProps) => {
  return (
    <main className="pl-10 pt-9">
      <div className="flex justify-between pr-5">
        <h1 className="pb-3">Transactions</h1>
        <DateFilter />
      </div>
      <SummaryCards />
      <TransactionList />
    </main>
  );
};

export default TransactionsPage;
