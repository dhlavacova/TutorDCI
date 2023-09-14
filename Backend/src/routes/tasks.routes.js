import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/book", auth, getTasks);

router.post("/book", auth, validateSchema(createTaskSchema), createTask);

router.get("/book/:id", auth, getTask);

router.put("/book/:id", auth, updateTask);

router.delete("/book/:id", auth, deleteTask);










export default router;
