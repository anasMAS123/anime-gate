import { createContext, ReactNode, useContext, useState } from "react";

interface Props {
  notify: boolean;
  setNotify: React.Dispatch<React.SetStateAction<boolean>>;
}
const HistoryNotify = createContext<null | Props>(null);

const HistoryNotifyProvider = ({ children }: { children: ReactNode }) => {
  const [notify, setNotify] = useState<boolean>(false);

  return (
    <HistoryNotify.Provider value={{ notify, setNotify }}>
      {children}
    </HistoryNotify.Provider>
  );
};

const useNotify = () => {
  const context = useContext(HistoryNotify);
  if (!context) throw new Error("notify is used outside its scope");

  return context;
};

export { HistoryNotifyProvider, useNotify };
