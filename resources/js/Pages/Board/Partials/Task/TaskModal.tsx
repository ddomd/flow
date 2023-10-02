import { FormEvent, FormEventHandler, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { TagElement, TaskElement } from "@/types/board";
import { useModal } from "@/hooks/useModal";
import { debounce } from "@/utils/debounce";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextIcon from "@/Icons/TextIcon";
import TitleIcon from "@/Icons/TitleIcon";
import Subtask from "../Subtask";
import EditSubtaskPopover from "./EditSubtaskPopover";
import TaskTagsPopover from "./TaskTagsPopover";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import Tag from "../Tag";
import DeleteForm from "../Forms/DeleteForm";
import TagIcon from "@/Icons/TagIcon";

export default function TaskModal({
  task,
  boardTags,
  closeForm,
}: {
  task: TaskElement;
  boardTags: TagElement[];
  closeForm: () => void;
}) {
  const [disableButton, setDisableButton] = useState(false);
  const { data, setData, errors, put, reset } = useForm({
    title: task.title,
    description: task.description ? task.description : "",
  });

  const { modal, showModal, closeModal } = useModal();

  const submitTextFields: FormEventHandler = (e: FormEvent) => {
    if (data.title === task.title && data.description === task.description)
      return;

    if (
      data.title === task.title &&
      task.description === null &&
      data.description === ""
    )
      return;

    put(route("tasks.edit", { task: task.id }));
  };

  const debouncedDetach = debounce((tag: TagElement) => {
    router.put(
      route("tags.detach", { task: task.id, tag: tag.id }),
      {},
      {
        onStart: () => setDisableButton(true),
        onFinish: () => setDisableButton(false),
      }
    );
  }, 200);

  const handleDetachTag = (tag: TagElement) => debouncedDetach(tag);

  return (
    <section className="flex flex-col p-4 space-y-3 h-auto dark:text-white">
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
        className="bg-transparent resize-none w-full h-32 dark:placeholder:text-gray-300 rounded-md border-none focus:ring-0 overflow-scroll-y task-scroll"
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
        <div className="flex items-center gap-x-3">
          <TagIcon className="h-5 w-5" />
          <h2 className="tracking-wide font-bold">Tags</h2>
        </div>
        <ul className="flex flex-wrap space-x-2">
          {task.tags.map((tag) => (
            <li key={tag.id}>
              <Tag
                tag={tag}
                type="detach"
                handleTag={(tag) => handleDetachTag(tag)}
                disabled={disableButton}
              />
            </li>
          ))}
        </ul>
        <TaskTagsPopover boardTags={boardTags} task={task} />
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
        <DeleteForm
          id={task.id}
          name={task.title}
          model="task"
          closeForm={closeModal}
        />
      </Modal>
    </section>
  );
}
