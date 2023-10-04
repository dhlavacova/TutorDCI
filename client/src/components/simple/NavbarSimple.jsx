import React from "react";
import { Link } from "react-router-dom";


function NavbarSimple() {
  return (
    <nav className="flex justify-between py-5 px-10 rounded-lg bg-opacity-50 text-gray-800">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="font-bold text-2xl">D&OS</h1>
        </Link>
      </div>
    </nav>
  );
}

export default NavbarSimple;
