import React from "react";
import { FileItem } from "@/app/api/dto/files.dto";
import * as Api from "@/app/api";

import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FileList, { FileSelectType } from "@/components/shared/FileList";
import { Copy, Trash2, MoreVertical, FileIcon } from "lucide-react";

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState<FileItem[]>(items || []);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = React.useState(false);

  const hasSelected = selectedIds.length > 0;
  const selectedCount = selectedIds.length;

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const onClickRemove = () => {
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
    setSelectedIds([]);
    setIsRemoveDialogOpen(false);
  };

  const onClickShare = () => {
    // You can replace alert with a toast later
    alert(`Sharing ${selectedCount} file(s)...`);
  };

  const onSelectAll = () => {
    if (selectedCount === files.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(files.map((f) => f.id));
    }
  };

  return (
    <>
      {/* Actions Bar - appears only when files exist and withActions is true */}
      {files.length > 0 && withActions && (
        <Card className="mb-4 border-none shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {hasSelected
                  ? `${selectedCount} selected`
                  : `${files.length} file(s)`}
              </span>

              {hasSelected ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setIsRemoveDialogOpen(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <Button variant="outline" size="sm" onClick={onClickShare}>
                    <Copy className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={onSelectAll}>
                  Select All
                </Button>
              )}
            </div>

            {/* Mobile more actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onSelectAll}>
                  {selectedCount === files.length
                    ? "Deselect All"
                    : "Select All"}
                </DropdownMenuItem>
                {hasSelected && (
                  <>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setIsRemoveDialogOpen(true)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onClickShare}>
                      <Copy className="w-4 h-4 mr-2" />
                      Share Selected
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      )}

      {/* File List or Empty State */}
      {files.length > 0 ? (
        <FileList items={files} onFileSelect={onFileSelect} />
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <FileIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No files yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Список файлов пуст
            </p>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} file(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected files will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClickRemove}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
