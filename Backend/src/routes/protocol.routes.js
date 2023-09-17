import { Router } from "express";
import {
  getTasksAll,
} from "../controllers/protocol.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import {convertToPdf} from "../controllers/pdf.controller.js";


const router = Router();



router.get("/tasks-all", auth, getTasksAll);
router.get("/pdf/:id",   convertToPdf)
export default router;
