import { useState } from "react";
import { Head } from "@inertiajs/react";
import { BoardElement } from "@/types/board";
import BoardList from "@/Pages/Board/Partials/BoardList";
import PinnedBoards from "@/Pages/Board/Partials/PinnedBoards";
import DashboardMenu from "@/Pages/Board/Partials/HeaderMenu/DashboardMenu";

export default function Dashboard({ boards }: { boards: BoardElement[] }) {
  const [search, setSearch] = useState("");
  const pinnedBoards = boards.filter((board) => board.pinned);

  const onSearchChange = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  return (
    <>
      <Head title="Boards" />

      <div className="h-full w-full flex flex-col items-center mt-2 px-3 space-y-5 pb-6">
        <DashboardMenu onSearchChange={onSearchChange} currentBoards={boards.length} />
        <section className="w-full h-[90%] flex flex-col space-y-6">
          {pinnedBoards.length > 0 ? (
            <PinnedBoards boards={pinnedBoards} />
          ) : null}

          <BoardList
            className={pinnedBoards.length > 0 ? "h-[75%]" : "h-full"}
            boards={boards}
            search={search}
          />
        </section>
      </div>
    </>
  );
}
