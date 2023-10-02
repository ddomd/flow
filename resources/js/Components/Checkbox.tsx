import { InputHTMLAttributes } from "react";

export default function Checkbox({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        "rounded-sm border-black text-amber-400 dark:text-violet-600 focus:ring-2 focus:ring-black focus:dark:ring-white" +
        className
      }
    />
  );
}
