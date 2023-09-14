import { z } from "zod";

export const BookingTutorSchema = z.object({
  theme: z.string({
    required_error: "Title is required",
  }),
   specific: {
      type: String, // Puedes ajustar el tipo según tus necesidades
      required: false,
    },
  tutor: z.string({
    required_error: "Description is required",
  }),
});
