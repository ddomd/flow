import { Fragment, useContext } from "react";
import { Link } from "@inertiajs/react";
import { Popover, Transition } from "@headlessui/react";
import { TagElement } from "@/types/board";
import { FilterContext } from "@/context/FilterContext";
import Container from "@/Components/Container";
import TrashIcon from "@/Icons/TrashIcon";
import FunnelIcon from "@/Icons/FunnelIcon";
import AddTagForm from "../Forms/AddTagForm";


export default function TagsPopover({
  id,
  tags,
}: {
  id: number;
  tags: TagElement[];
}) {
  const { getFilter, clearFilter } = useContext(FilterContext);

  return (
    <Popover className="relative">
      <Popover.Button
        aria-label="open tags menu"
        className="text-xs uppercase font-bold tracking-wider dark:text-white rounded-md h-7 px-1 w-auto select-none border dark:border-white shadow-slanted-xs dark:shadow-white transition duration-150 -translate-x-[0.15rem] -translate-y-[0.15rem] hover:translate-y-0 hover:translate-x-0 hover:shadow-none border-black focus:ring-0 active:ring-0 "
      >
        tags
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="z-50 absolute top-8 right-1">
          <Container className="p-3 w-48">
            <div className="mt-2 h-16 w-full">
              <Popover className="relative">
                <Popover.Button
                  aria-label="add tag button"
                  className="w-full py-1 uppercase text-xs font-bold dark:text-white border border-dashed border-black dark:border-white rounded-md"
                >
                  + new tag
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8">
                    {({ close }) => (
                      <Container className="w-64">
                        <AddTagForm boardId={id} closeForm={close} />
                      </Container>
                    )}
                  </Popover.Panel>
                </Transition>
              </Popover>
              <button
                aria-label="clear tag filter"
                type="button"
                className="w-full py-1 uppercase text-xs font-bold dark:text-white border border-dashed border-black dark:border-white rounded-md"
                onClick={() => clearFilter()}
              >
                clear filter
              </button>
            </div>
            <div className="mt-1 mb-3 flex items-center gap-x-1 dark:text-white">
              <FunnelIcon className="w-4 h-4" />
              <h3 className="text-sm">Filter tasks by tag</h3>
            </div>
            <div className="max-h-80 oveflow-y-scroll w-full flex flex-col gap-y-1">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex justify-evenly gap-x-2 items-center"
                >
                  <button
                    aria-label={`set ${tag.name} tag filter`}
                    type="button"
                    className=""
                    onClick={() => getFilter(tag.name)}
                  >
                    <FunnelIcon className="h-4 w-4 dark:text-white" />
                  </button>
                  <span
                    className={`inline-flex justify-center items-center w-full py-1 ${tag.color} rounded-md border border-black dark:border-white text-xs tracking-wide font-bold capitalize dark:text-white`}
                  >
                    {tag.name}
                  </span>
                  <Link
                    aria-label={`delete ${tag.name} tag button`}
                    as="button"
                    method="delete"
                    href={route("tags.delete", { tag: tag.id })}
                  >
                    <TrashIcon className="h-4 w-4 dark:text-white" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
