import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useModal } from "@/hooks/useModal";
import { TagElement, TaskElement } from "@/types/board";
import Modal from "@/Components/Modal";
import TaskModal from "./TaskModal";

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
        className="shrink-0 bg-transparent border-2 border-dashed border-black p-3 h-36 w-full rounded-md"
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
        } bg-orange-100 shrink-0 p-3 w-full h-36 border-2 ${
          disabled
            ? "border-rose-400 cursor-pointer"
            : "border-black cursor-grab"
        } rounded-md touch-manipulation`}
        onClick={showModal}
      >
        <h3 className="text-base font-medium tracking-wide w-full truncate">
          {task.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-700 truncate">
          {task.description}
        </p>
        <p className="mt-2 text-xs tracking-wide">
          {subtasks > 0
            ? `Tasks completed ${completedSubtasks} of ${subtasks}`
            : "No tasks left to do"}
        </p>
        <ul className="mt-3 flex space-x-3 overflow-x-scroll">
          {task.tags.map((tag) => (
            <li
              key={tag.id}
              className={`px-2 py-1 text-xs font-bold capitalize tracking-wide ${tag.color} border border-black rounded-md`}
            >
              {tag.name}
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
