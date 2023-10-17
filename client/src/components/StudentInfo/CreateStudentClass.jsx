import React, { useEffect, useState } from 'react';
import {  useNavigate, } from "react-router-dom";
import { Button, Input, Label, Message } from "../ui/index.js";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStudentSchema } from "../../schemas/student.js";
import { useAuth } from "../../context/authContext.jsx";

function CreateStudentClass(props) {
    const [studentName, setStudentName] = useState("");
    const { user, studentsClass, errors: loginErrors } = useAuth();
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerStudentSchema),
        defaultValues: {
            info: [{ profession: '', classNumber: '' }]
        }
    });

    const infos = watch('info');
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            setStudentName(user.username);
        }
    }, [user]);
    const onSubmit = async (data) => {
        await studentsClass(data);
        navigate('/login')
    }

    return (
        <div className="max-w-md w-full p-10 rounded-md bg-slate-100 ml-10 ">
            {loginErrors && loginErrors.map((error, i) => (
                <Message message={error} key={i} />
            ))}
            <h1 className="text-2xl font-bold mb-10">Welcome to Information Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="studentName"> </Label>
                <Input
                    type="hidden"
                    name="studentName"
                    value={user.username}
                    {...register("studentName", { required: true })}
                />
                <Label htmlFor="studentEmail"> </Label>
                <Input
                    type="hidden"
                    name="studentEmail"
                    value={user.email}
                    {...register("studentEmail", { required: true })}
                />
                <Label htmlFor="profession">Select your profession</Label>
                <select
                    {...register("profession")}
                    className="w-full bg-gray-200 px-4 py-2 rounded-md text-black"
                    required
                >
                    <option
                        value="">Select your profession</option>
                    <option
                        value="Web Developer">Web Developer</option>
                    <option
                        value="Online Marketer">Online Marketer</option>
                </select>
                <p>{errors.profession?.message}</p>


                <Label htmlFor="classNumber">Course ID</Label>
                <Input
                    {...register("classNumber", { required: true })}
                    type="text"
                    name="classNumber"
                    placeholder="e.g., 22d08a"
                    required
                />
                <p>{errors.classNumber?.message}</p>

                <Button type="button" >
                    Submit Information
                </Button>
            </form>
        </div>
    )
}

export default CreateStudentClass