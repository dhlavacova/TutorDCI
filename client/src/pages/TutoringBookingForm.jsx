import React, { useState } from "react";
import { Calendar } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useAuth } from "../context/authContext";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TutoringBookingForm() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [locale, setLocale] = useState("de"); // Establece el idioma predeterminado
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(""); // Nuevo estado para el tutor seleccionado
  const [selectedHour, setSelectedHour] = useState(""); // Nuevo estado para la hora seleccionada
  const [tutors, setTutors] = useState([]);

  const fetchTutors = async () => {
    try {
      const response = await fetch('/api/auth/tutors'); // Asegúrate de que la ruta coincida con tu backend
      if (!response.ok) {
        throw new Error('Failed to fetch tutors');
      }
      const data = await response.json();
      setTutors(data.tutors);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const { isAuthenticated, user } = useAuth();



  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
          tutor: selectedTutor, // Agregar el tutor seleccionado a los datos de la tarea
          hour: selectedHour, // Agregar la hora seleccionada a los datos de la tarea
        });
      }

      navigate("/book");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("theme", task.theme);
        setValue("tutor", task.tutor);
        setValue("theme", task.specific);

        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);

        // También establece el tutor y la hora seleccionados si existen en los datos de la tarea
        setSelectedTutor(task.tutor || "");
        setSelectedHour(task.hour || "");
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <header className="flex justify-between pl-10 pt-10">
        <h1 className="text-3xl font-semibold text-slate-800">
          Start today!
        </h1>
      </header>
      <p className="text-slate-700 text-xs pl-10">
        Reserve a class with our expert tutor and take one step closer to your academic goals.
      </p>
      <div className="p-10">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>


            <Label htmlFor="theme">Theme</Label>
            <Input
              type="text"
              name="theme"
              placeholder="Enter your own theme"
              {...register("theme")}
            />

            <Label htmlFor="tutor">Choose a Tutor</Label>


            <select
              name="tutor"
              {...register("tutor")}
              value={selectedTutor}
              className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setSelectedTutor(e.target.value)}
            >
              <option className="text-black" value="">
                Select a Tutor
              </option>

              {tutors.map((tutor) => (
                <option
                  className="text-black"
                  value={tutor.username}
                  key={tutor._id}
                >
                  {tutor.username}
                </option>
              ))}
            </select>



            {/* Muestra las horas disponibles solo si se ha seleccionado un tutor */}
            {selectedTutor && (
              <>
                <label className="text-xs" htmlFor="availableHours">Available Hours</label>
                <div className="mt-2 ">
                  {[20, 21].map((hour) => (
                    <div
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      className={`${selectedHour === hour
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                        } p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 px-4 mb-4`}
                    >
                      {hour}:00
                    </div>
                  ))}
                </div>
              </>
            )}

            <Label htmlFor="date">Select a Date</Label>
            <Calendar
              className="w-full p-4"
              onChange={(item) => setSelectedDate(item)}
              locale={locales[locale]}
              date={selectedDate}
            />

            <Button type="submit">Confirm</Button>
          </form>
        </Card>
      </div>

    </div>

  );
}