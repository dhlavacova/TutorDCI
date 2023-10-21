import { Router } from "express";
import express from 'express';
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "../schemas/auth.schema.js";
import { auth } from "../middlewares/auth.middleware.js";
import { tutorSchema } from "../schemas/infotutor.schema.js";
import { studentSchema } from "../schemas/infostudent.schema.js";

import {
  createTutorClass,
  getAvailibility,
  getTutors,
} from "../controllers/infotutor.controller.js";
import {
  createStudentClass,
  getStudents,
} from '../controllers/infostudent.controller.js';

const router = Router();



router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);


router.get("/tutors", getTutors);
router.get("/availibility", auth, getAvailibility);
router.post("/tutors2", validateSchema(tutorSchema), createTutorClass);


router.get("/students", getStudents);
router.post("/students/info", validateSchema(studentSchema), createStudentClass);



export default router;
