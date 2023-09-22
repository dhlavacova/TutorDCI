import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js";
import {changePassword} from "../controllers/password.controller.js";
import {PasswordSchema} from "../schemas/password.schema.js";
import {validateSchema} from "../middlewares/validator.middleware.js";

const router = Router()

router.patch('/password', validateSchema(PasswordSchema),auth,changePassword)
export default router