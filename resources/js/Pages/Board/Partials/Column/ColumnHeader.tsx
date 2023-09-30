import { useModal } from "@/hooks/useModal";
import { useContext, useState } from "react";
import { useForm } from "@inertiajs/react";
import { NotifyContext } from "@/context/NotifyContext";
import Modal from "@/Components/Modal";
import TrashIcon from "@/Icons/TrashIcon";
import DeleteForm from "../Forms/DeleteForm";

export default function ColumnHeader({
  name,
  color,
  id,
  length,
}: {
  name: string;
  color: string;
  id: string;
  length: number;
}) {
  const [edit, setEdit] = useState(false);
  const { sendNotify } = useContext(NotifyContext);

  const { data, setData, reset, put, processing } = useForm({
    name: name,
  });

  const { modal, showModal, closeModal } = useModal();

  const toggleEditMode = () => setEdit(!edit);

  const sendData = () => {
    if (data.name === name) {
      toggleEditMode();
      return;
    }

    put(route("columns.edit", { column: id }), {
      onSuccess: () => {
        toggleEditMode();
        sendNotify("Column edited successfully", "success");
      },
      onError: () => {
        toggleEditMode();
        reset();
        sendNotify("Failed to edit column", "fail");
      },
    });
  };

  const blurSubmit = () => sendData();

  const enterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendData();
    }
  };

  return (
    <div className="px-3 w-full flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div
          className={`shrink-0 inline-flex items-center justify-center h-7 w-7 font-bold text-sm border border-black ${color} rounded-lg`}
        >
          {length}
        </div>
        {edit ? (
          <input
            id="column-name"
            name="column-name"
            value={data.name}
            className="h-6 p-0 bg-transparent font-bold tracking-wider focus:border-none focus:ring-0"
            onChange={(e) => setData("name", e.target.value)}
            onBlur={blurSubmit}
            onKeyDown={enterSubmit}
            autoFocus
          />
        ) : (
          <button
            type="button"
            className="w-[90%] tracking-wider font-semibold truncate"
            onClick={toggleEditMode}
            disabled={processing}
          >
            {name}
          </button>
        )}
      </div>
      <button
        className="p-1 border border-black rounded-full shadow-slanted-sm bg-red-400"
        onClick={showModal}
        disabled={processing}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <Modal show={modal} closeModal={closeModal}>
        <DeleteForm id={id} name={name} model="column" closeForm={closeModal} />
      </Modal>
    </div>
  );
}
