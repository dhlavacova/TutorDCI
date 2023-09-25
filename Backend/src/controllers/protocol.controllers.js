import Task from "../models/task.model.js";
/*
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { theme, tutor, date } = req.body;
    const newTask = new Task({
      theme,
      tutor,
      date,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { theme,tutor, date } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { theme, tutor, date },
      { new: true }
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
*/
export const getTasksAll = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Chyba autentikace." });
    }

    else
    {const allTasks = await Task.find({ tutor: req.user.id });

/*const idStudent=allTasks.user
const student=await User.findById(idStudent)
const nameStudent=student.username*/

    /*res.json({allTasks: allTasks,nameStudent: nameStudent});*/
    res.json(allTasks);}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 /* try {
    const allTasks = await Task.find({});
    res.json(allTasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};*/