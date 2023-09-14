import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";


export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { isAuthenticated, user } = useAuth();


  const [isMenuOpen, setIsMenuOpen] = useState(false); // Nuevo estado para controlar el menú desplegable

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-800">Individuelle class by {task.tutor}</h1>
      </header>
      <h2 className="text-2xl text-slate-700 font-bold ">{task.theme}</h2>
      <p className="text-slate-600 text-sm mb-2">O Mittwoch, 18 september 2023</p>
      <p className="text-slate-600 text-sm mb-2">O 20:00 - 21:00(GMT+2)</p>
      <p className="text-slate-600 text-sm mb-2">O Participant {user.username}</p>
      <p className="text-slate-600 text-sm mb-2">O Zoom link</p>
      <p className="text-slate-500 text-sm italic">O will be provided 5 minutes before class</p>


      {/* format date */}
      <p className="italic text-slate-500 text-sm">
        O{" "}
        {task.date &&
          new Date(task.date).toLocaleDateString("De", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <div className="flex">
        <button
          className="bg-slate-500 text-white font-bold py-2 px-4 rounded-l-lg hover:bg-slate-600"
          onClick={() => {
            // Lógica para "Join class"
          }}
        >
          Join class
        </button>
        <div className="relative inline-block">
          <button
            onClick={toggleMenu}
            className="bg-slate-200 text-black font-bold py-4 px-4 rounded-r-lg hover:bg-slate-200"
          >
            <FiChevronDown />
          </button>
          {isMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <button
                onClick={() => deleteTask(task._id)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              >
                Cancel this class
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                onClick={() => {
                  // Lógica para "Add to calendar"
                }}
              >
                Add to calendar
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
