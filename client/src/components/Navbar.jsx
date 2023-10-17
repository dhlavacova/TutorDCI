import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import UserImage from "../components/UserImage";
import { ImFileEmpty } from "react-icons/im";
import { useLocation } from "react-router-dom";
import TourGuide from "../driver/TourGuide";

export function Navbar() {
  const { isAuthenticated } = useAuth(); // 
  const location = useLocation();

  // Verifica si la ruta actual es "/login" o "/register"
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isRegisterPage2 = location.pathname.startsWith("/register2/");
  const ispagenotfound = location.pathname === "*"

  // const isRegisterPage2 = location.pathname === "/register2/:role";

  return (
    <nav className="flex justify-between py-5 px-10 rounded-lg bg-opacity-50 text-gray-800">
      <div className="flex items-center">
        {/* Contenedor izquierdo */}
        <Link to={isAuthenticated ? "" : "/"}>
          {/* <img src="img/l0.png" alt="Logo" width="50" height="40" /> */}

          <img src="/img/l0.png" alt="Logo" width="60" height="50" />

        </Link>
        {/* <h1 className="font-bold text-2xl text-slate-600 ">D&OS</h1> */}
        {/* <p className="text-xs ml-2">Learn and Grow</p> */}
      </div>
      <div className="flex items-center">
        {/* Contenedor derecho */}
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>
                <div >
                  {/* <TourGuide isAuthenticated={isAuthenticated} /> */}
                  <Link

                    to="/add-task"
                    id="botton-book"
                    className="bg-slate-200 shadow-xl hover:bg-slate-300 text-black font-semibold rounded-full py-2 px-5 inline-flex items-center"
                  >
                    Book now
                    <ImFileEmpty className="ml-2 animate-icon" />
                  </Link>
                </div>

              </li>
              <li >
                <UserImage />
              </li>
            </>
          ) : (
            // Condiciona el renderizado de los botones en función de la ruta actual
            (isLoginPage || isRegisterPage || isRegisterPage2 || ispagenotfound) ? null : (
              <>
                <li className="relative inline-block">
                  <Link to="/login" className="relative inline-block font-semibold py-3 px-4 rounded-full text-black transition overflow-hidden">
                    Sign in <div className="absolute inset-0 bg-transparent opacity-0 backdrop-blur-lg hover:opacity-80 rounded-full transition "></div>
                  </Link>

                </li>
                <li>
                  <ButtonLink to="/register">Get Started </ButtonLink>

                </li>
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
