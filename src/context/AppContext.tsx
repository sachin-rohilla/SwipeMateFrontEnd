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
  connections: any[];
  setConnections: (connections: any[]) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  userData: null,
  setUserData: () => {},
  feedsData: [],
  setFeedsData: () => {},
  connections: [],
  setConnections: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [feedsData, setFeedsData] = useState<Feed[]>([]);
  const [connections, setConnections] = useState<any[]>([]);

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        feedsData,
        setFeedsData,
        connections,
        setConnections,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
