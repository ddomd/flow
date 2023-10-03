import PinIcon from "@/Icons/PinIcon";
import { BoardElement } from "@/types/board";
import { Link } from "@inertiajs/react";

export default function PinnedCard({ board }: { board: BoardElement }) {
  return (
    <li className="flex flex-col">
      <Link
        aria-label={`go to ${board.name} board button`}
        href={route("boards.show", { board: board.id })}
        className="relative h-20 w-28 border border-black rounded-lg bg-amber-400 dark:bg-violet-600"
      ></Link>
      <span className="ml-1 sm:text-sm text-xs font-medium tracking-wide w-28 truncate dark:text-white">
        {board.name}
      </span>
    </li>
  );
}
