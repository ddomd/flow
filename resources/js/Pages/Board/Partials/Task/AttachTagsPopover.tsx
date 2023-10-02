import Container from "@/Components/Container";
import SecondaryButton from "@/Components/SecondaryButton";
import { TagElement, TaskElement } from "@/types/board";
import { debounce } from "@/utils/debounce";
import { Popover, Transition } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { Fragment, useState } from "react";
import Tag from "../Tag";

export default function AttachTagsPopover({
  boardTags,
  task,
  grabTag,
}: {
  boardTags: TagElement[];
  task?: TaskElement;
  grabTag?: (tag: TagElement) => void;
}) {
  const [disableButton, setDisableButton] = useState(false);

  const debouncedAttach = debounce((tag) => {
    if (task) {
      router.put(
        route("tags.attach", { task: task.id, tag: tag.id }),
        {},
        {
          onStart: () => setDisableButton(true),
          onFinish: () => setDisableButton(false),
        }
      );
    }
  }, 200);

  const handleAttachTag = task
    ? (tag: TagElement) => {
        if (task.tags.some((taskTag) => taskTag.id === tag.id)) return;
        debouncedAttach(tag);
      }
    : grabTag;

  return (
    <Popover className="relative w-full">
      <Popover.Button className="w-full bg-transparent text-xs text-center font-bold dark:text-white uppercase tracking-wide py-1 px-2 rounded-md border border-dashed border-black dark:border-white">
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
                    <li key={tag.id} className="shrink-0 text-black">
                      <Tag
                        tag={tag}
                        type="attach"
                        handleTag={handleAttachTag}
                        disabled={disableButton}
                      />
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
