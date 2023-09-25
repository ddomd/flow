import { PropsWithChildren } from "react";

export default function HeaderMenu({ children }: PropsWithChildren) {
  return (
    <nav className={"h-12 bg-orange-100 w-full py-2 px-3 border-2 shadow-slanted-sm border-black rounded-md text-lg flex justify-between items-center"}>
      {children}
    </nav>
  );
}
