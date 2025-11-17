// api/auth-server.ts - SERVER SIDE ONLY
// DO NOT import this in client components!
import axios from "axios";
import { cookies } from "next/headers";
import { User } from "./dto/auth.dto";

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777";
  const endpoint = `${baseURL}/users`;

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      endpoint: endpoint,
    });
    throw error;
  }
};
