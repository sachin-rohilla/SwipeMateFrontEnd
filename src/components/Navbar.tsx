import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import useAuth from "../hooks/useAuth";
import { AiOutlineLogout } from "react-icons/ai";
import ThemeToggleComp from "./ThemeToggleComp";

const Navbar = () => {
  const { userData } = useAppContext();
  const { logOutApi } = useAuth();
  const handleLogout = () => {
    logOutApi();
  };
  return (
    <div className="navbar bg-base-100 flex items-center shadow-sm px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl ">
          SwipeMate
        </Link>
      </div>

      <ThemeToggleComp />

      {userData && (
        <div className="flex-none">
          <Link
            to="/connections"
            className="font-modern font-semibold hidden  sm:block"
          >
            Connections
          </Link>
          <Link
            to="/requests"
            className="font-modern font-semibold px-4 hidden sm:block"
          >
            Requests
          </Link>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    userData?.profilePicUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                  className="font-modern  block sm:hidden"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="font-modern  block sm:hidden">
                  Requests
                </Link>
              </li>

              <li>
                <button onClick={handleLogout}>
                  Logout
                  <AiOutlineLogout size={15} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
