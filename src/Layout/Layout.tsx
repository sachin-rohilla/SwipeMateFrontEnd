import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useProfile from "../hooks/useProfile";
import { useEffect } from "react";

const Layout = () => {
  const { getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
