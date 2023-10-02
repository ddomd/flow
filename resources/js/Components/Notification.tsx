import { Status } from "@/types/notification";
import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

export default function Notification({
  message,
  status,
  duration,
  onClose,
}: {
  message: string;
  status: Status;
  duration: number;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShow(true);

    const timeout = setTimeout(() => {
      onClose();
    }, duration); 

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      clearTimeout(timeout);
      setShow(false);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Transition
      show={show}
      enter="transform transition duration-300 ease-in"
      enterFrom="opacity-0 translate-y-5 scale-25"
      enterTo="opacity-100 scale-100"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-orange-100 dark:bg-zinc-900 border border-black dark:border-white w-72 flex rounded-md"
      ref={notificationRef}
    >
      <div
        className={`${
          status === "success" ? "bg-green-400" : "bg-red-400"
        } w-3 rounded-l-md border-r border-black dark:border-white`}
      ></div>
      <p className="p-2 sm:text-base text-sm tracking-wide w-full">{message}</p>
    </Transition>
  );
}
