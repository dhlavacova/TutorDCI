import { Router } from "express";
import {
  getTasksAll,
} from "../controllers/protocol.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import {convertToPdf} from "../controllers/pdf.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();



router.get("/tasks-all", auth, getTasksAll);
router.get("/pdf/:id",  convertToPdf)
export default router;
