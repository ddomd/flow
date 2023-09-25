import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { NotifyContext } from "@/context/NotifyContext";
import { useForm } from "@inertiajs/react";
import { FormEvent, FormEventHandler, useContext } from "react";

export default function AddColumnForm({
  boardId,
  columnLength,
  closeForm,
}: {
  boardId: number;
  columnLength: number;
  closeForm: () => void;
}) {
  const colors = [
    "bg-red-400",
    "bg-pink-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-amber-400",
    "bg-violet-400",
  ];

  const { data, setData, errors, post, reset } = useForm({
    name: "",
    color: colors[Math.floor(Math.random() * colors.length)],
    items: columnLength,
  });

  const { sendNotify } = useContext(NotifyContext);

  const submitHandler: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();

    try {
      post(route("columns.store", { board: boardId }), {
        onSuccess: () => {
          reset();
          sendNotify(
            `You can create ${3 - columnLength} more columns`,
            "success"
          );
          closeForm();
        },
        onError: () => {
          if (errors.items) {
            sendNotify("You can only create 4 columns", "fail");
            reset();
            closeForm();
          }
        },
      });
    } catch (e) {
      reset();
      sendNotify("failed to create column", "fail");
      closeForm();
    }
  };

  return (
    <form onSubmit={submitHandler} className="p-4 ">
      <h2 className="text-center text-xl font-bold">New Column</h2>
      <InputLabel htmlFor="name" value="Name" className="mt-3" />
      <TextInput
        id="name"
        name="name"
        type="text"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        className="w-full mt-3"
        placeholder="Column name"
      />
      <InputError message={errors.name} className="mt-2" />

      <section className="flex justify-end space-x-2 mt-4">
        <SecondaryButton onClick={closeForm}>Cancel</SecondaryButton>
        <PrimaryButton type="submit">Create Column</PrimaryButton>
      </section>
    </form>
  );
}
