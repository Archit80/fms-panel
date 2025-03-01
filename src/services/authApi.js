import { useAuth } from "../context/AuthContext";
import axios from "axios";

const BASE_URL = "https://api.findmyschool.net/api/v1/auth";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// Function to log in and get a token
const authApi = {
    login: async (formData) => {
      try {
        const response = await api.post("/login", formData);
        if (response.data && response.data.code === 201) {
          const { token } = response.data.data;
  
        
          return token;
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Login failed", error);
        throw error;
      }
    },
  };

export default authApi;
