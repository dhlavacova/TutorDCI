import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

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
      <p className="text-slate-600 text-sm">O Mittwoch, 18 september 2023</p>
      <p className="text-slate-600 text-sm">O 20:00 - 21:00(GMT+2)</p>
      <p className="text-slate-600 text-sm">O Participant {user.username}</p>
      <p className="text-slate-600 text-sm">O Zoom link</p>
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
      <div className="flex ">
        <div className="relative">
          <Button onClick={toggleMenu} className="bg-slate-400 ">⬇️</Button>
          {isMenuOpen && (
            <div className="absolute left-20 bg-black border rounded-lg shadow-lg">
              <button onClick={() => deleteTask(task._id)}>Cancel this class</button>
              <ButtonLink to={`/`}>Add to calendar</ButtonLink>
            </div>
          )}
        </div>
        <Button className="bg-slate-500 font-bold ">Join class</Button>
      </div>
    </Card>
  );
}
