// api/files.ts
import axios from "@/core/axios";
import { FileItem } from "./dto/files.dto";

type FileType = "all" | "photos" | "trash";

export const getAll = async (type: FileType = "all"): Promise<FileItem[]> => {
  return (await axios.get("/files?type=" + type)).data;
};

export const remove = (ids: number[]): Promise<void> => {
  // Join IDs with comma for the query string
  return axios.delete("/files?ids=" + ids.join(","));
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
