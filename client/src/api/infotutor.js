import axios from "./axios";


export const getTutors = async () => axios.get("/auth/tutors"); 
export const getTAvaibilityRequer = async () => axios.get("/auth/availibility");

export const createTutorClassRequer = async (tutorData) =>  axios.post("/auth/tutors2", tutorData);
       

