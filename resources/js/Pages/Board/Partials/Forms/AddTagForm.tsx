import { FormEvent, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { debounce } from "@/utils/debounce";
import ColorPicker from "@/Components/ColorPicker";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

export default function AddTagForm({
  boardId,
  closeForm,
}: {
  boardId: number;
  closeForm: () => void;
}) {
  const { data, setData, post, errors, reset, processing } = useForm({
    name: "",
    color: "bg-red-400",
    items: 0,
  });

  const debouncedSubmit = debounce(() => {
    post(route("tags.store", { board: boardId }), {
      onSuccess: () => {
        reset();
        closeForm();
      },
    });
  }, 200);

  const submitHandler: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    debouncedSubmit();
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col space-y-4 p-3"
    >
      <h3 className="text-left text-sm font-bold">Tag name</h3>
      <TextInput
        id="tag-name"
        name="tag-name"
        value={data.name}
        onChange={(e) => setData("name", e.target.value.toLowerCase())}
        className="w-full"
        autoFocus
      />
      <InputError message={errors.name || errors.items} />
      <h3 className="text-left text-sm font-bold">Tag color</h3>
      <ColorPicker onColorSelect={(color) => setData("color", color)} />
      <div className="flex justify-center gap-x-3 ">
        <SecondaryButton type="button" onClick={closeForm}>
          close
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={processing}>
          Add tag
        </PrimaryButton>
      </div>
    </form>
  );
}
