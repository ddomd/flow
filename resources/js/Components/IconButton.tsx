import { ButtonHTMLAttributes } from "react";

export function IconButton({
  className = "",
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `p-1.5 border border-black dark:border-white rounded-full ${disabled ? "" : "shadow-slanted-xs dark:shadow-white -translate-x-[0.03rem] -translate-y-[0.03rem]"} hover:-translate-x-0 hover:-translate-y-0 hover:shadow-none transition duration-150 ` +
        className
      }
    >
      {children}
    </button>
  );
}
