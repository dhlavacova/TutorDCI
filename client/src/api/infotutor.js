import axios from "./axios";

export const createTutor = async (tutorData) =>  axios.post("/auth/tutors", tutorData);
       

// Otras funciones relacionadas con la información del tutor
