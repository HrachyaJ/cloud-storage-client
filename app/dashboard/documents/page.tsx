// app/dashboard/documents/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import axios from "axios";
import { getMe } from "@/app/api/auth-server";
import { DashboardClient } from "@/components/shared";

async function getFiles() {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;

  if (!token) {
    return [];
  }

  try {
    // Get all files, filter out photos
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777"}/files`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const allFiles = response.data;
    const documentFiles = allFiles.filter(
      (file: any) => !file.mimetype?.startsWith("image/")
    );

    return documentFiles;
  } catch (error) {
    console.error("Failed to fetch files:", error);
    return [];
  }
}

export default async function DocumentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("_token")?.value;

  if (!token) {
    redirect("/dashboard/auth");
  }

  let userData;
  let files;

  try {
    [userData, files] = await Promise.all([getMe(), getFiles()]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    redirect("/dashboard/auth");
  }

  return (
    <div>
      <Header user={userData} />
      <div className="w-[1200px] mx-auto my-10">
        <DashboardClient initialFiles={files} />
      </div>
    </div>
  );
}
