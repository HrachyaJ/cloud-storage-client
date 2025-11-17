"use client";

import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { getColorByExtension } from "@/lib/getColorByExtension";
import { isImage } from "@/lib/isImage";
import { getExtensionFromFileName } from "@/lib/getExtensionFromFileName";

interface FileCardProps {
  filename: string;
  originalName: string;
}

const extensionColors = {
  red: "bg-[#de2013]",
  green: "bg-[#60c87d]",
  blue: "bg-[#4f78e0]",
  orange: "bg-[#ffa007]",
  purple: "bg-[#9966e7]",
  gray: "bg-[#777]",
};

export default function FileCard({ originalName, filename }: FileCardProps) {
  const ext = getExtensionFromFileName(filename);
  const imageUrl =
    ext && isImage(ext) ? "http://localhost:7777/uploads/" + filename : "";
  const color = getColorByExtension(ext);
  const extensionColor =
    extensionColors[color as keyof typeof extensionColors] ||
    extensionColors.gray;

  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] w-[150px] h-[150px] cursor-pointer">
      {/* Icon/Image Container */}
      <div className="relative mb-2.5">
        {isImage(ext) ? (
          <>
            <img
              src={imageUrl}
              alt={originalName}
              className="w-20 h-20 object-cover rounded-[5px]"
            />
            {/* Extension Badge */}
            <i
              className={cn(
                "not-italic text-xs font-bold text-white absolute bottom-0 left-0 uppercase px-1.5 py-0.5 rounded-md",
                extensionColor
              )}
            >
              {ext}
            </i>
          </>
        ) : (
          <>
            <FileText
              className="mb-1.5 w-16 h-16 text-[#d2d3d8]"
              strokeWidth={1.5}
            />
            {/* Extension Badge */}
            <i
              className={cn(
                "not-italic text-xs font-bold text-white absolute bottom-0 left-0 uppercase px-1.5 py-0.5 rounded-md",
                extensionColor
              )}
            >
              {ext}
            </i>
          </>
        )}
      </div>

      {/* File Name */}
      <span className="break-all text-center text-sm px-2">{originalName}</span>
    </div>
  );
}
