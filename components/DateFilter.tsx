"use client";
import { useTransactions } from "@/context/transactionsProvider";
import { addMonths } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker, {
  CalendarContainer,
  CalendarContainerProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
interface DateFilterProps {}

const DateFilter = ({}: DateFilterProps) => {
  const { setTransactions, transactions } = useTransactions();
  const [startDate, setStartDate] = useState(new Date(transactions.from));
  const [endDate, setEndDate] = useState(new Date(transactions.to));
  useEffect(() => {
    if (startDate && endDate) {
      setTransactions((oldTransactions) => {
        return {
          ...oldTransactions,
          from: startDate.toISOString(),
          to: endDate.toISOString(),
        };
      });
    }
  }, [startDate, endDate]);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="flex flex-wrap xs:flex-nowrap gap-[2px] sm:gap-3 items-center sm:mr-5 z-10">
      <button
        onClick={() => {
          setStartDate(addMonths(startDate, -1));
          setEndDate(addMonths(endDate, -1));
          setTransactions((old) => {
            return {
              ...old,
              from: addMonths(new Date(transactions.from), -1).toISOString(),
              to: addMonths(new Date(transactions.to), -1).toISOString(),
            };
          });
        }}
      >
        <IoChevronBack />
      </button>

      <DatePicker
        preventOpenOnFocus
        className="dark:bg-darkSecondary cursor-pointer p-3 rounded-lg text-sm focus-visible:outline-none focus-visible:border-0 focus-visible:m-0"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat={"dd.MM.yyyy"}
        calendarContainer={MyContainer}
      />

      <button
        onClick={() => {
          setStartDate(addMonths(startDate, 1));
          setEndDate(addMonths(endDate, 1));
          setTransactions((old) => {
            return {
              ...old,
              from: addMonths(new Date(transactions.from), 1).toISOString(),
              to: addMonths(new Date(transactions.to), 1).toISOString(),
            };
          });
        }}
      >
        <IoChevronForward />
      </button>
    </div>
  );
};

const MyContainer = ({ className, children }: CalendarContainerProps) => {
  return (
    <div className="bg-white dark:bg-darkPrimary p-4 flex rounded-lg border-black border shadow-lg">
      <CalendarContainer className={className}>{children}</CalendarContainer>
    </div>
  );
};

export default DateFilter;
