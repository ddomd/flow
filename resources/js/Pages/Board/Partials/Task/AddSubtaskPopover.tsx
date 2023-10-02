import Container from "@/Components/Container";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AddSubtaskForm from "../Forms/AddSubtaskForm";

export default function AddSubtaskPopover({
  subtasksLength,
  submitForm,
}: {
  subtasksLength: number;
  submitForm: (name: string) => void;
}) {
  return (
    <Popover className="relative">
      <Popover.Button className="w-full py-1 uppercase text-xs font-bold dark:text-white border border-dashed border-black dark:border-white rounded-md">
        + Add Subtask
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-[1s]"
        enterFrom="opacity-0 -translate-y-3"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute bottom-10 z-50">
          {({ close }) => (
            <Container className="h-auto w-auto">
              <AddSubtaskForm
                subtasksLength={subtasksLength}
                submitForm={submitForm}
                closeForm={close}
              />
            </Container>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
