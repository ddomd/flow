import { BoardElement } from "@/types/board";
import { Link, useForm } from "@inertiajs/react";
import { useContext, useState } from "react";
import CardMenu from "./CardMenu";
import { NotifyContext } from "@/context/NotifyContext";

export default function BoardCard({ board }: { board: BoardElement }) {
  const { put, data, setData, reset, errors } = useForm({
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

    try {
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
    } catch (e) {
      reset();
      sendNotify("Failed to edit board", "fail");
    }
  };

  const blurSubmit = () => sendData();

  const enterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendData();
    }
  };

  return (
    <li
      className="relative flex p-3 w-full border-t border-black"
      key={board.id}
    >
      <div className="flex items-center space-x-3">
        <Link
          as="button"
          href={route("boards.show", { board: board.id })}
          className="rounded-lg sm:h-20 sm:w-24 h-12 w-16 bg-blue-400 border border-black"
        />
        <div className="flex flex-col">
          {edit ? (
            <input
              id="board-name"
              name="board-name"
              value={data.name}
              className="h-5 p-0 bg-transparent sm:text-base text-sm font-medium tracking-wide rounded-md focus:border-none focus:ring-0 active:ring-0"
              onChange={(e) => setData("name", e.target.value)}
              onBlur={blurSubmit}
              onKeyDown={enterSubmit}
              autoFocus
            />
          ) : (
            <span
              onClick={toggleEditMode}
              className="sm:text-base text-sm font-medium tracking-wide"
            >
              {board.name}
            </span>
          )}
          <span className="sm:text-sm text-xs font-light text-zinc-500">
            Last edited on: {board.updated_at.substring(0, 10)}
          </span>
        </div>
        <CardMenu board={board} />
      </div>
    </li>
  );
}
