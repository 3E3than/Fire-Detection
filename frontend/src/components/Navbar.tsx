import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <header className="mb-8">
      <nav className="flex items-center justify-between">
        <div className=" w-full flex items-center space-x-6 justify-between ">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-3xl">
              local_fire_department
            </span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              IgnisAI
            </h1>
         
          <div className="relative px-7">
          <input
            type="text"
            placeholder="Search location..."
            className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors">
            search
          </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${
                isActive ? "bg-orange-500 text-white hover:bg-orange-600" : ""
              }`
            }
          >
            <span className="material-symbols-outlined mr-2">home</span>
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${
                isActive ? "bg-orange-500 text-white hover:bg-orange-600" : ""
              }`
            }
          >
            <span className="material-symbols-outlined mr-2">globe</span>
            Dashboard
          </NavLink>
          <NavLink
            to="/alert"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${
                isActive ? "bg-orange-500 text-white hover:bg-orange-600" : ""
              }`
            }
          >
            <span className="material-symbols-outlined mr-2">
              notifications
            </span>
            Alerts
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center transition-colors hover:bg-gray-100 ${
                isActive ? "bg-orange-500 text-white hover:bg-orange-600" : ""
              }`
            }
          >
            <span className="material-symbols-outlined mr-2">info</span>
            About
          </NavLink>
          </div>
        </div>
      
      </nav>
    </header>
  );
};
