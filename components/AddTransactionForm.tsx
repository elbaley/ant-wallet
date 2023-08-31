"use client";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { TRANSACTION_TYPE, Transaction } from "@prisma/client";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/lib/api";
import { delay } from "@/lib/delay";
import { useTransactions } from "@/context/transactionsProvider";

interface AddTransactionFormProps {
  mode: "create" | "update";
  closeModal(): void;
  transaction?: Transaction;
}

const AddTransactionForm = ({
  mode,
  closeModal,
  transaction,
}: AddTransactionFormProps) => {
  const { refetchTransactions } = useTransactions();
  const initialFormState: Partial<Transaction> = {
    type: "EXPENSE",
    category: "Food",
    description: "",
    amount: 0,
    date: new Date(),
  };
  const [formState, setFormState] = useState(transaction || initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (mode === "create") {
      await addTransaction(formState);
    } else {
      await updateTransaction(formState);
    }
    // await delay(800);
    setIsLoading(false);
    closeModal();
    refetchTransactions();
  }
  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <label
        className="block uppercase tracking-wide text-gray-700 dark:text-darkTextSecondary text-xs font-bold mb-2"
        htmlFor="transaction-type"
      >
        Type
      </label>
      <div className="relative">
        <select
          value={formState.type}
          onChange={(e) =>
            setFormState((old) => ({
              ...old,
              type: e.target.value as TRANSACTION_TYPE,
            }))
          }
          className="block appearance-none w-full bg-gray-200 dark:bg-darkSecondary dark:text-white dark:border-black border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none  focus:border-gray-500"
          id="transaction-type"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <IoChevronDown />
        </div>
      </div>
      <TransactionInput
        type="date"
        label="Date"
        id="transaction-date"
        value={formState.date?.toLocaleDateString("en-CA")}
        onChange={(e) =>
          setFormState((old) => ({
            ...old,
            date: e.target.valueAsDate as Date,
          }))
        }
      />
      <TransactionInput
        type="number"
        label="Amount"
        id="transaction-amount"
        value={
          formState.type === "EXPENSE"
            ? Math.abs(formState.amount as number) * -1
            : Math.abs(formState.amount as number)
        }
        onChange={(e) =>
          setFormState((old) => ({
            ...old,
            amount:
              formState.type === "EXPENSE"
                ? Math.abs(e.target.valueAsNumber) * -1
                : Math.abs(e.target.valueAsNumber),
          }))
        }
      />
      <TransactionInput
        label="Category"
        id="transaction-category"
        onChange={(e) =>
          setFormState((old) => ({
            ...old,
            category: e.target.value,
          }))
        }
        value={formState.category}
      />

      <TransactionInput
        label="Description"
        id="transaction-description"
        onChange={(e) =>
          setFormState((old) => ({
            ...old,
            description: e.target.value,
          }))
        }
        value={formState.description!}
      />
      <div className="flex">
        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-indigo-500 px-4 py-2 text-sm font-medium text-blue-900 dark:text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {isLoading ? (
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-white rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Add"
          )}
        </button>
        {mode === "update" ? (
          <button
            className="ml-auto mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-500 dark:bg-red-500 px-4 py-2 text-sm font-medium text-white dark:text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={async () => {
              if (transaction) {
                await deleteTransaction(transaction);
                closeModal();
                refetchTransactions();
              }
            }}
            type="button"
          >
            {isLoading ? (
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-white rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Delete"
            )}
          </button>
        ) : null}
      </div>
    </form>
  );
};

interface TransactionInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  label: string;
}
const TransactionInput = ({
  onChange,
  value,
  type,
  id,
  label,
}: TransactionInputProps) => {
  return (
    <div className="mb-3">
      <label
        className="block uppercase tracking-wide text-gray-700 dark:text-darkTextSecondary text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="block appearance-none w-full bg-gray-200 dark:bg-darkSecondary border border-gray-200 dark:border-black text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default AddTransactionForm;
