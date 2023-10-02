import { useContext, useState } from "react";
import { router } from "@inertiajs/react";
import { NotifyContext } from "@/context/NotifyContext";
import { debounce } from "@/utils/debounce";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function DeleteForm({
  id,
  name,
  model,
  closeForm,
}: {
  id: number | string;
  name: string;
  model: "board" | "column" | "task";
  closeForm: () => void;
}) {
  let debouncedRequest = () => {};

  const [disableButton, setDisableButton] = useState(false);

  const { sendNotify } = useContext(NotifyContext);

  switch (model) {
    case "board":
      debouncedRequest = debounce(
        () =>
          router.delete(route("boards.delete", { board: id }), {
            onStart: () => setDisableButton(true),
            onFinish: () => setDisableButton(false),
            onSuccess: () => {
              sendNotify("Board deleted successfully", "success");
              closeForm();
            },
            onError: () => {
              sendNotify("Failed to delete board", "fail");
              closeForm();
            },
          }),
        200
      );
      break;
    case "column":
      debouncedRequest = debounce(
        () =>
          router.delete(route("columns.delete", { column: id }), {
            onStart: () => setDisableButton(true),
            onFinish: () => setDisableButton(false),
            onSuccess: () => {
              sendNotify("Column deleted successfully", "success");
              closeForm();
            },
            onError: () => {
              sendNotify("Failed to delete column", "fail");
              closeForm();
            },
          }),
        200
      );
      break;
    case "task":
      debouncedRequest = debounce(
        () =>
          router.delete(route("tasks.delete", { task: id }), {
            onStart: () => setDisableButton(true),
            onFinish: () => setDisableButton(false),
            onSuccess: () => {
              sendNotify("Task deleted successfully", "success");
              closeForm();
            },
            onError: () => {
              sendNotify("Failed to delete task", "fail");
              closeForm();
            },
          }),
        200
      );
      break;
    default:
      break;
  }

  const handleDelete = () => debouncedRequest();

  return (
    <div className="p-3 dark:text-white">
      <h2>
        Are you sure you want to delete <strong className="text-rose-500">{name}</strong>?
      </h2>
      <h3 className="mt-3 text-sm">
        {` Once deleted all data present on the ${model} will be permanently lost.`}
      </h3>
      <div className="mt-4 flex space-x-2 justify-end">
        <SecondaryButton onClick={closeForm}>close</SecondaryButton>
        <DangerButton onClick={handleDelete} disabled={disableButton}>
          {`delete ${model}`}
        </DangerButton>
      </div>
    </div>
  );
}
