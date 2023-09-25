import { useState, useEffect, PropsWithChildren, useContext } from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { NotifyContext } from "@/context/NotifyContext";
import BurgerIcon from "@/Icons/BurgerIcon";
import NavLogo from "@/Icons/NavLogo";
import Notification from "@/Components/Notification";

export default function Authenticated({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    //run animation on page load
    setShow(true);

    //reset animation on page close
  }, []);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const { notify, closeNotify } = useContext(NotifyContext);

  return (
    <>
      <div className="flex flex-col overflow-hidden h-screen">
        <header className="h-10 bg-orange-100 w-full">
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
                <NavLogo className="h-5" />
              </Link>
            </Transition.Child>

            <Transition.Child
              as="menu"
              enter="transform transition duration-[.3s] ease-in"
              enterFrom="opacity-0 translate-x-1/3"
              enterTo="opacity-100"
              className="hidden sm:block"
            >
              <ul className="flex space-x-6 text-sm uppercase tracking-wide">
                <li>
                  <Link
                    href={route("boards")}
                    className="hover:text-pastel-coral"
                  >
                    Boards
                  </Link>
                </li>
                <Link
                  href={route("profile.edit")}
                  className="hover:text-pastel-coral "
                >
                  Profile
                </Link>
                <Link
                  href={route("logout")}
                  method="post"
                  as="button"
                  className="hover:text-pastel-coral uppercase tracking-wide"
                >
                  Logout
                </Link>
              </ul>
            </Transition.Child>

            <Transition.Child
              as="button"
              enter="transform transition duration-[.3s] ease-in"
              enterFrom="opacity-0 translate-x-1/3"
              enterTo="opacity-100"
              className="block sm:hidden"
              onClick={showSidebar}
            >
              <BurgerIcon className="h-8 w-8" />
            </Transition.Child>

            {sidebar && (
              <>
                <div
                  className="absolute top-0 left-0 h-screen w-screen bg-black/40"
                  onClick={showSidebar}
                ></div>
                <Transition.Child
                  as="aside"
                  enter="transform transition duration-100 ease-in"
                  enterFrom="opacity-0 translate-x-2/3"
                  enterTo="opacity-100"
                  className="relative z-50 h-screen border-t border-l border-b border-neon-pink bg-black w-2/3 right-0 top-0"
                >
                  <nav className="h-full flex flex-col justify-center items-center">
                    <ul className="h-full flex flex-col items-center justify-center space-y-6 px-8 text-white">
                      <li>
                        <Link
                          onClick={showSidebar}
                          href={route("boards")}
                          className="hover:text-pastel-coral"
                        >
                          Boards
                        </Link>
                      </li>
                      <Link
                        onClick={showSidebar}
                        href={route("profile.edit")}
                        className="hover:text-pastel-coral"
                      >
                        Profile
                      </Link>
                      <Link
                        onClick={showSidebar}
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="hover:text-pastel-coral"
                      >
                        Logout
                      </Link>
                    </ul>
                  </nav>
                </Transition.Child>
              </>
            )}
          </Transition>
        </header>
        <main className="w-screen h-full overflow-hidden bg-orange-100">
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
