// tasks/TasksPage.js
import React, { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { useAuth } from "../context/authContext";

export function ClassesPage() {
  const { tasks, getTasks } = useTasks();
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {/* <div className="flex items-center p-10 bg-gray-100 rounded-md">
        <img
          src="/img/slide1.jpg"
          alt="Imagen de usuario"
          className="w-40 h-40 rounded-full"
        />
        <div className="text-gray-900 ml-4">
          <p className="text-sm font-semibold">My profile</p>
          <p className="text-4xl font-semibold mb-2">
            {isAuthenticated ? user.username : ""}
          </p>
          <p className="text-xs">
            DCI {isAuthenticated ? user.role : ""}, - Kein Standort
          </p>
        </div>
      </div> */}

      {tasks.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
            No tutoring slots available, please reserve a new slot
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}
