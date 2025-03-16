import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { userData } = useAppContext();

  return userData ? <>{children}</> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
