import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Card, Button, Input, Label, Message} from "../ui/index.js";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/authContext.jsx";
import {zodResolver} from "@hookform/resolvers/zod";

import {register2Schema} from "../../schemas/auth.js";

function CreatTutorClass(props) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(register2Schema)
    });
    const {tutClass, errors: loginErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log('submit', data)
        await tutClass(data);
        if (isAuthenticated) {
            navigate('/book')
        } else {
            navigate('/login')
        }

    }
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {loginErrors.map((error, i) => (
                    <Message message={error} key={i}/>
                ))}
                <h1 className="text-2xl font-bold">Form for Setting Course and Teacher Availability</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="oldPassword"> Select the course you wish to teach</Label>
                    <select {...register("course")}>
                        <option value="" disabled>Select a course</option>
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


                    <label className="text-xs text-black" htmlFor="availability">How many hours can you teach per
                        week?</label>

                    <div className="flex mt-2">
                        <select {...register("availabilityDay")}>
                            <option value="" disabled>Day...</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        <p>{errors.availabilityDay?.message}</p>

                        <label className="text-xs text-black" htmlFor="availability">How many hours can you teach per
                            week?</label>

                        <div className="flex mt-2">
                            <select {...register("availabilityTime")}>
                                <option value="" disabled>Time...</option>
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
                            <p>{errors.availabilityTime?.message}</p>

                            <select {...register("availabilityDuration")}>
                                <option value="" disabled>Hour...</option>
                                <option value="1">1 hour</option>
                                <option value="2">2 hours</option>

                            </select>
                            <p>{errors.availabilityDuration?.message}</p>
                        </div>
                    </div>
                    <div className="mt-4"></div>
                    <Label htmlFor="platformLink">Platform Link</Label>
                    <Input
                        type="text"
                        name="platformLink"
                        placeholder="e.g., https://us02web.zoom.us/oz"
                        {...register("platformLink", {required: true, minLength: 6})}
                    />
                    <p>{errors.platformLink?.message}</p>


                    <Button>Send</Button>


                </form>
            </Card>
        </div>
    );
}

export default CreatTutorClass;