import axios from "./axios";


export const getStudents = async () => axios.get("/auth/students"); 


export const createStudentClass = async (studentData) =>  axios.post("/auth/students/info", studentData);
       

