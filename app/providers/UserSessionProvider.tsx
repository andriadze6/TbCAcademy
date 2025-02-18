'use client';

import { createContext, use, useContext, useEffect, useState, useCallback } from "react";
import { WishListType } from "@/Type/type";
import { supabase } from "../../utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    wishList: WishListType[];
    AddToWishList: (productID: string, colorID: string, productStockID?: string, amount?: number) => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [wishList, setWishList] = useState<WishListType[]>([]);
    const [loading, setLoading] = useState(true);

    ///Subscription When user action
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                console.log('INITIAL_SESSION');
                setUser(session?.user || null);
            } else 
            if (event === 'SIGNED_IN') {
                console.log("SIGNED_IN");
                setUser(session?.user || null);
            } else if (event === 'SIGNED_OUT') {
                console.log('SIGNED_OUT');
                setUser(null);
            } else if (event === 'PASSWORD_RECOVERY') {
                console.log('PASSWORD_RECOVERY');
            } else if (event === 'TOKEN_REFRESHED') {
                console.log('TOKEN_REFRESHED');
            } else if (event === 'USER_UPDATED') {
                console.log('USER_UPDATED');
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    useEffect(() => {
      if (!user) {
        ChangeWishListAmount();
      }else{
        ChangeWishListAmount();
        const WishList = supabase.channel('custom-filter-channel')
        .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'WishList', filter: `user_ID=eq.${user.id}` },
        (payload) => {
            console.log('Change received!', payload)
            ChangeWishListAmount()
        })
        .subscribe()

        return () => {
          supabase.removeChannel(WishList); // Correct way to unsubscribe
        };
      }

    }, [user]);


    const ChangeWishListAmount = useCallback(async () => {
      try {
        if(user?.id){
          const { data, error } = await supabase
              .from('WishList')
              .select("*")
              .eq('user_ID', user.id);

          if (error) throw error;

          setWishList(data || []);

      }
      else{
            const storedWishList = localStorage.getItem("wishList");
            if (storedWishList) {
              setWishList(JSON.parse(storedWishList));
            }
      }
    } catch (err) {
    console.error("Error fetching wishlist:", err);
    setWishList([]);
    }

  },[user]);


  const AddToWishList = useCallback(async (productID:string, colorID:string, productStockID?:string, amount?:number) => {
    try {
        if(productID.length > 0 || colorID.length > 0){
            if(user){
                const response =  fetch("/api/AddToWishList", {
                    method: "POST",
                    body: JSON.stringify({user_ID:user.id, product_ID: productID, color_ID: colorID, productStockID:productStockID, amount:amount }),
                })
                if (!response) {
                    throw new Error("Failed to add to wishlist");
                }
            }
            else{
              localStorage.setItem("wishList", JSON.stringify([...wishList, { product_ID: productID, color_ID: colorID, productStockID:productStockID, amount:amount }]));
              setWishList([...wishList, {id:"",user_ID:"", product_ID: productID, color_ID: colorID, productStockID:productStockID, amount:amount }]);
            }
        }
    } catch (err) {
    console.error("Error adding to wishlist:", err);
    }
  },[user,wishList]);

    return (
        <AuthContext.Provider value={{ user, setUser, wishList, AddToWishList,loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
