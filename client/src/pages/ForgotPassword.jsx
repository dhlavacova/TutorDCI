import React from 'react';
import {useSetting} from "../context/settingsContext.jsx";

import {useForm} from "react-hook-form";
import {Button, Card, Input, Label, Message} from "../components/ui/index.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {forgotPasswordSchema} from "../schemas/password.js";
import {Link, useNavigate} from "react-router-dom";

import {FiLock} from "react-icons/fi";

function ForgotPassword(props) {

    const {
        register,
        handleSubmit,

        formState: {errors},
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const {forgotPassword, errors: loginErrors, success} = useSetting();
    const navigate = useNavigate();


    const onSubmit1 = async (data) => {
        console.log('submit', data);
        const res = await forgotPassword(data);  // Předpokládám, že tato funkce vrací odpověď z backendu
        console.log(res);

    };

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
           {success  ?  (
                <div>
                    <Card>
                        <p>A replacement password has been sent to your email address.</p>
                        <Button onClick={handleLogin}>
                            Sign in
                        </Button>
                    </Card>
                </div>
            ) : (
                <div>
                    <Card>
                        {
                            loginErrors.map((error, i) => (
                            <Message message={error} key={i}/>
                        ))}
                        <h1 className="text-2xl font-bold flex items-center"><FiLock className="text-4xl mb-2 mr-2"/>Password
                            Recovery</h1>
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
                                {...register("email", {required: true})}
                            />
                            <p>{errors.email?.message}</p>

                            <Button>Send Reset Instructions</Button>
                            <p className="text-sm mt-2">
                                Remember your password? <Link to="/login" className="text-blue-500">Log in here</Link>.
                            </p>
                        </form>


                    </Card>
                </div>
           )}
                </div>
                );
            }

export default ForgotPassword;