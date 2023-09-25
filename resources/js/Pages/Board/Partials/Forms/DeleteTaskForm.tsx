import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { NotifyContext } from "@/context/NotifyContext";
import { router } from "@inertiajs/react";
import { useContext } from "react";

export default function DeleteTaskForm({
  name,
  id,
  closeForm,
}: {
  name: string;
  id: number;
  closeForm: () => void;
}) {
  const { sendNotify } = useContext(NotifyContext);

  const handleDelete = () => {
    try {
      router.delete(route("tasks.delete", { task: id }), {
        onSuccess: () => {
          sendNotify("Task deleted successfully", "success");
          closeForm();
        },
        onError: () => {
          sendNotify("Failed to delete task", "fail");
          closeForm();
        },
      });
    } catch (e) {
      sendNotify("Failed to delete task", "fail");
      closeForm();
    }
  };

  return (
    <div className="p-3">
      <h2>
        Are you sure you want to delete <strong>{name}</strong>?
      </h2>
      <h3 className="mt-3 text-sm">
        Once deleted all data present on the task will be permanently lost.
      </h3>
      <div className="mt-4 flex space-x-2 justify-end">
        <SecondaryButton type="button" onClick={closeForm}>Close</SecondaryButton>
        <DangerButton type="button" onClick={handleDelete}>Delete Task</DangerButton>
      </div>
    </div>
  );
}
