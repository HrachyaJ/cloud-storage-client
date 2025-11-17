"use client";

import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token cookie
    Cookies.remove("_token", { path: "/" });

    // Redirect to login
    router.push("/dashboard/auth");
  };

  return (
    <Button type="button" variant="destructive" onClick={handleLogout}>
      Выйти
    </Button>
  );
}
