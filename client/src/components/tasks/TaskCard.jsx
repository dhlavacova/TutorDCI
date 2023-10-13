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
    function getCurrentDate(datum) {
        try {
            const dateOptions = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
            /*const timeOptions = { hour: '2-digit', minute: '2-digit' };*/
            if (!(datum instanceof Date)) {
                console.log("datum was not a date object");
                datum = new Date(datum);
            }
            const datePart = datum.toLocaleDateString('en-GB', dateOptions);
            console.log("datePart:", datePart)
            return `${datePart}`
        } catch (error) {
            console.error("Error in getCurrentDate:", error);
            return "Invalid Date";
        }
    }


    function getCurrentHours(hours) {
        try{
            const dateOptions = { hour: '2-digit', minute: '2-digit' };
            if (!(hours instanceof Date)) {
                console.log("datum was not a date object");
              hours= new Date(hours);
            }
            const timePart = hours.toLocaleTimeString('en-GB', dateOptions);
            console.log("datePart:", timePart)
            return `${timePart}`
        } catch (error) {
            console.error("Error in getCurrentDate:", error);
            return "Invalid Date";
        }
        } function addHours(time) {
        try{
            const dateOptions = { hour: '2-digit', minute: '2-digit' };
            if (!(time instanceof Date)) {
                console.log("datum was not a date object");
              time= new Date(time)
            }
            time.setHours(time.getHours() + 1)
            const timePart = time.toLocaleTimeString('en-GB', dateOptions);
            console.log("datePart:", timePart)
            return `${timePart}`
        } catch (error) {
            console.error("Error in getCurrentDate:", error);
            return "Invalid Date";
        }
        }


  return (
    <div className="bg-gray-100 shadow-xl max-w-md m-10 p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-800">
          Individuelle class by {task.tutor}
        </h1>
      </header>
      <h2 className="text-2xl text-slate-700 font-bold mb-2">{task.theme}</h2>
      <div className="flex items-center mb-2">
        <FiCalendar className="mr-2" /> {getCurrentDate(task.date)}
      </div>
      <div className="flex items-center mb-2">
        <FiClock className="mr-2" /> {getCurrentHours(task.date)}-{addHours(task.date)}
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

{/* other button  aber besser nicht verwendet */}
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
