import React, {useEffect, useState} from "react";
import {useInfoTutor} from "../context/infotutorContext";
import {Button, Card, Input, Label} from "../components/ui";
import {useTasks} from "../context/tasksContext.jsx";

export function TutoringBookingForm() {
    const {allInfoTutors, getAllInfoTutors} = useInfoTutor();
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [theme, setTheme] = useState("");
    const [date, setDate] = useState("");
    //const [isreserviert, setIsreserviert] = useState(false)
    const{createTask} = useTasks()
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


    };
/*    const handleDayChange = (event) => {
        const selectedDay = event.target.value;
        setSelectedDay(selectedDay);
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        setSelectedTime(selectedTime);
    };*/
    const handleThemeChange = (event) => {
        const theme = event.target.value;
        setTheme(theme);
    }
    const handleDateChange = (event) => {
        const choosedate = event.target.value;
        setDate(choosedate);
    };

   async function sendDatainTask(event) {
    /*const sendDatainTask = async (event) => {*/
        event.preventDefault();
        console.log('klik')
        const data = {
            tutor: selectedTutor.tutorName,
            theme: theme,
            date: date
        }
        console.log(data)
        await createTask(data);
    }
console.log({selectedTutor})
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
                                    <option key={tutor._id} value={tutor._id} >
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
                                >
                                    <option value="">Select day</option>
                                    {selectedTutor.availability.map((day) => {
                                        const isReserved = day.isreserviert;
                                        return (
                                            <option
                                                key={day._id}
                                                value={day.date}
                                                className={isReserved ? "text-red-500" : "text-stone-950"}>
                                                {day.dateforUser}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}

                        <Button type="submit" onClick={sendDatainTask}>Confirm</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}