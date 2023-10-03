import SearchIcon from "@/Icons/SearchIcon";
import HeaderMenu from "./HeaderMenu";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useModal } from "@/hooks/useModal";
import AddButton from "@/Components/AddButton";
import Modal from "@/Components/Modal";
import AddBoardForm from "../Forms/AddBoardForm";

export default function DashboardMenu({
  currentBoards,
  onSearchChange,
}: {
  currentBoards: number;
  onSearchChange: (e: string) => void;
}) {
  const [search, setSearch] = useState("");

  const { modal, showModal, closeModal } = useModal();

  const handleSearch: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <HeaderMenu>
      <div className="flex items-center space-x-2">
        <SearchIcon className="h-5 w-5 text-black dark:text-white" />
        <input
          id="search"
          name="search"
          type="text"
          value={search}
          onChange={handleSearch}
          className="h-7 bg-transparent border-none text-black dark:text-white dark:placeholder:text-gray-300 focus:ring-0"
          placeholder="Search..."
          aria-label="Search boards input"
        />
      </div>
      <AddButton
        aria-label="Add board button"
        onClick={showModal}
        className="shrink-0"
      />
      <Modal show={modal} closeModal={closeModal}>
        <AddBoardForm closeForm={closeModal} currentBoards={currentBoards} />
      </Modal>
    </HeaderMenu>
  );
}
