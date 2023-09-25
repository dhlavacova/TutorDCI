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
import {auth} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

router.get("/tutors", getTutors);

export default router;
