import { LoginForm, RegisterForm } from "@/components/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Войти</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <div className="bg-white rounded-lg shadow-md p-6">
            <TabsContent value="login" className="mt-0">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register" className="mt-0">
              <RegisterForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
