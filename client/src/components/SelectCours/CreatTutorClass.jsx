import React, {useEffect, useState} from 'react';
import {Link, useNavigate,} from "react-router-dom";
import {Card, Button, Input, Label, Message} from "../ui/index.js";
import {useForm, useFieldArray} from "react-hook-form";
//import {useClassTutor} from "../../context/creatTutorClassContext.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {register2Schema} from "../../schemas/infotutor.js";
import {useAuth} from "../../context/authContext.jsx";

function CreatTutorClass(props) {
    const [tutorName, setTutorName] = useState("");
    const {user,tutClass, errors: loginErrors} = useAuth()
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(register2Schema),
        defaultValues: {
            availability: [{day: '', time: '', duration: ''}]
        }
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "availability"
    });
    const addAvailability = () => {
        append({day: '', time: '', duration: ''});
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
                    <Message message={error} key={i}/>
                ))}
                <h1 className="text-2xl font-bold">Form for Setting Course and Teacher Availability</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="tutorName"> </Label>
                    <Input
                        type="hidden"
                        name="tutorName"
                        value={user.username}
                        {...register("tutorName", {required: true})}
                    />

                    <Label htmlFor="course"> Select the course you wish to teach</Label>
                    <select {...register("course")} required>
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
                        {...register("classNumber", {required: true})}
                    />
                    <p>{errors.classNumber?.message}</p>

                    {fields.map((availability, index) => (
                        <div key={index}>
                            <label className="text-xs text-black">Day of the week</label>


                            <select {...register(`availability[${index}].day`)} required>
                                <option value="">Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>


                            <label className="text-xs text-black" htmlFor="availability">Available Time</label>


                            <select {...register(`availability[${index}].time`)} required>
                                <option value="">Time</option>
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
                                <option value="21:00">20:00</option>
                                <option value="21:30">20:30</option>
                            </select>

                            <label className="text-xs text-black" htmlFor="availability">Duration</label>
                            <select {...register(`availability[${index}].duration`)} required>
                                <option value="">Hour</option>
                                <option value="1">1 hour</option>
                                <option value="2">2 hours</option>
                                <option value="3">3 hours</option>
                                <option value="4">4 hours</option>
                            </select>
                            <p>{errors.availability?.message}</p>
                            {index > 0 && (
                                <button type="button" className="text-sky-600 underline underline-offset-2 "
                                        onClick={() => remove(index)}>
                                    delete
                                </button>
                            )}

                        </div>
                    ))}
                    <button type="button" className="text-sky-600 underline underline-offset-2 "
                            onClick={addAvailability}>
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
                        placeholder="e.g., https://us02web.zoom.us/oz"
                        {...register("platformLink", {required: true})}
                    />
                    <p>{errors.platformLink?.message}</p>


                    <Button>Send</Button>


                </form>
            </Card>
        </div>
    );
}

export default CreatTutorClass;