import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import ApplicationLogo from "@/Icons/ApplicationLogo";
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Welcome({ auth }: PageProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    //run animation on page load
    setShow(true);
  }, []);

  return (
    <>
      <Head title="Welcome" />
      <div className="h-screen bg-light overflow-hidden">
        <Transition
          show={show}
          className="h-full flex flex-col justify-center items-center space-y-10"
        >
          <Transition.Child
            as="header"
            enter="transform transition duration-[.3s] ease-in"
            enterFrom="opacity-0 -translate-y-5 scale-90"
            enterTo="opacity-100 scale-100"
            className="-mt-24 flex flex-col items-center space-y-5"
          >
            <ApplicationLogo className="sm:h-80 sm:w-80 h-64 w-64" />
            
            <h2 className="w-[80%] text-center sm:text-xl text-lg font-medium tracking-wide">
              An humble Kanban app designed in a simple Neo-Brutalist style
            </h2>
          </Transition.Child>
          <Transition.Child
            as="nav"
            enter="transform transition duration-[.3s] ease-in"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            className="p-3 text-2xl space-y-4 flex flex-col justify-around items-center text-white tracking-wide"
          >
            {auth.user ? (
              <Link href={route("boards")} className="w-32 h-12">
                <PrimaryButton className="w-full h-full text-center">
                  Dashboard
                </PrimaryButton>
              </Link>
            ) : (
              <>
                <Link href={route("login")} className="w-32 h-12">
                  <PrimaryButton className="w-full h-full text-center">
                    Login &#8677;
                  </PrimaryButton>
                </Link>

                <Link href={route("register")} className="w-32 h-12">
                  <PrimaryButton className="w-full h-full text-center">
                    Register &#8677;
                  </PrimaryButton>
                </Link>
              </>
            )}
          </Transition.Child>
          <Transition.Child
            as="footer"
            enter="transform transition duration-[.3s] ease-in"
            enterFrom="opacity-0 translate-y-[90%] scale-90"
            enterTo="opacity-100 scale-100"
            className="bottom-5 text-center sm:text-lg text-md mt-8 absolute"
          >
            Built with &#128151; using Laravel and React
          </Transition.Child>
        </Transition>
      </div>
    </>
  );
}
