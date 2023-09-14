import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest, getTasksAllRequest,
} from "../api/protocol.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
const [allTasks, setAllTasks] = useState([]); // Nuevo estado para todas las tareas [
  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

const getAllTasks = async () => {
  try{
   const res= await getTasksAllRequest();
    setAllTasks(res.data);
  }catch (error){
    console.error(error);
  }
}

  return (
    <TaskContext.Provider
      value={{
allTasks,
        tasks,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        getAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
