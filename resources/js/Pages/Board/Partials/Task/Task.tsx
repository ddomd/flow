import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useModal } from "@/hooks/useModal";
import { TagElement, TaskElement } from "@/types/board";
import Modal from "@/Components/Modal";
import TaskModal from "./TaskModal";
import Tag from "../Tag";

export default function Task({
  active = false,
  disabled,
  task,
  boardTags,
  index,
}: {
  active?: boolean;
  disabled: boolean;
  task: TaskElement;
  boardTags: TagElement[];
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setDroppableNodeRef,
  } = useSortable({
    id: task.id,
    disabled: disabled,
    data: { type: "Task", index: index, task },
  });

  const { modal, showModal, closeModal } = useModal();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const subtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.done
  ).length;

  if (isDragging) {
    return (
      <div
        ref={setDroppableNodeRef}
        style={style}
        className="shrink-0 bg-transparent border-2 border-dashed border-black dark:border-white p-3 h-36 w-full rounded-md"
      ></div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${
          active ? "shadow-slanted-sm" : ""
        } bg-orange-100 dark:bg-zinc-900 shrink-0 p-3 w-full h-38 border-2 ${
          disabled
            ? "border-rose-400 cursor-pointer"
            : "border-black dark:border-white cursor-grab"
        } rounded-md touch-manipulation`}
        onClick={showModal}
      >
        <h3 className="dark:text-white text-base font-medium tracking-wide w-full truncate">
          {task.title}
        </h3>
        <p className="mt-3 text-sm text-zinc-700 dark:text-gray-300 truncate">
          {task.description}
        </p>
        <p className="mt-4 text-xs tracking-wide dark:text-white">
          {subtasks > 0
            ? `Tasks completed ${completedSubtasks} of ${subtasks}`
            : "No tasks left to do"}
        </p>
        <ul className="mt-4 flex space-x-3 overflow-x-scroll">
          {task.tags.map((tag) => (
            <li
              key={tag.id}
            >
              <Tag tag={tag} type="show" size="xs"/>
            </li>
          ))}
        </ul>
      </div>
      <Modal show={modal} closeModal={closeModal}>
        <TaskModal task={task} closeForm={closeModal} boardTags={boardTags} />
      </Modal>
    </>
  );
}
