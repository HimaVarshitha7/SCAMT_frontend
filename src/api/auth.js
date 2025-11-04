import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, formData);
    return res.data; 
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, formData);
    return res.data; 
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Profile fetch error:", error.response?.data || error.message);
    throw error;
  }
};
