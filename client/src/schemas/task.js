import { z } from "zod";

export const BookingTutorSchema = z.object({
  theme: z.string({
    required_error: "Theme is required",
  }),
  tutor: z.string({
    required_error: "Tutor is required",
  }),
   date: z.string({
     required_error: "Date is required",
   }),
});