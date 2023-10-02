import { BoardElement } from "@/types/board";
import BoardCard from "./BoardCard/BoardCard";
import Container from "@/Components/Container";

export default function BoardList({
  boards,
  search,
  className,
}: {
  boards: BoardElement[];
  search: string;
  className: string;
}) {
  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(search)
  );

  return (
    <Container
      className={
        "transition-[height] duration-50 w-full overflow-hidden " +
        className
      }
    >
      <h2 className="h-14 pt-3 p-3 w-full font-bold tracking-wide dark:text-white">My Boards</h2>
      <ul className="task-scroll w-full h-[85%] flex flex-col items-center overflow-y-scroll touch-pan-y">
        {filteredBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </ul>
    </Container>
  );
}
