import { z } from "zod";

export const PasswordSchema = z.object({
    oldPassword: z
        .string({
            required_error: "OldPassword is required",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
        }),
    newPassword: z
        .string({
            required_error: "newPassword is required",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
        }),
})

export const ForgestPasswordSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
})