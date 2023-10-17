import { z } from "zod";

export const studentSchema = z.object({

    studentName: z.string().nonempty({ required_error: "Student name is required" }),

    studentEmail: z.string().nonempty({ required_error: "Email is required" }),

    profession: z.string().nonempty({ required_error: "Profession is required" }),

    classNumber: z.string().nonempty({ required_error: "Number of class is required" }),


});



