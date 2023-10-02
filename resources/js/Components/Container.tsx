import { PropsWithChildren } from "react";

export default function Container({
  className,
  children,
}: PropsWithChildren<{ className: string }>) {
  return (
    <section
      className={
        `bg-orange-100 dark:bg-zinc-900 shadow-slanted-sm dark:shadow-white border-2 border-black dark:border-white rounded-md ` + className
      }
    >
      {children}
    </section>
  );
}
