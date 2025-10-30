import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://scamt-backend-1.onrender.com/api";

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/auth/register`, formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await axios.post(`${API_URL}/auth/login`, formData);
  return res.data;
};
