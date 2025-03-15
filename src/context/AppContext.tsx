import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
