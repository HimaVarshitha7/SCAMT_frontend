import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://scamt.vercel.app/";

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/register`, formData);
  return res.data;
};
