import { Link } from "@inertiajs/react";
import HeaderMenu from "./HeaderMenu";
import LeftArrowIcon from "@/Icons/LeftArrowIcon";
import AddButton from "@/Components/AddButton";
import Modal from "@/Components/Modal";
import AddColumnForm from "../Forms/AddColumnForm";
import { BoardElement } from "@/types/board";
import { useModal } from "@/hooks/useModal";
import TagsPopover from "./TagsPopover";

export default function BoardMenu({ board }: { board: BoardElement }) {
  const { modal, showModal, closeModal } = useModal();

  return (
    <HeaderMenu>
      <div className="shrink-0 flex items-center gap-x-2 w-[70%]">
        <Link aria-label="Back to boards button" href={route("boards")}>
          <LeftArrowIcon className="h-5 w-5 text-black dark:text-white" />
        </Link>
        <span className="px-1 text-lg uppercase tracking-wide font-bold dark:text-white truncate">
          {board.name}
        </span>
      </div>
      <div className="flex gap-x-3 items-center">
        <TagsPopover id={board.id} tags={board.tags} />
        <AddButton aria-label="Add column button" onClick={showModal} />
      </div>

      <Modal show={modal} closeModal={closeModal}>
        <AddColumnForm
          boardId={board.id}
          columnLength={board.columns.length}
          closeForm={closeModal}
        />
      </Modal>
    </HeaderMenu>
  );
}
