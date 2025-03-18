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

interface Request {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface AppContextType {
  userData: User | null;
  setUserData: (userData: User | null) => void;
  feedsData: Feed[];
  setFeedsData: (feedsData: Feed[]) => void;
  connections: any[];
  setConnections: (connections: any[]) => void;
  receivedRequests: any[];
  setReceivedRequests: (requests: any[]) => void;
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
  receivedRequests: [],
  setReceivedRequests: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [feedsData, setFeedsData] = useState<Feed[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        feedsData,
        setFeedsData,
        connections,
        setConnections,
        receivedRequests,
        setReceivedRequests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
