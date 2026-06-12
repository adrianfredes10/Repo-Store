import axios, { AxiosError } from "axios";
import { useAuthStore } from "../modules/auth/stores/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// el backend responde RFC 7807 (problem+json) y conserva `detail`;
// acá se traduce a un Error con mensaje legible para los catch de la app
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ detail?: string | { msg: string }[]; title?: string }>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
    }
    const data = error.response?.data;
    const detail = data?.detail;
    let message: string;
    if (Array.isArray(detail)) {
      message = detail.map((d) => d.msg).join(", ");
    } else {
      message = detail ?? data?.title ?? error.message ?? "Error desconocido";
    }
    return Promise.reject(new Error(message));
  }
);
