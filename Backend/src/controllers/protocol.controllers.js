import Task from "../models/task.model.js";

export const getTasksAll = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Chyba autentikace." });
    }
    else {
      const allTasks = await Task.find({ tutor: req.user.username });
    res.json(allTasks);}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

