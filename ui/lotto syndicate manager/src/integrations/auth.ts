import axios from "axios";
import TokenUtils from "./token";
import.meta.env.VITE_BASE_URL
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:3000/api/",
  
  headers: {
    "Content-Type": "application/json",
  },
});console.log(process.env.REACT_APP_API_URL);
console.log(instance)
instance.interceptors.request.use(
  (config) => {
    const token =
      config.url !== "/auth/refresh"
        ? TokenUtils.getAccessToken()
        : TokenUtils.getRefreshToken();
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