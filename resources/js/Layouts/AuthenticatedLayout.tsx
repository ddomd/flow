import { useState, useEffect, PropsWithChildren, useContext } from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { NotifyContext } from "@/context/NotifyContext";
import BurgerIcon from "@/Icons/BurgerIcon";
import NavLogo from "@/Icons/NavLogo";
import Notification from "@/Components/Notification";
import LeftArrowIcon from "@/Icons/LeftArrowIcon";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import TitleIcon from "@/Icons/TitleIcon";
import UserIcon from "@/Icons/UserIcon";
import LogoutIcon from "@/Icons/LogoutIcon";

export default function Authenticated({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    //run animation on page load
    setShow(true);

    //reset animation on page close
  }, []);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const { notify, closeNotify } = useContext(NotifyContext);

  return (
    <>
      <div className="flex flex-col overflow-hidden h-screen">
        <header className="h-10 bg-orange-100 dark:bg-zinc-900 dark:text-white w-full">
          <Transition
            as="nav"
            show={show}
            className="sm:py-2 py-1 px-4 flex items-center justify-between"
          >
            <Transition.Child
              enter="transform transition duration-[.3s] ease-in"
              enterFrom="opacity-0 -translate-x-1/3"
              enterTo="opacity-100"
            >
              <Link href="/">
                <NavLogo className="sm:-translate-y-1 h-5 dark:text-white" />
              </Link>
            </Transition.Child>

            <Transition.Child
              as="menu"
              enter="transform transition duration-[.3s] ease-in"
              enterFrom="opacity-0 translate-x-1/3"
              enterTo="opacity-100"
            >
              <ul className="flex space-x-4 text-base font-medium tracking-wide">
                <li>
                  <Link
                    href={route("boards")}
                    className="hidden sm:block hover:text-amber-500 dark:hover:text-violet-600"
                  >
                    Boards
                  </Link>
                </li>
                <li>
                  <Link
                    href={route("profile.edit")}
                    className="hidden sm:block hover:text-amber-500 dark:hover:text-violet-600 "
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="hidden sm:block hover:text-amber-500 dark:hover:text-violet-600"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="block sm:hidden"
                    onClick={toggleSidebar}
                  >
                    <BurgerIcon className="h-7 w-7" />
                  </button>
                </li>
                <li>
                  <ThemeSwitcher />
                </li>
              </ul>
            </Transition.Child>

            {sidebar && (
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
            )}
          </Transition>
        </header>
        <main className="w-screen h-full overflow-hidden bg-orange-100 dark:bg-zinc-900">
          {children}
          {notify.show && (
            <Notification
              status={notify.status}
              message={notify.message}
              duration={notify.duration}
              onClose={closeNotify}
            />
          )}
        </main>
      </div>
    </>
  );
}
