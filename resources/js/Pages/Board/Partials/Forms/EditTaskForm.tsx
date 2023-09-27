import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextIcon from "@/Icons/TextIcon";
import TitleIcon from "@/Icons/TitleIcon";
import { TagElement, TaskElement } from "@/types/board";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent, FormEventHandler } from "react";
import Subtask from "../Subtask";
import EditSubtaskPopover from "../Task/EditSubtaskPopover";
import TaskTagsPopover from "../Task/TaskTagsPopover";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import { useModal } from "@/hooks/useModal";
import DeleteTaskForm from "./DeleteTaskForm";

export default function EditTaskForm({
  task,
  boardTags,
  closeForm,
}: {
  task: TaskElement;
  boardTags: TagElement[];
  closeForm: () => void;
}) {
  const { data, setData, errors, put, reset } = useForm({
    title: task.title,
    description: task.description,
  });

  const { modal, showModal, closeModal } = useModal();

  const submitTextFields: FormEventHandler = (e: FormEvent) => {
    if (data.title === task.title && data.description === task.description) {
      return;
    }

    put(route("tasks.edit", { task: task.id }), {
      onSuccess: () => {},
    });
  };

  return (
    <section className="flex flex-col p-4 space-y-3 h-auto">
      <div className="flex items-center mb-6">
        <TitleIcon className="h-5 w-5" />
        <TextInput
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={(e) => setData("title", e.target.value)}
          className="w-full border-none text-xl font-bold tracking-wide"
          placeholder="Task title"
          onBlur={submitTextFields}
          autoFocus
        />
      </div>

      <InputError message={errors.title} />
      <div className="flex items-center gap-x-3">
        <TextIcon className="h-5 w-5" />
        <InputLabel htmlFor="description" value="Description" />
      </div>
      <textarea
        id="description"
        name="description"
        className="bg-transparent resize-none w-full h-32 rounded-md border-none focus:ring-0 overflow-scroll-y task-scroll"
        placeholder="Task description..."
        value={data.description}
        onChange={(e) => setData("description", e.target.value)}
        onBlur={submitTextFields}
      ></textarea>

      <div className="flex items-center gap-x-3">
        <span className="text-lg">&#10003;</span>
        <h3 className="tracking-wide font-bold">Subtasks</h3>
      </div>
      <div className="flex flex-col w-full space-y-3">
        {task.subtasks.map((subtask) => (
          <Subtask key={subtask.id} subtask={subtask} />
        ))}
        <EditSubtaskPopover taskId={task.id} />
      </div>

      <div className="space-y-2">
        <h2 className="tracking-wide font-bold">{"# Tags"}</h2>
        <ul className="flex flex-wrap space-x-2">
          {task.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                as="button"
                method="put"
                href={route("tags.detach", { task: task.id, tag: tag.id })}
                className={`shrink-0 p-1 rounded-md ${tag.color} capitalize text-sm font-bold border border-black`}
              >
                &ndash; {tag.name}
              </Link>
            </li>
          ))}
        </ul>
        <TaskTagsPopover boardTags={boardTags} taskId={task.id} />
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <DangerButton type="button" onClick={showModal}>
          delete
        </DangerButton>
        <SecondaryButton type="button" onClick={closeForm}>
          close
        </SecondaryButton>
      </div>

      <Modal show={modal} closeModal={closeModal}>
        <DeleteTaskForm id={task.id} name={task.title} closeForm={closeModal} />
      </Modal>
    </section>
  );
}
