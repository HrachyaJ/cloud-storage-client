"use client";

import { useState, useCallback } from "react";
import { FileItem } from "@//app/api/dto/files.dto";
import FileList, { FileSelectType } from "@/components/shared/FileList";
import FileActions from "@/components/shared/FileActions";
import UploadButton from "@/components/shared/UploadButton";
import * as Api from "@/app/api";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { File, Folder, Image, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DashboardClientProps {
  initialFiles: FileItem[];
}

const menuItems = [
  {
    href: "/dashboard",
    label: "Все файлы",
    icon: Folder,
  },
  {
    href: "/dashboard/photos",
    label: "Фотографии",
    icon: Image,
  },
  {
    href: "/dashboard/documents",
    label: "Документы",
    icon: File,
  },
  {
    href: "/dashboard/trash",
    label: "Корзина",
    icon: Trash,
    variant: "destructive" as const,
  },
];

export default function DashboardClient({
  initialFiles,
}: DashboardClientProps) {
  const [files] = useState<FileItem[]>(initialFiles);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const isTrashPage = pathname === "/dashboard/trash";

  const handleFileSelect = useCallback((id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  }, []);

  const handleRemove = useCallback(async () => {
    try {
      await Api.files.remove(selectedIds);
      toast.success("Файлы перемещены в корзину");
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      toast.error("Не удалось удалить файлы");
      console.error("Remove error:", error);
    }
  }, [selectedIds, router]);

  const handleShare = () => {
    toast.info("Функция 'Поделиться' скоро будет доступна");
  };

  const handleUploadComplete = useCallback(() => {
    console.log("Upload complete, refreshing...");
    setSelectedIds([]);
    window.location.reload();
  }, []);

  return (
    <div className="grid grid-cols-[250px_1fr] gap-0">
      <div className="flex flex-col p-5 bg-card border-r border-border rounded-tl-lg rounded-bl-lg">
        <div className="mb-5">
          <UploadButton onUploadComplete={handleUploadComplete} />
        </div>

        <div className="border-t border-border mb-5" />

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : item.variant === "destructive"
                    ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col min-h-[600px] bg-card rounded-tr-lg rounded-br-lg">
        {!isTrashPage && (
          <FileActions
            isActive={selectedIds.length > 0}
            onClickRemove={handleRemove}
            onClickShare={handleShare}
          />
        )}

        {files.length > 0 ? (
          <FileList items={files} onFileSelect={handleFileSelect} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg mb-2">Нет файлов</p>
              <p className="text-sm">Загрузите свой первый файл</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
