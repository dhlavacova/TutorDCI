import { z } from "zod";

export const tutorSchema = z.object({
  course: z.string().min(1).max(255),
  classNumber: z.string().min(1).max(50),
  availability: z.array(
    z.object({
      day: z.string().min(1).max(255),
      time: z.string().min(1).max(255),
      duration: z.string().min(1).max(255),
    })
  ),
  platformLink: z.string().min(1).max(255),
    // profileImage: z.string().min(1).max(255), // Almacenar la URL de la imagen
});


