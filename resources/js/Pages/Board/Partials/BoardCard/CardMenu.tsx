import { useState } from "react";
import { router } from "@inertiajs/react";
import { debounce } from "@/utils/debounce";
import { useModal } from "@/hooks/useModal";
import { BoardElement } from "@/types/board";
import Modal from "@/Components/Modal";
import PinIcon from "@/Icons/PinIcon";
import TrashIcon from "@/Icons/TrashIcon";
import DeleteForm from "../Forms/DeleteForm";

export default function CardMenu({ board }: { board: BoardElement }) {
  const { modal, showModal, closeModal } = useModal();

  const [disableButton, setDisableButton] = useState(false);


  const handlePinToggle = debounce(() => {
    router.put(
      route("boards.pin", { board: board.id }),
      {
        pinned: !board.pinned,
      },
      {
        onStart: () => {
          console.log('debounce');
          setDisableButton(true);
        },
        onFinish: () => {
          setDisableButton(false);
        },
      }
    );
  }, 600);

  return (
    <menu className="absolute top-3 right-3 flex space-x-2">
      <button
        onClick={handlePinToggle}
        disabled={disableButton}
        className={`${
          disableButton
            ? ""
            : "-translate-x-[0.10rem] -translate-y-[0.10rem] shadow-slanted-xs"
        }  p-1 border border-black rounded-full transition duration-200 ${
          board.pinned ? "bg-amber-400" : ""
        }`}
      >
        <PinIcon className="h-4 w-4" />
      </button>
      <button
        onClick={showModal}
        className="-translate-x-[0.10rem] -translate-y-[0.10rem] bg-red-400 border border-black rounded-full p-1 shadow-slanted-xs"
        disabled={disableButton}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <Modal show={modal} closeModal={closeModal}>
        <DeleteForm id={board.id} name="board.name" model="board" closeForm={closeModal} />
      </Modal>
    </menu>
  );
}
