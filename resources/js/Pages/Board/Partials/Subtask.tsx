import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { debounce } from "@/utils/debounce";
import { SubtaskElement } from "@/types/board";
import CheckIcon from "@/Icons/CheckIcon";
import InputError from "@/Components/InputError";

export default function Subtask({ subtask }: { subtask: SubtaskElement }) {
  const [edit, setEdit] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const { data, setData, put, errors } = useForm({
    name: subtask.name,
    done: subtask.done,
  });

  const toggleEditMode = () => {
    setEdit(!edit);
  };

  const debouncedDelete = debounce(() => {
    router.delete(route("subtasks.delete", { id: subtask.id }), {
      onStart: () => setDisableButton(true),
      onFinish: () => setDisableButton(false),
    });
  }, 200);

  const handleDelete = () => debouncedDelete();

  const debouncedDone = debounce(() => {
    router.put(
      route("subtasks.done", { subtask: subtask.id }),
      {
        done: !subtask.done,
      },
      {
        onStart: () => setDisableButton(true),
        onFinish: () => setDisableButton(false),
      }
    );
  }, 200);

  const handleDone = () => debouncedDone();

  const updateSubtask = () => {
    if (data.name === subtask.name) {
      return;
    }

    put(route("subtasks.edit", { id: subtask.id }), {
      onStart: () => setDisableButton(true),
      onFinish: () => setDisableButton(false),
      onSuccess: toggleEditMode,
    });
  };

  const handleBlur = () => {
    updateSubtask();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSubtask();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3 w-[90%]">
          <button
            type="button"
            className="text-2xl text-rose-600 font-bold"
            onClick={handleDelete}
            disabled={disableButton}
          >
            &ndash;
          </button>
          {edit ? (
            <input
              id={subtask.id + "-name"}
              name={subtask.name}
              value={data.name}
              className="h-7 px-0 mx-0 w-full bg-transparent border-none font-medium tracking-wide focus:ring-0 focus:border-black select-text"
              onChange={(e) => setData("name", e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <button
              type="button"
              className="px-0 mx-0 text-left w-full text-medium tracking-wide font-medium select-none overflow-x-scroll column-scroll"
              onClick={toggleEditMode}
              disabled={disableButton}
            >
              {subtask.name}
            </button>
          )}
        </div>

        <button type="button" onClick={handleDone} disabled={disableButton}>
          <CheckIcon
            className={`h-7 w-7 ${
              subtask.done ? "text-green-500" : "text-black dark:text-white"
            }`}
          />
        </button>
      </div>
      <InputError message={errors.name} />
    </>
  );
}
