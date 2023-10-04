import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import {useEffect} from "react";



function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {  errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try{
    await signin(data);
    if (isAuthenticated) {
      navigate(`/book`);
    }
  }catch(err) {
      console.log("Error during login:", error.message);
    }
  }



  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-sm mb-8">Log in to your account</p>


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

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="**********"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p>{errors.password?.message}</p>

          <Button>Login</Button>

          <p className="mt-4">
            <Link className="text-sky-500" to="/forgot-password">
              Forgot your password?{""}
            </Link>
          </p>
        </form>
        <p className="flex justify-between ">
          Don't have an account?{" "} <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </Card>

    </div>
  );
}


export default LoginPage;

