import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import UserImage from "../components/UserImage";
import { ImFileEmpty } from "react-icons/im";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated } = useAuth(); // 
  const location = useLocation();

  // Verifica si la ruta actual es "/login" o "/register"
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
const isRegisterPage2 = location.pathname === "/register2/:role";


  return (
    <nav className="flex justify-between py-5 px-10 rounded-lg bg-opacity-50 text-gray-800">
      <div className="flex items-center">
        {/* Contenedor izquierdo */}
        <Link to={isAuthenticated ? "" : "/"}>
          {/* <img src="img/30.png" alt="Logo" width="100" height="40"  /> */}
          <h1 className="font-bold text-2xl text-red-600">D&OS</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {/* Contenedor derecho */}
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/add-task"
                  className="bg-slate-200 hover:bg-slate-300 text-black font-semibold rounded-full py-2 px-5 inline-flex items-center"
                >Book now <ImFileEmpty className="ml-2" />
                </Link>
              </li>
              <li>
                <UserImage />
              </li>
            </>
          ) : (
            // Condiciona el renderizado de los botones en función de la ruta actual
            (isLoginPage || isRegisterPage||isRegisterPage2) ? null : (
              <>
                <li className="relative inline-block">
                  <Link to="/login" className="relative inline-block font-semibold py-3 px-4 rounded-full text-black transition overflow-hidden">
                    Sign in <div className="absolute inset-0 bg-transparent opacity-0 backdrop-blur-lg hover:opacity-50 rounded-full transition "></div>
                  </Link>

                </li>
                <li>
                  <ButtonLink to="/register">Get Started as student</ButtonLink>
                  <ButtonLink to="/register">Get Started as tutor</ButtonLink>
                </li>
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
