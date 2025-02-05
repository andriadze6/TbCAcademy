'use client';

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "../../utils/supabase/client";


// Create a Context for authentication
export const AuthContext = createContext(null);

// Auth Provider to wrap the app
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            const supabase = await createClient();
            const { data: user, error: error1 } = await supabase.auth.getSession()
            if(user.session){
                setUser(user.session.user);
            }
            else{
                setUser(null);
            }
        };
        fetchUser();
    },[]);
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
