import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { FaPlus } from "react-icons/fa";
import App from "../components/UserImage";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="my-3 flex justify-between py-5 px-10 rounded-lg  bg-opacity-50 text-gray-800">
      <div className="flex items-center"> {/* Contenedor izquierdo */}
        <h1 className="text-xl font-semibold">
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>D&OS</Link>
        </h1>
        <ul className="flex gap-x-2 ml-4">
          {isAuthenticated && (
            <>
              {/* <li className="flex">
                <Link to="/dashboard">Dashboard</Link>
              </li> */}
              <li className="flex">
                <Link to="/protocol">Protocol</Link>
              </li>
              <li className="flex">
                <Link to="/book">My Booking</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex items-center"> {/* Contenedor derecho */}
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/add-task"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-md inline-flex items-center"
                >
                  Book tutor <FaPlus className="ml-1" />
                </Link>
              </li>
              <li>
                <App />
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
