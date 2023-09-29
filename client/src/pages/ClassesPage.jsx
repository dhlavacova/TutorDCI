// tasks/TasksPage.js
import React, { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import  TaskCard  from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export function ClassesPage() {
  const { tasks, getTasks } = useTasks();
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col ">
       <header className="flex justify-between pl-10 pt-10">
      <h1 className="text-3xl font-semibold text-slate-800">
        Welcome to the Educational Community
      </h1>
    </header>
    <p className="text-slate-700 text-xs  pl-10">
      Explore your past and upcoming tutoring reservations.
    </p>
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center py-20 px-10">
          <div >
            <Link
              to="/add-task" >


              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            </Link >

            <h1 className="font-bold text-xl">

              No tutoring slots available, please reserve a new slot

            </h1>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}
