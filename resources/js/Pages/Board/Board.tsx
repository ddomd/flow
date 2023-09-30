import { Head } from "@inertiajs/react";
import { FilterProvider } from "@/context/FilterContext";
import { PageProps } from "@/types";
import { BoardElement } from "@/types/board";
import ColumnList from "./Partials/Column/ColumnList";
import BoardMenu from "./Partials/HeaderMenu/BoardMenu";


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
