"use client";

import axios from "@/core/axios";

export const apiClient = {
  get: async <T = any>(url: string, config?: any) => {
    const response = await axios.get<T>(url, config);
    return response.data;
  },

  post: async <T = any>(url: string, data?: any, config?: any) => {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  },

  put: async <T = any>(url: string, data?: any, config?: any) => {
    const response = await axios.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T = any>(url: string, config?: any) => {
    const response = await axios.delete<T>(url, config);
    return response.data;
  },

  patch: async <T = any>(url: string, data?: any, config?: any) => {
    const response = await axios.patch<T>(url, data, config);
    return response.data;
  },
};
