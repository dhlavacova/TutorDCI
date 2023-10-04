import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { auth } from "../middlewares/auth.middleware.js";

import { getUserImage } from "../controllers/user-controller.js";

import multerController from '../controllers/multer-controller.js';

import { 
createTutor,
// getTutorsProfile 
} from "../controllers/infotutor.controller.js";




const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

router.post("/tutors", createTutor);
// router.get("/tutors", getTutorsProfile);


// router.get("/tutors/:tutorId/availability", getTutorAvailability);

router.get("/user-image", auth, getUserImage);
router.post("/upload", auth, multerController);

export default router;
