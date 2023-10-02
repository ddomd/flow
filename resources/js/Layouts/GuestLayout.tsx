import ThemeSwitcher from "@/Components/ThemeSwitcher";
import ApplicationLogo from "@/Icons/ApplicationLogo";
import AnimatedBg from "@/Pages/AnimatedBg";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-orange-100 dark:bg-zinc-900">
      <ThemeSwitcher className="fixed right-3 top-3" />
      <div className="h-full flex flex-col justify-center items-center">
          <Link href="/" className="z-10">
            <ApplicationLogo className="sm:h-56 sm:w-56 w-40 h-40 z-10 dark:text-white" />
          </Link>
        <div className="sm:w-[90%] md:w-[80%] w-[95%] px-3 py-4 overflow-hidden bg-orange-100 dark:bg-zinc-900 rounded-md border-2 border-black dark:border-white shadow-slanted-sm dark:shadow-white z-10">
          {children}
        </div>
      </div>
      <AnimatedBg />
    </div>
  );
}
