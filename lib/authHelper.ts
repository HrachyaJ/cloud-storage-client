import { getMe } from "@/app/api/auth-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;

  if (!token) {
    redirect("/dashboard/auth");
  }

  try {
    const userData = await getMe();
    return userData;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    redirect("/dashboard/auth");
  }
}
