import ApplicationLogo from "@/Icons/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-light">
      <div className="h-full flex flex-col justify-center items-center">
        <div>
          <Link href="/">
            <ApplicationLogo className="sm:h-56 sm:w-56 w-40 h-40" />
          </Link>
        </div>

        <div className="sm:w-[90%] md:w-[80%] w-[95%] px-3 py-4 overflow-hidden bg-orange-100 rounded-md border-2 border-black shadow-slanted-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
