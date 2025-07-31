// ✅ Import necessary modules
import { Navigate } from "react-router-dom"; // Used for navigation if not authorized
import { jwtDecode } from "jwt-decode"; // Used to decode JWT token
import api from "../api"; // Axios instance
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"; // LocalStorage keys
import { useState, useEffect } from "react";

// ✅ ProtectedRoutes Component
// This component wraps around pages that should only be accessible to authenticated users
const ProtectedRoutes = ({ children }) => {

    // 🔑 State to check if user is authorized
    const [isAuthorized, setIsAuthorized] = useState(null);

    // ✅ useEffect runs once when component mounts to check authentication
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // Handle errors by marking unauthorized
    }, []);

    // 🔄 Function to refresh access token when expired
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken, // Send refresh token to get a new access token
            });

            if (res.status === 200) {
                // ✅ Store new access token and mark as authorized
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // 🔐 Main authentication check
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // ❌ If no access token found → Unauthorized
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        // 🔍 Decode the token to check expiry
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // Current time in seconds

        // ⏳ If token expired → Refresh token
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true); // ✅ Token still valid
        }
    };

    // ⏳ While checking authorization, show loading
    if (isAuthorized === null) {
        return <div>Loading ...</div>;
    }

    // ✅ If authorized → Show children (protected page)
    // ❌ If not → Redirect to login page
    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
