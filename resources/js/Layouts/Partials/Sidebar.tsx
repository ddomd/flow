import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import LeftArrowIcon from "@/Icons/LeftArrowIcon";
import LogoutIcon from "@/Icons/LogoutIcon";
import NavLogo from "@/Icons/NavLogo";
import TitleIcon from "@/Icons/TitleIcon";
import UserIcon from "@/Icons/UserIcon";

export default function Sidebar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <>
      <Transition.Child
        as="aside"
        enter="transform transition duration-100 ease-in"
        enterFrom="opacity-0 translate-x-2/3"
        enterTo="opacity-100"
        className="fixed z-50 h-screen flex flex-col space-y-4 bg-orange-100 dark:bg-zinc-900 w-1/2 right-0 top-0"
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className="h-10 w-16 px-2 top-0 -left-10 absolute bg-orange-100 dark:bg-zinc-900 rounded-md"
        >
          <LeftArrowIcon className="rotate-180 h-7 w-7" />
        </button>

        <NavLogo className="ml-4 h-32 w-32" />
        <nav className="">
          <ul className="h-full flex flex-col space-y-3 ml-4 tracking-wide font-medium">
            <li>
              <Link
                onClick={toggleSidebar}
                href={route("boards")}
                className="hover:text-amber-500 dark:hover:text-violet-600"
              >
                <div className="flex items-center gap-x-3">
                  <TitleIcon className="h-5 w-5" />
                  <span>Boards</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleSidebar}
                href={route("profile.edit")}
                className="hover:text-amber-500 dark:hover:text-violet-600"
              >
                <div className="flex items-center gap-x-3">
                  <UserIcon className="h-5 w-5" />
                  <span>Profile</span>
                </div>
              </Link>
            </li>

            <li>
              <Link
                onClick={toggleSidebar}
                href={route("logout")}
                method="post"
                as="button"
                className="hover:text-amber-500 dark:hover:text-violet-600"
              >
                <div className="flex items-center gap-x-3">
                  <LogoutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </Transition.Child>
      <div
        className="z-30 fixed top-0 left-0 h-screen w-screen bg-zinc-900/50"
        onClick={toggleSidebar}
      ></div>
    </>
  );
}
