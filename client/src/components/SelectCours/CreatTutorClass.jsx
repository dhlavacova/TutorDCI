import React, { useEffect, useState } from 'react';
import { Link, useNavigate, } from "react-router-dom";
import { Card, Button, Input, Label, Message } from "../ui/index.js";
import { useForm, useFieldArray } from "react-hook-form";
//import {useClassTutor} from "../../context/creatTutorClassContext.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { register2Schema } from "../../schemas/infotutor.js";
import { useAuth } from "../../context/authContext.jsx";
import { FaTrash, FaPlus } from 'react-icons/fa';


function CreatTutorClass(props) {
    const [tutorName, setTutorName] = useState("");
    const { user, tutClass, errors: loginErrors } = useAuth()
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(register2Schema),
        defaultValues: {
            availability: [{ day: '', time: '', duration: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "availability"
    });
    const addAvailability = () => {
        append({ day: '', time: '', duration: '' });
    }

    const availabilities = watch('availability');
    /*const {tutClass, errors: loginErrors} = useClassTutor();*/
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            setTutorName(user.username);
        }
    }, [user]);
    const onSubmit = async (data) => {

        console.log('submit', data)
        await tutClass(data);
        navigate('/login')


    }

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {loginErrors && loginErrors.map((error, i) => (
                    <Message message={error} key={i} />
                ))}
                <h1 className="text-2xl font-bold">Form for Setting Course and Teacher Availability</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="tutorName"> </Label>
                    <Input
                        type="hidden"
                        name="tutorName"
                        value={user.username}
                        {...register("tutorName", { required: true })}
                    />
                    <Label htmlFor="tutorEmail"> </Label>
                    <Input
                        type="hidden"
                        name="tutorEmail"
                        value={user.email}
                        {...register("tutorEmail", { required: true })}
                    />
                    <Label htmlFor="course"> Select the course you wish to teach</Label>
                    <select
                        {...register("course")}
                        className="w-full mt-2 bg-gray-200 px-4 py-2 rounded-md text-black"
                        required>
                        <option value="">Select a course</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Online Marketing">Online Marketing</option>
                    </select>
                    <p>{errors.course?.message}</p>
                    <Label htmlFor="classNumber">Course ID</Label>
                    <Input
                        type="text"
                        name="classNumber"
                        placeholder="e.g., 22d08a"
                        {...register("classNumber", { required: true })}
                    />
                    <p>{errors.classNumber?.message}</p>

                    {fields.map((availability, index) => (
                        <div key={index}>
                            <Label htmlFor="availability">How many hours can you teach per week?</Label>
                            <select
                                {...register(`availability[${index}].duration`)}
                                className="w-full bg-gray-200 px-2 py-2 rounded-md text-black mr-2 mt-2"
                                required>
                                <option value="">Select...</option>
                                <option value="1">60 minutes</option>

                            </select>
                            <p>{errors.availability?.message}</p>

                            <Label className="text-xs text-black">Day of the week</Label>


                            <select {...register(`availability[${index}].day`)}

                                className="w-full bg-gray-200 mt-2 px-2 py-2 rounded-md text-black" required>
                                <option value="">Select...</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>


                            <Label className="text-xs text-black" htmlFor="availability">Available Time</Label>


                            <select {...register(`availability[${index}].time`)}
                                className="w-full bg-gray-200 mt-2 px-2 py-2 rounded-md text-black "
                                required>
                                <option value="">Select..</option>
                                <option value="16:00">16:00</option>
                                <option value="16:30">16:30</option>
                                <option value="17:00">17:00</option>
                                <option value="17:30">17:30</option>
                                <option value="18:00">18:00</option>
                                <option value="18:30">18:30</option>
                                <option value="19:00">19:00</option>
                                <option value="19:30">19:30</option>
                                <option value="20:00">20:00</option>
                                <option value="20:30">20:30</option>
                                <option value="21:00">21:00</option>
                                <option value="21:30">21:30</option>
                            </select>


                            {index > 0 && (
                                <button type="button" className="text-sky-600 underline underline-offset-2 py-2 mt-2 text-xs flex items-center" onClick={() => remove(index)}>
                                    <span className="mr-1">
                                        <FaTrash />
                                    </span>
                                    Delete
                                </button>
                            )}

                        </div>
                    ))}
                    <button type="button" className="text-sky-600 underline underline-offset-2 py-2 mt-2 text-xs flex items-center" onClick={addAvailability}>
                        <span className="mr-1">
                            <FaPlus />
                        </span>
                        Add Availability
                    </button>
                    {/* {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                       delete
                    </button>
                )}*/}
                    <div className="mt-4"></div>
                    <Label htmlFor="platformLink">Platform Link</Label>
                    <Input
                        type="text"
                        name="platformLink"
                        placeholder="e.g., https://zoomlink.com"
                        {...register("platformLink", { required: true })}
                    />
                    <p>{errors.platformLink?.message}</p>


                    <Button>Send</Button>


                </form>
            </Card>
        </div>
    );
}

export default CreatTutorClass;