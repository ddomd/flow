import { FormEvent, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { debounce } from "@/utils/debounce";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextIcon from "@/Icons/TextIcon";

export default function AddSubtaskForm({
  taskId,
  closeForm,
}: {
  taskId: number;
  closeForm: () => void;
}) {
  const { post, data, setData, reset, errors } = useForm({
    name: "",
    items: 0,
  });

  const debouncedSubmit = debounce(() => {
    post(route("subtasks.store", { task: taskId }), {
      onSuccess: () => {
        reset();
        closeForm();
      },
    });
  }, 200);

  const submitForm: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    debouncedSubmit();
  };

  return (
    <form className="p-3 flex flex-col" onSubmit={submitForm}>
      <h2 className="text-center text-xl font-bold tracking-wide">
        New Subtask
      </h2>

      <div className="flex items-center gap-x-3 mt-6">
        <TextIcon className="h-5 w-5" />
        <InputLabel htmlFor="subtask" value="Subtask" />
      </div>
      <TextInput
        aria-label="subtask input"
        id="subtask"
        name="subtask"
        placeholder="Subtask name..."
        className="my-3"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        autoFocus
      />
      <InputError message={errors.name || errors.items} />

      <div className="flex justify-end space-x-3 mt-6">
        <SecondaryButton type="button" onClick={closeForm}>
          close
        </SecondaryButton>
        <PrimaryButton type="submit">add subtask</PrimaryButton>
      </div>
    </form>
  );
}
