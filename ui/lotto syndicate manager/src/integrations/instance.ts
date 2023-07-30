
// import axios, { InternalAxiosRequestConfig } from "axios";

// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:3000/api",
// });

// export const setBearerToken = (bearer: string) => {
//   axiosInstance.interceptors.request.use(
//     (config): InternalAxiosRequestConfig => {
//       if (config.headers) {
//         config.headers.Authorization = `Bearer ${bearer}`;
//       }
//       return config;
//     }
//   );
// };