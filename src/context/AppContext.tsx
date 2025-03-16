import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface Feed {
  id: string;
  content: string;
  timestamp: string;
}

interface AppContextType {
  userData: User | null;
  setUserData: (userData: User | null) => void;
  feedsData: Feed[];
  setFeedsData: (feedsData: Feed[]) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  userData: null,
  setUserData: () => {},
  feedsData: [],
  setFeedsData: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [feedsData, setFeedsData] = useState<Feed[]>([]);

  return (
    <AppContext.Provider
      value={{ userData, setUserData, feedsData, setFeedsData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
