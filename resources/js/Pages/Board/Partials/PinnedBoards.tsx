import { BoardElement } from "@/types/board";
import PinnedCard from "./PinnedCard";
import Container from "@/Components/Container";

export default function PinnedBoards({ boards }: { boards: BoardElement[] }) {
  return (
    <Container className="transition-[height] duration-50 p-3 h-[28%] w-full">
      <h2 className="pb-3 w-full font-bold tracking-wide">Pinned Boards</h2>
      <ul className="column-scroll p-3 h-[80%] w-full flex space-x-2 overflow-x-scroll">
        {boards.map((board) => (
          <PinnedCard key={board.id} board={board} />
        ))}
      </ul>
    </Container>
  );
}
