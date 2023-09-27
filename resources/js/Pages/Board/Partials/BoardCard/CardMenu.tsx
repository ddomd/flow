import Modal from "@/Components/Modal";
import PinIcon from "@/Icons/PinIcon";
import TrashIcon from "@/Icons/TrashIcon";
import { useModal } from "@/hooks/useModal";
import { BoardElement } from "@/types/board";
import { router } from "@inertiajs/react";
import DeleteBoardForm from "../Forms/DeleteBoardForm";

export default function CardMenu({ board }: { board: BoardElement }) {
  const { modal, showModal, closeModal } = useModal();

  let debounceTimer: NodeJS.Timeout | null = null;

  const handlePinToggle = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    board.pinned = !board.pinned;

    debounceTimer = setTimeout(() => {
      router.put(route("boards.pin", { board: board.id }), {
        pinned: board.pinned,
      });
    }, 500);
  };

  return (
    <menu className="absolute top-3 right-3 flex space-x-2">
      <button
        onClick={() => (board.pinned = !board.pinned)}
        className={`-translate-x-[0.10rem] -translate-y-[0.10rem] p-1 border border-black rounded-full shadow-slanted-xs ${
          board.pinned ? "bg-amber-400" : ""
        }`}
      >
        <PinIcon className="h-4 w-4" />
      </button>
      <button
        onClick={showModal}
        className="-translate-x-[0.10rem] -translate-y-[0.10rem] bg-red-400 border border-black rounded-full p-1 shadow-slanted-xs"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <Modal show={modal} closeModal={closeModal}>
        <DeleteBoardForm board={board} closeForm={closeModal} />
      </Modal>
    </menu>
  );
}
