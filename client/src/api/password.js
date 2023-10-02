import axios from "./axios";



export const changePasswordRequest = async (password) => axios.patch("/password",password);
export const forgotPasswordRequest = async (email) => axios.patch("/forgestpassword",email);