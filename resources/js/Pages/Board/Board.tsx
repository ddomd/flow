import { PageProps } from "@/types";
import { BoardElement } from "@/types/board";
import { Head } from "@inertiajs/react";
import ColumnList from "./Partials/Column/ColumnList";
import BoardMenu from "./Partials/HeaderMenu/BoardMenu";
import { FilterProvider } from "@/context/FilterContext";

export default function Columns({ board }: PageProps<{ board: BoardElement }>) {
  return (
    <>
      <Head title={board.name} />

      <div className="px-3 h-full mt-2 w-full flex flex-col items-center">
        <FilterProvider>
          <BoardMenu board={board} />
          <ColumnList columns={board.columns} tags={board.tags} />
        </FilterProvider>
      </div>
    </>
  );
}
