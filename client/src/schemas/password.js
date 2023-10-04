import { z } from "zod";
export const passwordSchema = z.object({

    oldPassword: z.string().min(6, {
        message: " Old password must be at least 6 characters",
    }),
    newPassword: z.string().min(6, {
        message: "New password must be at least 6 characters",
    }),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
})