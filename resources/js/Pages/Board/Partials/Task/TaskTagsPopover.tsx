import Container from "@/Components/Container";
import SecondaryButton from "@/Components/SecondaryButton";
import { TagElement } from "@/types/board";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Fragment } from "react";

export default function TaskTagsPopover({
  boardTags,
  taskId,
  grabTag,
}: {
  boardTags: TagElement[];
  taskId?: number;
  grabTag?: (tag: TagElement) => void;
}) {
  return (
    <Popover className="relative w-full">
      <Popover.Button className="w-full bg-transparent text-xs text-center uppercase tracking-wide py-1 px-2 rounded-md border border-dashed border-black">
        + Add Tag
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute bottom-10">
          {({ close }) => (
            <Container className="w-52">
              <div className="p-4 w-full">
                <h3 className="text-sm font-medium mb-2">Available tags</h3>
                <ul className="my-1 flex gap-x-2 h-10 overflow-x-scroll column-scroll touch-pan-x">
                  {boardTags.map((tag) => (
                    <li key={tag.id} className="shrink-0">
                      {taskId && (
                        <Link
                          as="button"
                          method="put"
                          href={route("tags.attach", {
                            task: taskId,
                            tag: tag.id,
                          })}
                          className={`shrink-0 inline-flex items-center justify-center py-1 px-2 rounded-md ${tag.color} capitalize text-sm font-bold border border-black`}
                        >
                          &#65291; {tag.name}
                        </Link>
                      )}
                      {grabTag && (
                        <button
                          type="button"
                          className={`shrink-0 inline-flex items-center justify-center py-1 px-2 rounded-md ${tag.color} capitalize text-sm font-bold border border-black`}
                          onClick={() => grabTag(tag)}
                        >
                          &#65291; {tag.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <SecondaryButton
                  type="button"
                  className="mt-3"
                  onClick={() => close()}
                >
                  close
                </SecondaryButton>
              </div>
            </Container>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
