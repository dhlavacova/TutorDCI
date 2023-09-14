import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="my-3 flex justify-between py-5 px-10 rounded-lg bg-gray-100 bg-opacity-50 text-gray-800">
      <h1 className="text-xl font-semibold">
        <Link to={isAuthenticated ? "/dashboard" : "/login"}>D&OS</Link>
      </h1>
      <ul className="flex gap-x-2">
        <li className="flex">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="flex">
          <Link to="/protocol">Protocol</Link>
        </li>
        <li className="flex">
          <Link to="/book">My Classes</Link>
        </li>

      </ul>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <ButtonLink to="/add-task">Book Tutor <span className="text-white  ">+</span></ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
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
    </nav>
  );
}
