import axios from "axios";
import Cookies from "js-cookie";

// Reusable Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const authStorage = Cookies.get("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth token", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;