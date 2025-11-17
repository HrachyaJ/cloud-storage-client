import { Metadata } from "next";
import { Toaster } from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Облачное Хранилище",
  description: "Приложение облачного хранилища",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased bg-gray-100">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
