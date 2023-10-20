import {z} from "zod";

export const messageSleckschema = z.object({
    message: z.string().trim()
})