import { BoardElement } from "@/types/board";
import { Link, useForm } from "@inertiajs/react";
import { useContext, useState } from "react";
import CardMenu from "./CardMenu";
import { NotifyContext } from "@/context/NotifyContext";

export default function BoardCard({ board }: { board: BoardElement }) {
  const { put, data, setData, reset, errors, processing } = useForm({
    name: board.name,
  });

  const [edit, setEdit] = useState(false);
  const { sendNotify } = useContext(NotifyContext);

  const toggleEditMode = () => setEdit(!edit);

  const sendData = () => {
    if (data.name === board.name) {
      toggleEditMode();
      return;
    }

    put(route("boards.edit", { board: board.id }), {
      onSuccess: () => {
        toggleEditMode();
        sendNotify("Board edited successfully", "success");
      },
      onError: () => {
        toggleEditMode();
        reset();
        sendNotify("Failed to edit board", "fail");
      },
    });
  };

  const blurSubmit = () => sendData();

  const enterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendData();
    }
  };

  return (
    <li className="relative flex w-full border-t border-black dark:border-white">
      <div className="flex items-center p-3 space-x-3 w-full">
        <Link
          as="button"
          href={route("boards.show", { board: board.id })}
          className="rounded-lg sm:h-20 sm:w-24 h-12 w-16 bg-blue-400 dark:bg-yellow-500 border border-black"
        ></Link>
        <div className="flex flex-col w-2/5">
          {edit ? (
            <input
              id="board-name"
              name="board-name"
              value={data.name}
              className="h-5 p-0 bg-transparent sm:text-base text-sm dark:text-white font-medium tracking-wide rounded-md focus:border-none focus:ring-0 active:ring-0"
              onChange={(e) => setData("name", e.target.value)}
              onBlur={blurSubmit}
              onKeyDown={enterSubmit}
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={toggleEditMode}
              className="inline-flex items-center h-5 p-0 w-full sm:text-base text-sm text-left font-medium tracking-wide truncate dark:text-white"
              disabled={processing}
            >
              {board.name}
            </button>
          )}
          <span className="sm:text-sm text-xs font-light text-zinc-500 dark:text-zinc-400">
            Last edited on: {board.updated_at.substring(0, 10)}
          </span>
        </div>
        <CardMenu board={board} />
      </div>
    </li>
  );
}
