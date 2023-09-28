import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import App from "../components/UserImage";
import { ImFileEmpty } from "react-icons/im";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className=" flex justify-between py-5 px-10 rounded-lg  bg-opacity-50 text-gray-800">
       <div className="flex items-center"> {/* Contenedor izquierdo */}
      <Link to={isAuthenticated ? "/dashboard" : "/login"}>
        <img src='img/1.png' alt="Logo" width="100" height="40" />
      </Link>
      <ul className="flex gap-x-2 ml-4">
        {isAuthenticated && (
          <>
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
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1 px-4 rounded-md inline-flex items-center"
                >

                  Book now 
                  {/* <FaPlus className="ml-1" /> */}
                  <ImFileEmpty className="ml-1"/>

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
              {/* <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li> */}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
