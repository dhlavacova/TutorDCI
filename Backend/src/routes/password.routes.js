import { Router } from "express";
import {auth} from "../middlewares/auth.middleware.js";
import {changePassword, forgetPassword} from "../controllers/password.controller.js";
import {ForgestPasswordSchema, PasswordSchema} from "../schemas/password.schema.js";
import {validateSchema} from "../middlewares/validator.middleware.js";

const router = Router()

router.patch('/password', validateSchema(PasswordSchema),auth,changePassword)
router.patch('/forgestpassword', validateSchema(ForgestPasswordSchema),forgetPassword)
export default router