import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}
interface AppContextType {
  userData: User | null;
  setUserData: (userData: User | null) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  userData: null,
  setUserData: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
