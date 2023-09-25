import { Popover, Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";

export default function PopoverButton({
  children,
  className,
  name,
}: PropsWithChildren<{ name: string | JSX.Element; className: string }>) {
  return (
    <div className={`relative ` + className}>
      <Popover className="w-full relative">
        {({ open }) => (
          <>
            <Popover.Button>{name}</Popover.Button>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <Popover.Panel className="absolute left-1/2 z-10 w-32 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="p-3 bg-white overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  {children}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
