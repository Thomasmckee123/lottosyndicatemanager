import axios from "axios";
import TokenUtils from "./token";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? "http://localhost:3000/api/",
  
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenUtils.getAccessToken()
        
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance