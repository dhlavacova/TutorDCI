import { Router } from "express";
import {
  /*createTask,
  deleteTask,
  getTask,
  updateTask,*/
  getTasksAll,
} from "../controllers/protocol.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

/*router.get("/calender", auth, getTasks);

router.post("/protocol", auth, validateSchema(createTaskSchema), createTask);

router.get("/protocol/:id", auth, getTask);

router.put("/protocol/:id", auth, updateTask);

router.delete("/protocol/:id", auth, deleteTask);
*/
router.get("/tasks-all", auth, getTasksAll);

export default router;
