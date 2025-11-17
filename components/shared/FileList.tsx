"use client";

import { FileItem } from "@/app/api/dto/files.dto";
import Selecto from "react-selecto";
import { cn } from "@/lib/utils";
import FileCard from "./FileCard";
import { useRef } from "react";

export type FileSelectType = "select" | "unselect";

interface FileListProps {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
}

export default function FileList({ items, onFileSelect }: FileListProps) {
  const filesContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="files relative" ref={filesContainerRef}>
      <div className="flex flex-row flex-wrap py-[30px] px-2.5">
        {items.map((item) => (
          <div
            data-id={item.id}
            key={item.id}
            className={cn(
              "file transition-all duration-300",
              "[&.active]:ring-2 [&.active]:ring-primary [&.active]:shadow-lg"
            )}
          >
            <FileCard
              filename={item.filename}
              originalName={item.originalName}
            />
          </div>
        ))}
      </div>

      <Selecto
        container={filesContainerRef.current as HTMLElement}
        selectableTargets={[".file"]}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("active");
            const id = el.dataset["id"];
            if (id) onFileSelect(Number(id), "select");
          });
          e.removed.forEach((el) => {
            el.classList.remove("active");
            const id = el.dataset["id"];
            if (id) onFileSelect(Number(id), "unselect");
          });
        }}
      />
    </div>
  );
}
