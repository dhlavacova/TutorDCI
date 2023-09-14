// components/Home.js
import React, { useEffect, useState } from "react";
// import CreatePost from "../components/CreatePost";
import { useAuth } from "../context/authContext";
// import UserList from "../components/UserList";
import PostList from "../components/PostList";


const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mr-10">
        <div className="flex items-center space-x-4">
          <img
            src="/img/slide1.jpg"
            alt="Profile Image"
            className="w-20 h-20 rounded-full"
          />
          <div className="text-gray-900">
            <p className="text-sm font-semibold">My Profile</p>
            <p className="text-xl font-semibold">
              {isAuthenticated ? user.username : ""}
            </p>
            <p className="text-xs italic">
              DCI {isAuthenticated ? user.role : ""} - Kein Standort
            </p>
          </div>
        </div>
      </div>


      <div className=" flex-1">

        <PostList />
        {/* Contenido principal en el centro */}
      </div>
      <div >
        <div>
          {/* <UserList /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
