import React from 'react';
import {useSetting} from "../context/settingsContext.jsx";
import {useForm} from "react-hook-form";
import {Button, Card, Input, Label, Message} from "../components/ui/index.js";
import { zodResolver } from "@hookform/resolvers/zod";
import {forgotPasswordSchema} from "../schemas/password.js";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver:zodResolver(forgotPasswordSchema),
    });

    const {forgotPassword, errors:loginErrors, se}=useSetting();
    const navigate = useNavigate();
    const onSubmit =async(data)=>{
        console.log('submit',data)
        await forgotPassword(data);
        navigate('/login');
    }

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {loginErrors.map((error, i) => (
                    <Message message={error} key={i}/>
                ))}
                <h1 className="text-2xl font-bold">Write your email</h1>


                <form onSubmit={handleSubmit(onSubmit)}>



                    <Label htmlFor="email">Email:</Label>
                    <Input
                        label="Write your email"
                        type="email"
                        name="email"
                        placeholder="youremail@domain.tld"
                        {...register("email", { required: true })}
                    />
                    <p>{errors.email?.message}</p>

                    <Button>Send</Button>


                </form>


            </Card>
        </div>
    );
}

export default ForgotPassword;