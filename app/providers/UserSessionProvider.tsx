'use client';
import { createContext, useContext, useEffect, useState } from "react";

// Create a Context for authentication
const AuthContext = createContext(null);

// Auth Provider to wrap the app
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from the API
    async function fetchUser() {
        try {
            const response = await fetch("/api/GetUser");
            const data = await response.json();

            debugger
            if (data.user) {
                setUser(data.user); // Set authenticated user
            } else {
                setUser(null); // No user found (logged out)
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    // Fetch user when component mounts
    useEffect(() => {
        fetchUser();
    }, []);

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
