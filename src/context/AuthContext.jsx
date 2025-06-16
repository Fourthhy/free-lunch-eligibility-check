import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Install this: npm install jwt-decode

// Helper function to get admin data from token (if needed, or fetch from /me)
const getAdminFromToken = (token) => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token); // Contains 'id' and expiry (iat, exp)
        // For now, we'll just store the token. 
        // We could fetch full admin details using the token from a /me endpoint
        // or store them separately at login.
        // Let's assume for now that login process will provide admin details.
        return { id: decoded.id }; // Basic info from token
    } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem('adminAuthToken'); // Clear invalid token
        return null;
    }
};


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null); // Stores admin object { _id, name, email }
    const [token, setToken] = useState(localStorage.getItem('adminAuthToken'));
    const [isLoading, setIsLoading] = useState(true); // For initial auth check

    useEffect(() => {
        const storedToken = localStorage.getItem('adminAuthToken');
        const storedAdminDetails = localStorage.getItem('adminDetails'); // We'll store this at login

        if (storedToken && storedAdminDetails) {
            try {
                setAdmin(JSON.parse(storedAdminDetails));
                setToken(storedToken);
                // Optionally, verify token expiry here or make a /me call to ensure session is still valid
                // For simplicity now, we assume if token and details are there, user is "logged in"
            } catch (e) {
                console.error("Error parsing adminDetails from localStorage", e);
                localStorage.removeItem('adminAuthToken');
                localStorage.removeItem('adminDetails');
                setAdmin(null);
                setToken(null);
            }
        }
        setIsLoading(false); // Finished initial check
    }, []);

    const login = (adminData, authToken) => {
        localStorage.setItem('adminAuthToken', authToken);
        localStorage.setItem('adminDetails', JSON.stringify(adminData)); // Store admin details
        setAdmin(adminData);
        setToken(authToken);
    };

    const logout = () => {
        localStorage.removeItem('adminAuthToken');
        localStorage.removeItem('adminDetails');
        setAdmin(null);
        setToken(null);
        // Navigation to /admin_login will be handled by the component calling logout
    };

    // We could add a function here to fetch admin profile if only token is available
    // const fetchAdminProfile = async () => { ... using token to call /api/v1/auth/me ... }

    return (
        <AuthContext.Provider value={{ admin, token, login, logout, isAuthenticated: !!token, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};