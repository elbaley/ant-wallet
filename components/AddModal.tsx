"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddTransactionForm from "./AddTransactionForm";
import Modal from "./Modal";

function AddModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Add transaction
      </button>
      <Modal title="Add transaction" closeModal={closeModal} isOpen={isOpen}>
        <AddTransactionForm mode="create" closeModal={closeModal} />
      </Modal>
    </>
  );
}
export default AddModal;
