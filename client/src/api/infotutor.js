import axios from "./axios";


export const getTutors = async () => axios.get("/auth/tutors"); 

export const createTutorClassRequer = async (tutorData) =>  axios.post("/auth/tutors2", tutorData);
       

