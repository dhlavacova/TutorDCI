import { z } from "zod";

export const createTaskSchema = z.object({
  theme: z.string({
    required_error: "Theme is required",
  }),
  tutor: z.string().optional(),
  date: z.string().datetime().optional(),
  // falta el la fecha 
});
