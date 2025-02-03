'use client';

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Create a Context for authentication
export const AuthContext = createContext(null);

// Auth Provider to wrap the app
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from the API
    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            debugger
            const response = await fetch("/api/GetUser");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setUser(data.user || null); // Set user or null
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Fetch user when component mounts
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
