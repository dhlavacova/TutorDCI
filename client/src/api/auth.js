import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const logoutRequest = async () => axios.post(`/auth/logout`);

export const upload = async (formData) =>
  axios.post(`/upload`, formData);


