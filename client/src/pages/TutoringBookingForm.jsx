import React, { useEffect, useState } from "react";
import { useInfoTutor } from "../context/infotutorContext";
import { Button, Card, Label, Input } from "../components/ui";
import { FaCalendar, FaClock, FaHourglass } from "react-icons/fa";

export function TutoringBookingForm() {
  const { allInfoTutors, getAllInfoTutors } = useInfoTutor();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayNumber, setSelectedDayNumber] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [theme, setTheme] = useState("");
  const [date, setDate] = useState("");
const [timeout,setTimeout]=useState(undefined)
  useEffect(() => {
    getAllInfoTutors()
      .then(() => {
        console.log(allInfoTutors); // Depuración
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

console.log({allInfoTutors});
  const handleTutorChange = (event) => {
    const tutorId = event.target.value;
    const selected = allInfoTutors.tutors.find((tutor) => tutor._id === tutorId);
    setSelectedTutor(selected);
    setSelectedDay("");
    setSelectedTime("");

    const preDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const toDay = new Date();
    const toDayWoche = toDay.getDay();

    const futureDates = selected.availability.map(days => {
      const dayIndex = preDay.indexOf(days.day);
      const difference = dayIndex - toDayWoche;

      const futureDate = new Date(toDay);
      if (difference < 0) {
        futureDate.setDate(toDay.getDate() + difference + 7);
      } else if (difference === 0) {
        return `Today (${toDay.getDate()}.${toDay.getMonth() + 1})`;
      } else {
        futureDate.setDate(toDay.getDate() + difference);
      }

      return `${preDay[dayIndex]} ${futureDate.getDate()}.${futureDate.getMonth() + 1}.${futureDate.getFullYear()} at  ${days.time} hours`;
    });
setTimeout(futureDates)
    console.log({ futureDates });

  };
  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);
  };
  const handleThemeChange= (event) => {
    const theme=event.target.value;
    setTheme(theme);
  }
  const handleDateChange = (event) => {
    const choosedate = event.target.value;
   /* const parts = choosedate.split(' ');
    const day = parts[1].slice(0, -1); // "16"
    const month = parts[2].split('.')[0]; // "10"
    const hours = parts[4].split(':')[0]; // "16"
    const minutes = parts[4].split(':')[1]; // "30"

    const date = new Date(2023, month - 1, day, hours, minutes); // Měsíce začínají od 0 v JavaScriptu

    const formattedDate = date.toISOString();*/
    setDate(choosedate);
  };

const sendDatainTask = (event) => {
  event.preventDefault();
  console.log('klik')
  const data={
    tutor:selectedTutor.tutorName,
    theme:theme,
    user:selectedTutor._id,
date:date
  }
  console.log(data)
}

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
          <form>
            <Label htmlFor="theme">Theme</Label>
            <Input
              type="text"
              name="theme"
              placeholder="Enter the theme"
              value={theme}
              onChange={handleThemeChange}
            />
            <Label htmlFor="tutorSelect">Choose a Tutor</Label>
            <select
              name="tutorSelect"
              className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleTutorChange}
            >
              <option value="">Select tutor</option>
              {allInfoTutors && allInfoTutors.tutors ? (
                allInfoTutors.tutors.map((tutor) => (
                  <option key={tutor._id} value={tutor._id}>
                    {tutor.tutorName}

                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>

            {selectedTutor && (
              <div className="mt-4">
                <Label htmlFor="daySelect">Choose a Day</Label>
                <select
                  name="daySelect"
                  onChange={handleDateChange}
                  className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                 /* onChange={handleDayChange}*/
                >

                  <option value="">Select day</option>
                  {timeout.map((book) =>  (
                    <option key={book} value={book}>
                      {book}
                      {console.log({book}) }
                    </option>
                  ))}
                </select>
{/*

               {selectedDay && (
                  <div className="mt-4">
                    <Label htmlFor="timeSelect">Choose a Time</Label>
                    <select
                      name="timeSelect"
                      className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      onChange={handleTimeChange}
                    >
                      <option value="">Select time</option>
                      {selectedTutor.availability
                        .filter((book) => book.day === selectedDay)
                        .map((book) => (
                          <option key={book.time} value={book.time}>
                            {book.time}
                          </option>
                        ))}
                    </select>
                  </div>
               )}*/}
              </div>
            )}
{/*
            {selectedDay && selectedTime && (
              <div className="mt-4">
                <h3>Detalles de la reserva:</h3>
                <p>Tutor: {selectedTutor.tutorName}</p>
                <p>Fecha seleccionada: {selectedDay}</p>
                <p>Hora seleccionada: {selectedTime}</p>
                 Puedes agregar más detalles aquí si es necesario
              </div>
            )}*/}

            <Button type="submit" onClick={sendDatainTask}>Confirm</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}