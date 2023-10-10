import { z } from "zod";

export const tutorSchema = z.object({

  course: z.string().min(1).max(255).refine((value) => !!value, {
    message: "Course is required",
  }),
  classNumber: z.string().min(1).max(50).refine((value) => !!value, {
    message: "Class Number is required",
  }),
  availability: z
    .array(
      z.object({
        day: z.string().min(1).max(255).refine((value) => !!value, {
          message: "Day is required",
        }),
        time: z.string().min(1).max(255).refine((value) => !!value, {
          message: "Time is required",
        }),
        duration: z.string().min(1).max(255).refine((value) => !!value, {
          message: "Duration is required",
        }),
      })
    )
    .refine((availabilities) => availabilities.length > 0, {
      message: "At least one availability is required",
    }),
  platformLink: z.string().min(1).max(255).refine((value) => !!value, {
    message: "Platform Link is required",
  }),
});
