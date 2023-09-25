import Modal from "@/Components/Modal";
import PinIcon from "@/Icons/PinIcon";
import TrashIcon from "@/Icons/TrashIcon";
import { useModal } from "@/hooks/useModal";
import { BoardElement } from "@/types/board";
import { Link } from "@inertiajs/react";
import DeleteBoardForm from "../Forms/DeleteBoardForm";

export default function CardMenu({ board }: { board: BoardElement }) {
  const { modal, showModal, closeModal } = useModal();

  return (
    <menu className="absolute top-3 right-3 flex space-x-2">
      <Link
        as="button"
        data={{ pinned: !board.pinned }}
        href={route("boards.pin", { board: board.id })}
        method="put"
        className={`-translate-x-[0.10rem] -translate-y-[0.10rem] p-1 border border-black rounded-full shadow-slanted-xs ${board.pinned ? "bg-amber-400" : ""}`}
      >
        <PinIcon
          className="h-4 w-4"
        />
      </Link>
      <button onClick={showModal} className="-translate-x-[0.10rem] -translate-y-[0.10rem] bg-red-400 border border-black rounded-full p-1 shadow-slanted-xs">
        <TrashIcon className="h-4 w-4" />
      </button>
      <Modal show={modal} closeModal={closeModal}>
        <DeleteBoardForm board={board} closeForm={closeModal} />
      </Modal>
    </menu>
  );
}
