"use client";

import * as React from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

type ToastState = {
  toasts: (ToastProps & { id: string })[];
};

export function useToast() {
  const [state, setState] = React.useState<ToastState>({ toasts: [] });

  const toast = React.useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = 3000,
    }: ToastProps) => {
      const id = Math.random().toString(36).slice(2, 9);

      setState((prev) => ({
        toasts: [...prev.toasts, { id, title, description, variant, duration }],
      }));

      setTimeout(() => {
        setState((prev) => ({
          toasts: prev.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    },
    []
  );

  return { toast, toasts: state.toasts };
}
