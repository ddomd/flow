import { useState } from "react";

export function useModal(initialState = false) {
  const [modal, setModal] = useState(false);

  const closeModal = () => setModal(false);

  const showModal = () => setModal(true);

  return {
    modal,
    closeModal,
    showModal,
  }
}
