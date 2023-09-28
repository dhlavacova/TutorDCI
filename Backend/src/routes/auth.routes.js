import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  getTutors,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { getUserImage } from "../controllers/user-controller.js";

import multerController from '../controllers/multer-controller.js';



const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

router.get("/tutors", getTutors);
router.get("/user-image", auth, getUserImage);
router.post('/api/upload',auth, multerController);

export default router;
