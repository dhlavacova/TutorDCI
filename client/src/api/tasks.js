import axios from "./axios";

export const getTasksRequest = async () => axios.get("/book");

export const createTaskRequest = async (task) => axios.post("/book", task);

export const updateTaskRequest = async (task) =>
  axios.put(`/book/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/book/${id}`);

export const getTaskRequest = async (id) => axios.get(`/book/${id}`);
