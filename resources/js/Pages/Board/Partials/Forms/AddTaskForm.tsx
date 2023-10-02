import {
  FormEvent,
  FormEventHandler,
  MouseEvent,
  useContext,
  useState,
} from "react";
import { useForm } from "@inertiajs/react";
import { NotifyContext } from "@/context/NotifyContext";
import { debounce } from "@/utils/debounce";
import { TagElement } from "@/types/board";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextIcon from "@/Icons/TextIcon";
import TitleIcon from "@/Icons/TitleIcon";
import AddSubtaskPopover from "../Task/AddSubtaskPopover";
import TaskTagsPopover from "../Task/TaskTagsPopover";
import TagIcon from "@/Icons/TagIcon";

export default function AddTaskForm({
  columnId,
  boardId,
  boardTags,
  closeForm,
}: {
  columnId: string;
  boardId: number;
  boardTags: TagElement[];
  closeForm: () => void;
}) {
  const [tags, setTags] = useState<TagElement[]>([]);

  const subtasks: string[] = [];

  const { data, setData, errors, post, reset, processing } = useForm({
    title: "",
    description: "",
    subtasks: subtasks,
    tags: tags.map((tag) => tag.id),
    items: 0,
  });

  const { sendNotify } = useContext(NotifyContext);

  const addSubtask = (name: string) => {
    const newSubtasks = [...data.subtasks, name];
    setData("subtasks", newSubtasks);
  };

  const removeSubtask = (e: MouseEvent<HTMLButtonElement>) => {
    const index: number = Number(e.currentTarget.value);

    const newSubtasks = [
      ...data.subtasks.slice(0, index),
      ...data.subtasks.slice(index + 1),
    ];

    setData("subtasks", newSubtasks);
  };

  const attachTag = (tag: TagElement) => {
    if (tags.includes(tag)) {
      return;
    }

    const newTags = [...tags, tag];
    console.log(data.tags);
    setTags(newTags);
    setData(
      "tags",
      newTags.map((tag) => tag.id)
    );
  };

  const detachTag = (e: MouseEvent<HTMLButtonElement>) => {
    const index: number = Number(e.currentTarget.value);

    const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];

    setTags(newTags);

    setData(
      "tags",
      newTags.map((tag) => tag.id)
    );
  };

  const debouncedSubmit = debounce(() => {
    post(route("tasks.store", { board: boardId, column: columnId }), {
      onSuccess: () => {
        reset();
        sendNotify("Task created successfully", "success");
        closeForm();
      },
      onError: () => {
        if (errors.items) {
          reset();
          sendNotify("You can only create 40 cards", "fail");
          closeForm();
        }
      },
    });
  }, 200);

  const submitHandler: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    debouncedSubmit();
  };

  return (
    <form onSubmit={submitHandler} className="p-4 space-y-3 dark:text-white">
      <h2 className="text-center text-xl font-bold">New Task</h2>
      <div className="flex items-center gap-x-2">
        <TitleIcon className="h-5 w-5" />
        <InputLabel htmlFor="title" value="Title" />
      </div>

      <TextInput
        id="title"
        name="title"
        type="text"
        value={data.title}
        onChange={(e) => setData("title", e.target.value)}
        className="w-full"
        placeholder="Task title"
        autoFocus
      />
      <InputError message={errors.title} />

      <div className="flex items-center gap-x-2">
        <TextIcon className="h-5 w-5" />
        <InputLabel htmlFor="description" value="Description" />
      </div>
      <textarea
        id="description"
        name="description"
        className="w-full bg-transparent rounded-md h-24 border-solid border border-black dark:border-white dark:placeholder:text-gray-300 hover:border-amber-500 hover:dark:border-violet-600 focus:border-amber-500 focus:dark:border-violet-600 focus:ring-0 resize-none"
        placeholder="Task description..."
        value={data.description}
        onChange={(e) => setData("description", e.target.value)}
      ></textarea>

      <div className="flex items-center gap-x-3">
        <span className="text-lg">&#10003;</span>
        <h3 className="font-bold tracking-wide">Subtasks</h3>
      </div>
      <div className="flex flex-col w-full space-y-3">
        {data.subtasks.map((subtask, index) => (
          <div key={index} className="flex items-center space-x-3 ">
            <button
              type="button"
              value={index}
              className="text-2xl text-rose-600 font-bold"
              onClick={removeSubtask}
            >
              &ndash;
            </button>
            <span className="text-medium tracking-wide truncate font-medium ">
              {subtask}
            </span>
          </div>
        ))}
        <InputError message={errors.subtasks} />
        <AddSubtaskPopover
          subtasksLength={data.subtasks.length}
          submitForm={addSubtask}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-x-3">
          <TagIcon className="h-5 w-5" />
          <h2 className="tracking-wide font-bold">Tags</h2>
        </div>
        <ul className="flex flex-wrap space-x-2">
          {tags.map((tag, index) => (
            <li key={tag.id}>
              <button
                value={index}
                onClick={detachTag}
                className={`shrink-0 p-1 rounded-md ${tag.color} capitalize text-sm font-bold border border-black`}
              >
                &ndash; {tag.name}
              </button>
            </li>
          ))}
        </ul>
        <InputError message={errors.tags} />
        <TaskTagsPopover boardTags={boardTags} grabTag={attachTag} />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <SecondaryButton type="button" onClick={closeForm}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={processing}>
          Create Task
        </PrimaryButton>
      </div>
    </form>
  );
}
