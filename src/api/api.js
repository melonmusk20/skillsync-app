import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
  
    const isAuthRoute =
      config.url?.includes("/auth/login") || config.url?.includes("/customers/register");
  
    if (!isAuthRoute && token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
  
    return config;
  });

export default api;
