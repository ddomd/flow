import { useState } from "react";
import { router } from "@inertiajs/react";
import { debounce } from "@/utils/debounce";
import { useModal } from "@/hooks/useModal";
import { BoardElement } from "@/types/board";
import Modal from "@/Components/Modal";
import PinIcon from "@/Icons/PinIcon";
import TrashIcon from "@/Icons/TrashIcon";
import DeleteForm from "../Forms/DeleteForm";
import { IconButton } from "@/Components/IconButton";

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
          setDisableButton(true);
        },
        onFinish: () => {
          setDisableButton(false);
        },
      }
    );
  }, 200);

  return (
    <menu className="absolute top-3 right-3 flex space-x-2">
      <IconButton
        onClick={handlePinToggle}
        disabled={disableButton}
        className={` ${
          board.pinned ? "bg-amber-400 dark:bg-violet-600" : ""
        }`}
      >
        <PinIcon className="h-4 w-4 dark:text-white" />
      </IconButton>
      <IconButton
        onClick={showModal}
        className="bg-red-400 dark:bg-rose-500"
        disabled={disableButton}
      >
        <TrashIcon className="h-4 w-4 dark:text-white" />
      </IconButton>
      <Modal show={modal} closeModal={closeModal}>
        <DeleteForm id={board.id} name={board.name} model="board" closeForm={closeModal} />
      </Modal>
    </menu>
  );
}
