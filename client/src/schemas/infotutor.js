import { z } from "zod";



export const register2Schema = z.object({
    course: z.enum(["Web Development", "Online Marketing"]),
    classNumber: z.string().nonempty({ required_error: "Number of class is required" }),
    availability:
        z.object({
            day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
            time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
            duration: z.string() // Changed to number type
        }).refine((availability) => availability.day && availability.time && availability.duration, {
            message: "All availability fields are required",
        })
    ,
    platformLink: z.string().nonempty({ required_error: "Platform link is required" })
        .refine(value => /^(http|https):\/\/[^ "]+$/.test(value), "Invalid URL format"),
})

