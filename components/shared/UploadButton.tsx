"use client";

import { useState, useRef } from "react";
import { CloudUpload, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadButtonProps {
  onUploadComplete?: () => void;
}

export default function UploadButton({ onUploadComplete }: UploadButtonProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("uploading");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Get auth token
      const token = Cookies.get("_token");

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(Math.round(percentComplete));
        }
      });

      // Handle completion
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.addEventListener("load", () => {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Upload failed"));
        });

        xhr.addEventListener("abort", () => {
          reject(new Error("Upload aborted"));
        });
      });

      // Configure and send request
      xhr.open("POST", "http://localhost:7777/files");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);

      // Wait for upload to complete
      await uploadPromise;

      setStatus("success");
      toast.success(`Файл "${file.name}" успешно загружен`);
      onUploadComplete?.();
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("error");
      toast.error("Не удалось загрузить файл");

      // Reset after delay
      setTimeout(() => {
        setStatus("idle");
        setFileName("");
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        disabled={status === "uploading"}
      />
      <Button
        onClick={handleClick}
        disabled={status === "uploading"}
        size="lg"
        className={cn(
          "w-full gap-2 transition-all duration-200",
          status === "idle" && "bg-primary hover:bg-primary/90",
          status === "uploading" && "bg-primary/80",
          status === "success" && "bg-green-600 hover:bg-green-700",
          status === "error" && "bg-destructive hover:bg-destructive/90"
        )}
      >
        {status === "idle" && (
          <>
            <CloudUpload className="h-5 w-5" />
            Загрузить файл
          </>
        )}
        {status === "uploading" && (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Загрузка {progress}%
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 className="h-5 w-5" />
            Загружено!
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="h-5 w-5" />
            Ошибка
          </>
        )}
      </Button>

      {/* Progress bar */}
      {status === "uploading" && (
        <div className="mt-2">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center truncate">
            {fileName}
          </p>
        </div>
      )}
    </div>
  );
}
