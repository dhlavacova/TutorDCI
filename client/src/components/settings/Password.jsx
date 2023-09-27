
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Message, Button, Input, Label } from "../ui";
import { zodResolver } from "@hookform/resolvers/zod";
import {passwordSchema} from "../../schemas/password.js";
import { useSetting } from "../../context/settingsContext.jsx";

function Password() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:zodResolver(passwordSchema),
    });

    const {changePassword, errors:loginErrors}=useSetting();
    const navigate = useNavigate();
    const onSubmit =async(data)=>{
        console.log('submit',data)
        await changePassword(data);
        navigate('/book');
    }
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {loginErrors.map((error, i) => (
                    <Message message={error} key={i}/>
                ))}
                <h1 className="text-2xl font-bold">Set New Password</h1>


                <form onSubmit={handleSubmit(onSubmit)}>

                    <Label htmlFor="oldPassword"> Old password:</Label>
                    <Input
                        type="password"
                        name="oldPassword"
                        placeholder="**********"
                        {...register("oldPassword", {required: true, minLength: 6})}
                    />
                    <p>{errors.oldPassword?.message}</p>

                    <Label htmlFor="password">New password:</Label>
                    <Input
                        type="password"
                        name="newPassword"
                        placeholder="**********"
                        {...register("newPassword", {required: true, minLength: 6})}
                    />
                    <p>{errors.newPassword?.message}</p>

                    <Button>Change password</Button>


                </form>


            </Card>
        </div>
    );
}

export default Password;
