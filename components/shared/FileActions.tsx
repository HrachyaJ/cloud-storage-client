"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";
import { Share2, Trash2 } from "lucide-react";

interface FileActionsProps {
  onClickRemove: () => void;
  onClickShare: () => void;
  isActive: boolean;
}

export default function FileActions({
  onClickRemove,
  onClickShare,
  isActive,
}: FileActionsProps) {
  return (
    <div className="pt-[25px] px-[25px] pb-0">
      <Button
        onClick={onClickShare}
        disabled={!isActive}
        variant="secondary"
        className="mr-2.5"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Поделиться
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={!isActive} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Удалить
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить файл(ы)?</AlertDialogTitle>
            <AlertDialogDescription>
              Все файлы будут перемещены в корзину. Это действие можно отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClickRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Да, переместить в корзину
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
