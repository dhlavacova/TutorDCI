import React, { useEffect, useState } from "react";
import { useInfoTutor } from "../context/infotutorContext";
import { Button, Card, Label, Input } from "../components/ui";
import { FaCalendar, FaClock, FaHourglass } from 'react-icons/fa'; // Importa los iconos de FontAwesome

export function TutoringBookingForm() {
  const { allInfoTutors, getAllInfoTutors } = useInfoTutor();
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    getAllInfoTutors()
      .then(() => {
        console.log(allInfoTutors); // Depuración
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const handleTutorChange = (event) => {
    const tutorId = event.target.value;
    const selected = allInfoTutors.tutors.find((tutor) => tutor._id === tutorId);
    setSelectedTutor(selected);
  };

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
            // {...register("theme")}
            />
            <Label htmlFor="tutorSelect">Choose a Tutor</Label>
            <select
              name="tutorSelect"
              className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleTutorChange}>
              <option value="">Seleccionar tutor</option>
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
              <div className="mt-5">
                <ul>
                  {selectedTutor.availability.map((book) => (
                    <li key={book._id}>
                      <Label htmlFor="availableHours">Available Hours:</Label>
                      <Label>
                        <FaCalendar /> Day: {book.day}
                      </Label>
                      <Label>
                        <FaClock /> Time: {book.time}
                      </Label>
                      <Label>
                        <FaHourglass /> Duration: {book.duration} Hour/s
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button type="submit">Confirm</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
