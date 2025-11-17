"use client";

import { useState } from "react";
import { Button, Input, Label } from "../../ui";
import { LoginFormDTO } from "@/app/api/dto/auth.dto";
import * as Api from "@/app/api";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function LoginForm() {
  // --- FIX: Added state for form data ---
  const [formData, setFormData] = useState<LoginFormDTO>({
    email: "",
    password: "",
  });

  // --- FIX: Added state for errors ---
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // --- FIX: Added change handler for inputs ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement & {
      name: "email" | "password";
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

  // --- FIX: Re-structured the submit handler ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop the page from reloading

    // Validation
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Укажите почту";
    }
    if (!formData.password) {
      newErrors.password = "Укажите пароль";
    }

    setErrors(newErrors);

    // If no errors, proceed with API call
    if (!newErrors.email && !newErrors.password) {
      try {
        const { token } = await Api.auth.login(formData);

        toast.success("Успешный вход в систему");

        Cookies.set("_token", token, { path: "/" });

        location.href = "/dashboard";
      } catch (error) {
        toast.error("Ошибка входа в систему");
      }
    }
  };

  // --- FIX: Moved the return statement outside of the function ---
  return (
    // --- FIX: Linked the form to the correct handleSubmit ---
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
        <Label htmlFor="password" className="text-sm font-medium">
          Пароль
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <div className="pt-2">
        {/* --- FIX: Added type="submit" to the button --- */}
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </div>
    </form>
  );
}
