import { Transaction } from "@prisma/client";
import Modal from "./Modal";
import { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";

interface TransactionProps {
  transaction: Transaction;
  month: string;
  day: string;
}

const Transaction = ({ transaction, month, day }: TransactionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // test for issue
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        key={transaction.id}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            openModal();
          }
        }}
        role='button'
        tabIndex={0}
        onClick={openModal}
        className='hover:bg-opacity-20 cursor-pointer bg-white dark:bg-darkSecondary rounded-lg text-xl px-4 py-4 flex flex-wrap gap-3 mt-2 items-center shadow-sm'
      >
        <div className='block rounded-t  bg-white dark:bg-darkSecondary text-center w-16 h-16'>
          <div className='text-sm bg-red-500 text-white py-1'>{month}</div>
          <div className='pt-1 border-l border-r border-b dark:border-black'>
            <span className='text-2xl font-bold w-[2ch]'>{day}</span>
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
      <Modal title='Edit transaction' closeModal={closeModal} isOpen={isOpen}>
        <AddTransactionForm
          mode='update'
          transaction={{ ...transaction, date: new Date(transaction.date) }}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default Transaction;
