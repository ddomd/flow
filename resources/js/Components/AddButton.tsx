import { ButtonHTMLAttributes } from "react";

export default function AddButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center justify-center border border-black dark:border-white bg-amber-400 dark:bg-violet-600 dark:text-white text-lg font-bold h-7 w-7 text-center rounded-md shadow-slanted-xs dark:shadow-white transition duration-150 -translate-x-[0.10rem] -translate-y-[0.10rem] hover:translate-y-0 hover:translate-x-0 hover:shadow-none ` +
        className
      }
    >
      +
    </button>
  );
}
