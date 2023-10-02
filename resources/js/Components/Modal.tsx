import { Fragment, PropsWithChildren, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  children,
  show = false,
  closeModal = () => null,
}: PropsWithChildren<{
  show: boolean;
  closeModal: () => void;
}>) {


  return (
    
    <Transition appear show={show} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-white/50 dark:bg-zinc-900/50" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-orange-100 dark:bg-zinc-900 text-left align-middle shadow-slanted-sm dark:shadow-white border-2 border-black dark:border-white transition-all">
              { children }
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  );
}
