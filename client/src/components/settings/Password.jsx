import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Message, Button, Input, Label } from "../ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../schemas/password.js";
import { useSetting } from "../../context/settingsContext.jsx";
import { FiLock, FiCheckCircle } from "react-icons/fi"; // 

function Password() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(passwordSchema),
    });

    const { changePassword, errors: loginErrors } = useSetting();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log('submit', data);
        await changePassword(data);
        navigate('/book');
    }
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {loginErrors.map((error, i) => (
                    <Message message={error} key={i} />
                ))}
                <h1 className="text-2xl font-bold flex items-center mt-2">
                    <FiLock className="mr-2" /> Secure Password Update
                </h1>
                <p className="text-sm mb-9">For enhanced account security, please update your password.</p>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="flex items-center text-sm mt-2" htmlFor="oldPassword">
                        <FiLock className="mr-2" />Current Password:
                    </label>
                    <Input
                        type="password"
                        name="oldPassword"
                        placeholder="**********"
                        {...register("oldPassword", { required: true, minLength: 6 })}
                    />
                    <p>{errors.oldPassword?.message}</p>

                    <label htmlFor="newPassword" className="flex items-center text-sm mt-2">
                        <FiLock className="mr-2" />New Password:
                    </label>
                    <Input
                        type="password"
                        name="newPassword"
                        placeholder="**********"
                        {...register("newPassword", { required: true, minLength: 6 })}
                    />
                    <p>{errors.newPassword?.message}</p>

                    <button className="flex items-center justify-center w-full bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md my-2 mt-4 disabled:bg-indigo-300 ">
                        Update Password<FiCheckCircle className="ml-2" />
                    </button>
                </form>

            </Card>
        </div>
    );
}

export default Password;
