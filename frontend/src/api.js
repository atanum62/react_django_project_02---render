// ✅ Importing axios for making HTTP requests
import axios from "axios";

// ✅ Importing the access token constant (key for localStorage)
import { ACCESS_TOKEN } from "./constants";

// ✅ Creating an Axios instance with a base URL from environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Example: http://localhost:8000/api
});

// ✅ Adding a request interceptor to automatically attach JWT token
api.interceptors.request.use(
    (config) => {
        // 🔑 Get token from localStorage
        const token = localStorage.getItem(ACCESS_TOKEN);

        // 🔒 If token exists, add Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ✅ Return the updated config to proceed with the request
        return config;
    },
    (error) => {
        // ❌ Handle errors during request setup
        return Promise.reject(error);
    }
);

// ✅ Exporting the custom axios instance
export default api;
