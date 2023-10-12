import React from 'react';
import { useSetting } from "../context/settingsContext.jsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Label, Message } from "../components/ui/index.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../schemas/password.js";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from '@nextui-org/modal';
import { FiLock } from "react-icons/fi";

function ForgotPassword(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const { forgotPassword, errors: loginErrors, success } = useSetting();
    const navigate = useNavigate();



    const onSubmit1 = async (data) => {
        console.log('submit', data);
        await forgotPassword(data);
        navigate("/login");
    };

    /*    useEffect(() => {
            if (success) {
                alert("Thank you! If the email address is associated with an account, we've sent a temporary password to it. Please check your inbox.");
                navigate("/login");
            }
        }, [onSubmit1]); // watch the `success` state for changes*/


    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {loginErrors.map((error, i) => (
                    <Message message={error} key={i} />
                ))}
                <h1 className="text-2xl font-bold flex items-center"><FiLock className="text-4xl mb-2 mr-2" />Password Recovery</h1>
                <p className="text-sm mb-9">
                    Please enter your email address, and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit(onSubmit1)}>


                    <Label htmlFor="email">Email:</Label>
                    <Input
                        label="Write your email"
                        type="email"
                        name="email"
                        placeholder="youremail@domain.tld"
                        {...register("email", { required: true })}
                    />
                    <p>{errors.email?.message}</p>

                    <Button>Send Reset Instructions</Button>
                    <p className="text-sm mt-2">
                        Remember your password? <Link to="/login" className="text-blue-500">Log in here</Link>.
                    </p>
                </form>


            </Card>

        </div>
    );
}

export default ForgotPassword;