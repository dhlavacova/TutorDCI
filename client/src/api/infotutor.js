import axios from "./axios";

export const createTutor = async (tutorData) =>  axios.post("/auth/tutors", tutorData);
       
// export const getTutorsProfile = async (tutors) => axios.get("/auth/tutors");
