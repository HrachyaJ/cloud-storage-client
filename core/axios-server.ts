import axios from "axios";
import { cookies } from "next/headers";

export async function getServerAxios() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777",
  });

  // Get token from server-side cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;

  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return axiosInstance;
}
