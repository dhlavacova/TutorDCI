import axios from "./axios";



export const changePasswordRequest = async (password) => axios.patch("/password",password);