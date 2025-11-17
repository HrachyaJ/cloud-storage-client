"use client";

import { Cloud, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  email: string;
  fullName: string;
}

const menuItems = [
  { href: "/dashboard", label: "Главная" },
  { href: "/dashboard/profile", label: "Профиль" },
];

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    Cookies.remove("_token", { path: "/" });
    router.push("/dashboard/auth");
  };

  // Get first letter of name for avatar
  const avatarLetter = user?.fullName?.charAt(0).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0071ce]">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 font-medium text-white hover:opacity-90 transition-opacity"
            >
              <Cloud className="h-6 w-6" />
              <h2
                className="text-xl font-medium text-white"
                style={{ fontFamily: '"Segoe UI", sans-serif' }}
              >
                Cloud Storage
              </h2>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-5 py-2 text-sm font-medium transition-all rounded-lg",
                    pathname === item.href
                      ? "text-white bg-white/15"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <div className="h-10 w-10 rounded-full bg-white/20 text-white flex items-center justify-center text-base font-semibold border-2 border-white/30">
                    {avatarLetter}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-base font-semibold">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Профиль
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  <LogOut className="mr-2 h-4 w-4 text-destructive" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Выйти из аккаунта?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы будете перенаправлены на страницу входа.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Выйти
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
