import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const registerSchema = z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, {
        message: "Username must be at least 3 characters",
      }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    role: z.enum(["student", "tutor"]), // Definir las opciones válidas
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const register2Schema = z.object({
    course: z.enum(["Web Development", "Online Marketing"]),
    classNumber: z.string().nonempty({ required_error: "Number of class is required" }),
    availability: z.array(
        z.object({
            day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
            time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
            duration: z.number() // Changed to number type
        })
    ),
    platformLink: z.string().nonempty({ required_error: "Platform link is required" }),
})