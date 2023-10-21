import axios from "./axios";



export const slackRequest = async (message) => axios.post("/slackTutorCommutiny",message);