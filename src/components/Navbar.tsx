import { useAppContext } from "../context/AppContext";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { userData } = useAppContext();
  const { logOutApi, isLoading } = useAuth();
  const handleLogout = () => {
    logOutApi();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-8">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">SwipeMate</a>
      </div>
      <div className="flex-none">
        {userData && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
