import { useTasks } from "../../context/tasksContext";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiVideo,
  FiChevronDown
} from "react-icons/fi";
import ButtonClass from '../ButtonClass';

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100 shadow-xl max-w-md m-10 p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-800">
          Individuelle class by {task.tutor}
        </h1>
      </header>
      <h2 className="text-2xl text-slate-700 font-bold mb-2">{task.theme}</h2>
      <div className="flex items-center mb-2">
        <FiCalendar className="mr-2" /> Mittwoch, 18 september 2023
      </div>
      <div className="flex items-center mb-2">
        <FiClock className="mr-2" /> 20:00 - 21:00(GMT+2)
      </div>
      <div className="flex items-center mb-2">
        <FiUser className="mr-2" /> Participant: {user.username}
      </div>
      <div className="flex items-center mb-2">
        <FiVideo className="mr-2" /> Zoom link
      </div>
      <p className="text-slate-500 text-sm italic ml-6 mb-4">
        Zoom link will be provided 5 minutes before the class.
      </p>

      <ButtonClass task={task} />

{/* button vllt aber besser nicht  */}
      {/* <div className="flex">
        <button
          className="bg-slate-500 text-white font-bold py-2 px-4 rounded-l-lg hover:bg-slate-600"
          onClick={() => {
            // Agrega la lógica para unirte a la clase aquí
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
                  // Agrega la lógica para agregar a calendario aquí
                }}
              >
                Add to calendar
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default TaskCard;
