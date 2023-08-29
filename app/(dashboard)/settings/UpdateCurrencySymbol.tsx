"use client";
import {
  CURRENCY_SYMBOLS,
  TCurrencySymbol,
  useTransactions,
} from "@/context/transactionsProvider";
import { Input } from "postcss";
import { IoChevronDown } from "react-icons/io5";

interface UpdateCurrencySymbolProps {}

const UpdateCurrencySymbol = ({}: UpdateCurrencySymbolProps) => {
  const { currencySymbol, setCurrencySymbol } = useTransactions();
  return (
    <form onSubmit={() => {}} className="flex flex-col gap-4 mt-4">
      <div className="relative">
        <select
          value={currencySymbol}
          onChange={(e) => {
            setCurrencySymbol(e.target.value as TCurrencySymbol);
          }}
          className="block appearance-none w-full bg-gray-200 dark:bg-darkPrimary border border-gray-200 dark:border-black text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none  focus:border-gray-500"
          id="transaction-type"
        >
          {CURRENCY_SYMBOLS.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <IoChevronDown className={"dark:text-white"} />
        </div>
      </div>
    </form>
  );
};

export default UpdateCurrencySymbol;
