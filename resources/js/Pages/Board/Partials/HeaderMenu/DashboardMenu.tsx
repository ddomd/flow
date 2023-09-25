import SearchIcon from "@/Icons/SearchIcon";
import HeaderMenu from "./HeaderMenu";
import AddButton from "@/Components/AddButton";
import Modal from "@/Components/Modal";
import AddBoardForm from "../Forms/AddBoardForm";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useModal } from "@/hooks/useModal";

export default function DashboardMenu({
  currentBoards,
  onSearchChange,
}: {
  currentBoards: number;
  onSearchChange: (e: string) => void;
}) {
  const [search, setSearch] = useState("");

  const { modal, showModal, closeModal } = useModal();

  const handleSearch: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <HeaderMenu>
      <section className="flex items-center space-x-2">
        <SearchIcon className="h-5 w-5 text-black" />
        <input
          id="search"
          name="search"
          type="text"
          value={search}
          onChange={handleSearch}
          className="h-7 bg-transparent border-none text-black focus:ring-0"
          placeholder="Search..."
        />
      </section>
      <AddButton onClick={showModal} />
      <Modal show={modal} closeModal={closeModal}>
        <AddBoardForm closeForm={closeModal} currentBoards={currentBoards} />
      </Modal>
    </HeaderMenu>
  );
}
