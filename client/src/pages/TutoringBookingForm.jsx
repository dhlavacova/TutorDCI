import React, { useEffect, useState } from "react";
import { useInfoTutor } from "../context/infotutorContext";
import {Button, Card, Input, Label, Message} from "../components/ui";
import { useTasks } from "../context/tasksContext.jsx";
import { useNavigate } from "react-router-dom";
import {BookingTutorSchema} from "../schemas/task.js";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export function TutoringBookingForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(BookingTutorSchema),
    });

        const { allInfoTutors, getAllInfoTutors} = useInfoTutor();
    const{createTask,errors: loginErrors,success,setSuccess} = useTasks()

    const [selectedTutor, setSelectedTutor] = useState(null);
    const [theme, setTheme] = useState("");
    const [date, setDate] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        getAllInfoTutors()
            .then(() => {
                console.log({allInfoTutors}); // Depuración
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, []);

       const handleTutorChange = (event) => {
        const tutorName = event.target.value;
        const selected = allInfoTutors.tutors.find((tutor) => tutor.tutorName === tutorName);
        setSelectedTutor(selected);

    };
       const handleMyBooking = (event) => {

           navigate(`/book`)
           setSuccess(false)
        };

    const handleDateChange = (event) => {
        const choosedate = event.target.value;
        setDate(choosedate);
    };

   async function onSubmit(data1) {

        console.log('klik')
       /* const data = {
            tutor: selectedTutor.tutorName,
            theme: theme,
            date: date
        }*/
       setSelectedTutor("");
       setTheme("");
       setDate("");
        console.log(data1)
        await createTask(data1);

    }
console.log({selectedTutor})
    return (
        <div>


            {success ? (
                <div className="p-10">

                    <Card>

                    <p>The form was successfully submitted.</p>
                    <Button onClick={handleMyBooking}>
                        My Booking
                    </Button>
                    </Card>
                </div>
            ) : (
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
                    {loginErrors.map((error, i) => (
                        <Message message={error} key={i} />
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Label htmlFor="theme">Theme</Label>
                        <Input
                            type="text"
                            name="theme"
                            placeholder="Enter the theme"
                            {...register("theme", {required: true})}
                        />
                        <p>{errors.theme?.message}</p>

                        <Label htmlFor="tutorSelect">Choose a Tutor</Label>
                        <select
                            {...register("tutor")}
                            name="tutor"
                            className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            onChange={handleTutorChange}
                        >
                            <option value="">Select tutor</option>
                            {allInfoTutors && allInfoTutors.tutors ? (
                                allInfoTutors.tutors.map((tutor) => (
                                    <option key={tutor._id} value={tutor.tutorName}>
                                        {tutor.tutorName}

                                    </option>

                                ))
                            ) : (
                                <option value="" disabled>
                                    Loading...
                                </option>
                            )}
                        </select>
                        <p>{errors.tutor?.message}</p>
                        {selectedTutor && (
                            <div className="mt-4">
                                <Label htmlFor="date">Choose a Day</Label>
                                <select
                                    {...register("date",{ required: true })}
                                    name="date"
                                    onChange={handleDateChange}
                                    className="block w-full bg-gray-200 text-black mt-2 mb-2 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"

                                >
                                    <option value="">Select day</option>
                                    {selectedTutor.availability.map((day) => {
                                        console.log(day.date)
                                        const isReserved = day.isreserviert;
                                        return (
                                            <option

                                                key={day._id}
                                                value={day.date}
                                               // disabled={isReserved}
                                                className={isReserved ? "text-red-500" : "text-stone-950"}>
                                                {day.dateforUser} {isReserved ? " - Reserved" : ""}
                                            </option>
                                        );
                                    })}
                                </select>
                                <p>{errors.date?.message}</p>
                            </div>
                        )}

                        <Button type="butten" >Confirm</Button>
                    </form>
                </Card>
            </div>
                </div>
                )}
        </div>
    );
}