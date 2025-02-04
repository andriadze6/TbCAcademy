'use client';

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Create a Context for authentication
export const AuthContext = createContext(null);

// Auth Provider to wrap the app
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    return (
        <AuthContext.Provider value={{ user, setUser,}}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
