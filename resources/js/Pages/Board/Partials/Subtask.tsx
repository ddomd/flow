import Checkbox from "@/Components/Checkbox";
import CheckIcon from "@/Icons/CheckIcon";
import { SubtaskElement } from "@/types/board";
import { Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Subtask({ subtask }: { subtask: SubtaskElement }) {
  const [edit, setEdit] = useState(false);
  const { data, setData, put, errors } = useForm({
    name: subtask.name,
    done: subtask.done,
  });

  const toggleEditMode = () => {
    setEdit(!edit);
  };

  const handleDelete = () => {
    router.delete(route("subtasks.delete", { id: subtask.id }));
  };

  const updateSubtask = () => {
    if (data.name === subtask.name) {
      return;
    }

    put(route("subtasks.edit", { id: subtask.id }), {
      onSuccess: toggleEditMode,
    });
  };

  const handleSubmit = () => {
    updateSubtask();
  };

  const enterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSubtask();
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3 w-3/4">
        <button
          type="button"
          className="text-2xl text-rose-600 font-bold"
          onClick={handleDelete}
        >
          &ndash;
        </button>
        {edit ? (
          <input
            id={subtask.id + "-name"}
            name={subtask.name}
            value={data.name}
            className="w-full bg-transparent border-none font-medium tracking-wide m-0 p-0 focus:ring-0 focus:border-black"
            onChange={(e) => setData("name", e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={enterSubmit}
            autoFocus
          />
        ) : (
          <span
            onClick={toggleEditMode}
            className="w-full text-medium tracking-wide font-medium select-none"
          >
            {subtask.name}
          </span>
        )}
      </div>
      <Link
        as="button"
        method="put"
        href={route("subtasks.done", { subtask: subtask.id })}
        data={{ done: !subtask.done }}
      >
        <CheckIcon
          className={`h-7 w-7 ${subtask.done ? "text-green-500" : "text-black"}`}
        />
      </Link>
    </div>
  );
}
