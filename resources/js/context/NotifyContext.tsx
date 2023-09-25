import { PropsWithChildren, createContext, useState } from "react";
import { Status } from "@/types/notification";

type Notify = {
  message: string;
  status: Status;
  duration: number;
  show: boolean;
};

type NotifyContextType = {
  notify: Notify;
  closeNotify: () => void;
  sendNotify: (message: string, status: Status) => void;
};

const defaultContext: NotifyContextType = {
  notify: {
    message: "",
    status: "success",
    duration: 3000,
    show: false,
  },
  closeNotify: () => {},
  sendNotify: () => {},
};

export const NotifyContext = createContext<NotifyContextType>(defaultContext);

export const NotifyProvider = ({ children }: PropsWithChildren) => {
  const [notify, setNotify] = useState<Notify>(defaultContext.notify);

  const closeNotify = () =>
    setNotify((prevNotify) => ({ ...prevNotify, show: false }));

  const sendNotify = (message: string, status: Status) => {
    setNotify((prevNotify) => ({ ...prevNotify, message, status, show: true }));
  };

  const contextValue: NotifyContextType = {
    notify,
    closeNotify,
    sendNotify,
  };

  return (
    <NotifyContext.Provider value={contextValue}>
      {children}
    </NotifyContext.Provider>
  );
};
