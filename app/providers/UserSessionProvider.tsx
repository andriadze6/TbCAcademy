'use client';

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../../utils/supabase/client";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [wishList, setWishList] = useState(0);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false); // Prevents multiple API calls
    const isMounted = useRef(true); // Tracks component mount status

    useEffect(() => {
        const {data: { subscription }} = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                console.log('INITIAL_SESSION')
                setUser(session?.user || null)
            } else if (event === 'SIGNED_IN') {
                debugger
                console.log("SIGNED_IN")
                setUser(session?.user)
            } else if (event === 'SIGNED_OUT') {
                debugger
                console.log('SIGNED_OUT')
                setUser(null)
            }
            else if (event === 'PASSWORD_RECOVERY') {
              // handle password recovery event
            } else if (event === 'TOKEN_REFRESHED') {
              // handle token refreshed event
            } else if (event === 'USER_UPDATED') {
              // handle user updated event
            }
          })
        return () => {
          subscription.unsubscribe()
        }
      }, [])
      useEffect(()=>{
        async function ChangeWishListAmount(){

            let { data: result, error } = await supabase
                .from('WishList')
                .select("id")
                // Filters
                .eq('user_ID',user.id)
                setWishList(result.length)
         }
        if(user){
            console.log("useEffect ChangeWishListAmount()")
            ChangeWishListAmount()
        }else{
            console.log("useEffect setWishList(0)")
            setWishList(0)
        }
      },[user])
    return (
        <AuthContext.Provider value={{ user, setUser, wishList, setWishList, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
