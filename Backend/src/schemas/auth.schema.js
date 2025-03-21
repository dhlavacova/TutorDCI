import { z } from "zod";

export const roleSchema = z.enum(["student", "tutor"]);

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  role: roleSchema,
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
  profileImage: z.string().optional(), 
});


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
