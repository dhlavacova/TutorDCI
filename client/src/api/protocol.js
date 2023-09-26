import axios from "./axios";


export const getTasksAllRequest = async () => axios.get("/protocol");

