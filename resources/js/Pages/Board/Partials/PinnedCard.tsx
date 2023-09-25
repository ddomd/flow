import PinIcon from "@/Icons/PinIcon";
import { BoardElement } from "@/types/board";
import { Link } from "@inertiajs/react";

export default function PinnedCard({ board }: { board: BoardElement }) {
  return (
    <li className="flex flex-col">
      <Link
        href={route("boards.show", { board: board.id })}
        className="relative h-20 w-28 border border-black rounded-lg bg-amber-400"
      >
        <Link
          as="button"
          data={{ pinned: !board.pinned }}
          href={route("boards.pin", { board: board.id })}
          method="put"
          className="absolute right-2 top-2"
        >
          <PinIcon active={true} className="h-5 w-5" />
        </Link>
      </Link>
      <span className="ml-1 sm:text-sm text-xs font-medium tracking-wide">
        {board.name}
      </span>
    </li>
  );
}
