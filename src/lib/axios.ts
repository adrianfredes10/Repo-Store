import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true, // ⭐ obligatorio para que las cookies viajen
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor de respuesta: maneja 401 globalmente
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// El token expiró o no hay sesión
			// Limpiar el store de auth y redirigir a login
			useAuthStore.getState().clearUser();
			// No redirigir si ya estamos en login
			if (!window.location.pathname.startsWith("/login")) {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	},
);

// Interceptor de request: log en dev
if (import.meta.env.DEV) {
	api.interceptors.request.use((config) => {
		console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
		return config;
	});
}
