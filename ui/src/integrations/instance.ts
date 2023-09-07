import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const setBearerToken = (bearer: string) => {
  instance.interceptors.request.use((config): InternalAxiosRequestConfig => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${bearer}`;
    }
    return config;
  });
};
export default instance;
