"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RegisterFormDTO } from "@/app/api/dto/auth.dto";
import { toast } from "sonner";
import { Button, Input, Label } from "@/components/ui";
import Cookies from "js-cookie";
import * as Api from "@/app/api";

export default function RegisterForm() {
  // 1. State for form data
  const [formData, setFormData] = useState<RegisterFormDTO>({
    email: "",
    fullName: "",
    password: "",
  });

  // 2. State for errors
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  // 3. State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // 4. Input Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement & {
      name: "email" | "fullName" | "password";
    };
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 5. Submit Handler (Handles validation and API call)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop page reload

    // Validation logic
    const newErrors = {
      email: "",
      fullName: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Укажите почту";
    }
    if (!formData.fullName) {
      newErrors.fullName = "Укажите полное имя";
    }
    if (!formData.password) {
      newErrors.password = "Укажите пароль";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.fullName && !newErrors.password) {
      try {
        const { token } = await Api.auth.register(formData);

        toast.success("Успешная регистрация");

        Cookies.set("_token", token, { path: "/" });

        location.href = "/dashboard";
      } catch (error) {
        toast.error("Ошибка регистрации. Попробуйте другую почту.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          E-Mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Полное имя
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? "border-red-500" : ""}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Пароль
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500 pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <div className="pt-5">
        <Button type="submit" className="w-full">
          Регистрация
        </Button>
      </div>
    </form>
  );
}
