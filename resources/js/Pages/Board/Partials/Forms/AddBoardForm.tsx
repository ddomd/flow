import { FormEvent, FormEventHandler, useContext } from "react";
import { useForm } from "@inertiajs/react";
import { debounce } from "@/utils/debounce";
import { NotifyContext } from "@/context/NotifyContext";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import PinIcon from "@/Icons/PinIcon";

export default function AddBoardForm({
  currentBoards,
  closeForm,
}: {
  currentBoards: number;
  closeForm: () => void;
}) {
  const { data, setData, errors, post, reset, processing } = useForm({
    name: "",
    pinned: false,
    items: currentBoards,
  });

  const { sendNotify } = useContext(NotifyContext);

  const debouncedSubmit = debounce(() => {
    post(route("boards.store"), {
      onSuccess: () => {
        sendNotify(
          `You can create ${9 - currentBoards} more boards`,
          "success"
        );
        reset();
        closeForm();
      },
      onError: (errors) => {
        if (errors.items) {
          sendNotify("You can only create 10 boards.", "fail");
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
    <form onSubmit={submitHandler} className="p-4 ">
      <h2 className="text-center text-xl font-semibold">New Board</h2>
      <InputLabel htmlFor="name" value="Name" className="mt-3" />
      <TextInput
        id="name"
        name="name"
        type="text"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        className="w-full mt-3"
        placeholder="Board name"
      />
      <InputError message={errors.name} className="mt-2" />

      <section className="flex justify-between mt-8">
        <InputLabel htmlFor="pinned" value="Pin board?" />
        <div>
          <input
            name="pinned"
            type="checkbox"
            checked={data.pinned}
            onChange={(e) => setData("pinned", !data.pinned)}
            className="absolute opacity-0 h-8 w-8 cursor-pointer"
          />
          <div
            className={`p-1 shadow-slanted-xs rounded-full border border-black ${
              data.pinned ? "bg-amber-400" : ""
            }`}
            aria-hidden
          >
            <PinIcon className="h-5 w-5" />
          </div>
        </div>
      </section>

      <section className="flex justify-end space-x-2 mt-6">
        <SecondaryButton type="button" onClick={closeForm}>
          Close
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={processing}>
          Create Board
        </PrimaryButton>
      </section>
    </form>
  );
}
