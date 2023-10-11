import React, { useEffect, useState } from "react";
import { useInfoTutor } from "../context/infotutorContext";
import { Button, Card, Label, Input } from "../components/ui";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function TutoringBookingForm() {
  const { allInfoTutors, getAllInfoTutors } = useInfoTutor();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDays, setAvailableDays] = useState([]);

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

    if (selected) {
      setSelectedTutor(selected);
      setSelectedDay("");
      setSelectedTime("");
      setAvailableDays(selected.availability.map((book) => book.day));
    } else {
      setSelectedTutor(null);
      setSelectedDay("");
      setSelectedTime("");
      setAvailableDays([]);
    }
  };

  const handleDayChange = (date) => {
    setSelectedDay(date);
  };


  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);
  };


  // console.log("selectedDay:", selectedDay);
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
                <Calendar
                  onChange={handleDayChange}
                  value={selectedDay}
                 
                 
                />



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
                        .filter((book) => book.day === selectedDay.toISOString().split('T')[0])
                        .map((book) => (
                          <option key={book.time} value={book.time}>
                            {book.time}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            )}
            <Button type="submit">Confirm</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
