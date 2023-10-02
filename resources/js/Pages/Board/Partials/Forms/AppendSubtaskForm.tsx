import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TextIcon from "@/Icons/TextIcon";
import { useState } from "react";

export default function AppendSubtaskForm({
  subtasksLength,
  submitForm,
  closeForm,
}: {
  subtasksLength: number;
  submitForm: (name: string) => void;
  closeForm: () => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if(name.trim() === "") {
      setError("The name field is required.")
      return;
    }

    if(subtasksLength >= 5) {
      setError("You can only create 5 subtasks");
      return;
    }

    submitForm(name);
    closeForm();
  };

  return (
    <section className="p-3 flex flex-col">
      <h2 className="text-center text-xl font-bold tracking-wide">
        New Subtask
      </h2>

      <div className="flex items-center gap-x-3 mt-6">
        <TextIcon className="h-5 w-5" />
        <InputLabel htmlFor="subtask" value="Subtask" />
      </div>
      <TextInput
        id="subtask"
        name="subtask"
        placeholder="Subtask name..."
        className="my-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <InputError message={error} />

      <div className="flex justify-end space-x-3 mt-6">
        <SecondaryButton type="button" onClick={closeForm}>
          close
        </SecondaryButton>
        <PrimaryButton type="button" onClick={handleSubmit}>
          add subtask
        </PrimaryButton>
      </div>
    </section>
  );
}
