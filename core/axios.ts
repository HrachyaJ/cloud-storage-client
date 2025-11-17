// api/axios.ts
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777",
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("_token");
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
