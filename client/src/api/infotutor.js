import axios from "./axios";

export const createTutor = async (tutorData) =>  axios.post("/auth/tutors", tutorData);

export const getTutors = async () => axios.get("/auth/tutors"); 