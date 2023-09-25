import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { NotifyContext } from "@/context/NotifyContext";
import { BoardElement } from "@/types/board";
import { router } from "@inertiajs/react";
import { useContext } from "react";

export default function DeleteBoardForm({
  board,
  closeForm,
}: {
  board: BoardElement;
  closeForm: () => void;
}) {
  const { sendNotify } = useContext(NotifyContext);

  const handleDelete = () => {
    try {
      router.delete(route("boards.delete", { board: board.id }), {
        onSuccess: () => {
          sendNotify("Board deleted successfully", "success");
          closeForm()
        },
        onError: () => {
          sendNotify("Failed to delete board", "fail");
          closeForm()
        },
      });
    } catch (e) {
      sendNotify("Failed to delete board", "fail");
      closeForm()
    }
  };

  return (
    <div className="p-3">
      <h2>
        Are you sure you want to delete <strong>{board.name}</strong>?
      </h2>
      <h3 className="mt-3 text-sm">
        Once deleted all data present on the board will be permanently lost.
      </h3>
      <div className="mt-4 flex space-x-2 justify-end">
        <SecondaryButton onClick={closeForm}>Close</SecondaryButton>
        <DangerButton onClick={handleDelete}>Delete Board</DangerButton>
      </div>
    </div>
  );
}
