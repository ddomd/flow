import Modal from "@/Components/Modal";
import TrashIcon from "@/Icons/TrashIcon";
import { useModal } from "@/hooks/useModal";
import DeleteColumnForm from "../Forms/DeleteColumnForm";
import { useContext, useState } from "react";
import { useForm } from "@inertiajs/react";
import { NotifyContext } from "@/context/NotifyContext";

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

  const { data, setData, reset, put } = useForm({
    name: name,
  });

  const { modal, showModal, closeModal } = useModal();

  const toggleEditMode = () => setEdit(!edit);

  const sendData = () => {
    if (data.name === name) {
      toggleEditMode();
      return;
    }

    try {
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
    } catch (e) {
      toggleEditMode();
      reset();
      sendNotify("Failed to edit column", "fail");
    }
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
          <h2
            onClick={toggleEditMode}
            className="w-[90%] tracking-wider font-semibold truncate"
          >
            {name}
          </h2>
        )}
      </div>
      <button
        onClick={showModal}
        className="p-1 border border-black rounded-full shadow-slanted-sm bg-red-400"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <Modal show={modal} closeModal={closeModal}>
        <DeleteColumnForm name={name} id={id} closeForm={closeModal} />
      </Modal>
    </div>
  );
}
