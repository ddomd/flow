import { ColumnElement, TagElement } from "@/types/board";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Task from "../Task/Task";
import Modal from "@/Components/Modal";
import AddTaskForm from "@/Pages/Board/Partials/Forms/AddTaskForm";
import { useModal } from "@/hooks/useModal";
import ColumnHeader from "./ColumnHeader";
import SecondaryButton from "@/Components/SecondaryButton";
import { memo, useContext } from "react";
import { FilterContext } from "@/context/FilterContext";

function Column({
  column,
  boardTags,
  index,
}: {
  column: ColumnElement;
  boardTags: TagElement[];
  index: number;
}) {
  const { modal, showModal, closeModal } = useModal();

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      index: index,
      column,
    },
  });

  const { filter } = useContext(FilterContext);

  const filteredTasks =
    filter !== ""
      ? column.tasks.filter((task) =>
          task.tags.some((tag) => tag.name === filter)
        )
      : column.tasks;

  return (
    <div className="py-2 shrink-0 w-[18rem] flex flex-col items-center space-y-3">
      <ColumnHeader
        name={column.name}
        color={column.color}
        id={column.id}
        length={column.tasks.length}
      />

      <div
        ref={setNodeRef}
        className="w-full px-3 flex flex-col space-y-2 items-center h-full overflow-y-scroll task-scroll"
      >
        <SortableContext items={filteredTasks}>
          {filteredTasks.map((task, index) => (
            <Task
              key={task.id}
              index={index}
              task={task}
              boardTags={boardTags}
              disabled={filter !== ""}
            />
          ))}
        </SortableContext>
      </div>
      {filter === "" ? (
        <SecondaryButton onClick={showModal} className="w-[17rem] h-11">
          + New Task
        </SecondaryButton>
      ) : (
        <></>
      )}

      <Modal show={modal} closeModal={closeModal}>
        <AddTaskForm closeForm={closeModal} columnId={column.id} boardId={column.board_id} boardTags={boardTags} />
      </Modal>
    </div>
  );
}

export default memo(Column);
