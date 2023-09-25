import { PropsWithChildren } from "react";

export default function Container({
  className,
  children,
}: PropsWithChildren<{ className: string }>) {
  return (
    <section
      className={
        `bg-orange-100 shadow-slanted-sm border-2 border-black rounded-md ` + className
      }
    >
      {children}
    </section>
  );
}
