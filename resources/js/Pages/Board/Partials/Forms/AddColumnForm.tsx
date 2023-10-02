import { FormEvent, FormEventHandler, useContext } from "react";
import { useForm } from "@inertiajs/react";
import { NotifyContext } from "@/context/NotifyContext";
import { debounce } from "@/utils/debounce";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import ColorPicker from "@/Components/ColorPicker";
import TitleIcon from "@/Icons/TitleIcon";
import SwatchIcon from "@/Icons/SwatchIcon";

export default function AddColumnForm({
  boardId,
  columnLength,
  closeForm,
}: {
  boardId: number;
  columnLength: number;
  closeForm: () => void;
}) {
  const { data, setData, errors, post, reset, processing } = useForm({
    name: "",
    color: "bg-red-400",
    items: columnLength,
  });

  const { sendNotify } = useContext(NotifyContext);

  const debouncedSubmit = debounce(() => {
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
  }, 200);

  const submitHandler: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    debouncedSubmit();
  };

  return (
    <form onSubmit={submitHandler} className="p-4 space-y-6 dark:text-white">
      <h2 className="text-center text-xl font-bold">New Column</h2>
      <div>
        <div className="flex items-center gap-x-3">
          <TitleIcon className="h-5 w-5" />
          <InputLabel htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          className="w-full mt-3"
          placeholder="Column name"
          autoFocus
        />
        <InputError message={errors.name} className="mt-2" />
      </div>
      <div>
        <div className="flex items-center gap-x-3 mb-3">
          <SwatchIcon className="h-5 w-5" />
          <h3 className="font-bold">Column color</h3>
        </div>
        <ColorPicker onColorSelect={(color) => setData("color", color)} />
      </div>
      <div className="flex justify-end space-x-2">
        <SecondaryButton type="button" onClick={closeForm}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={processing}>
          Create Column
        </PrimaryButton>
      </div>
    </form>
  );
}
