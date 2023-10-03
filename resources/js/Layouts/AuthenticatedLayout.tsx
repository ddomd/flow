import {
  useState,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
} from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { NotifyContext } from "@/context/NotifyContext";
import BurgerIcon from "@/Icons/BurgerIcon";
import NavLogo from "@/Icons/NavLogo";
import Notification from "@/Components/Notification";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import Sidebar from "./Partials/Sidebar";

export default function Authenticated({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useLayoutEffect(() => {
    setShow(true);
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
              <Link aria-label="link to welcome page" href="/">
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

            {sidebar && <Sidebar toggleSidebar={toggleSidebar} />}
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
