
import { useAuth } from "../context/authContext";

import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {

    // console.log(value)
    await signup(value); // Suponiendo que signup establece el rol del usuario en el backend
    const userRole = value.role; // Obten el rol del usuario del formulario
    navigate(`/profile/${userRole}`); // Redirige al perfil correspondiente
  };




  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
     
      <Card >
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold">Join Our Educational Community</h1>
        <p className="text-sm mb-9">Embark on your educational journey by registering as a tutor or student.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Full Name:</Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your full name"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
          <p className="text-xs mt-2" htmlFor="role">Role:</p>
          <div className="flex items-center space-x-4">
            <Label>
              <input className="mb-4 "
                type="radio"
                name="role"
                value="student"
                {...register("role", { required: true })}

              /> Student
            </Label>
            <Label>
              <input className="mb-4"
                type="radio"
                name="role"
                value="tutor"
                {...register("role", { required: true })}

              /> Tutor
            </Label>
          </div>
          {errors.role?.message && (
            <p className="text-red-500">{errors.role?.message}</p>
          )}





          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}

          <Button>Create account</Button>
        </form>
        <p className="flex justify-between ">
          Already Have an Account? <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
