import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-4 py-2 text-md rounded-md w-full dark:bg-darkSecondary dark:border-black",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
