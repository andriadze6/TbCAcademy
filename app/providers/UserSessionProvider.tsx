'use client';

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { WishListType } from "@/Type/type";
import { supabase } from "../../utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    wishList: WishListType[];
    AddToWishList: (productID: string, colorID: string, productStockID?: string, amount?: number) => Promise<void>;
    DeleteItemFromWishList: (id: string, productStockID?: string, amount?: number) => Promise<void>;
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
    const router = useRouter();
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                console.log('INITIAL_SESSION');
                setUser(session?.user || null);
                ChangeWishListAmount(session?.user?.id);
            } else if (event === 'SIGNED_IN') {
                console.log("SIGNED_IN");
                localStorage.removeItem("wishList");
                setUser(session?.user || null);
                ChangeWishListAmount(session?.user?.id);
            } else if (event === 'SIGNED_OUT') {
                console.log('SIGNED_OUT');
                setUser(null);
                setWishList([]);
                localStorage.removeItem("wishList");
                router.replace("/");
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);
    const ChangeWishListAmount = useCallback(async (id?: string) => {
        try {
            console.log("Fetching wishlist...");
            if (id) {
                const { data, error } = await supabase
                    .from('WishList')
                    .select("*")
                    .eq('user_ID', id);

                if (error) throw error;

                setWishList(data || []);
            } else {
                const storedWishList = localStorage.getItem("wishList");
                if (storedWishList) {
                    setWishList(JSON.parse(storedWishList));
                }
            }
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            setWishList([]);
        }
    }, []);

    const AddToWishList = useCallback(async (productID: string, colorID: string, productStockID?: string, amount?: number) => {
        try {
            if (!productID || !colorID) return;

            if (user) {
                const response = await fetch("/api/AddToWishList", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_ID: user.id, product_ID: productID, color_ID: colorID, productStockID, amount }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add to wishlist");
                }
                let result = await response.json();
                const newWishList = [...wishList, { id: result.id, user_ID: "", product_ID: productID, color_ID: colorID, productStockID, amount }];
                setWishList(newWishList);
            } else {
                const newWishList = [...wishList, { id: "", user_ID: "", product_ID: productID, color_ID: colorID, productStockID, amount }];
                localStorage.setItem("wishList", JSON.stringify(newWishList));
                setWishList(newWishList);
            }
        } catch (err) {
            console.error("Error adding to wishlist:", err);
        }
    }, [user, wishList]);

    const DeleteItemFromWishList = useCallback(async (id: string, productStockID?: string, amount?: number) => {
        try {
            if (!id || !productStockID || !amount) return;
            debugger
            if (user) {
                const response = await fetch("/api/DeleteItemFromWishList", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ID: id }),
                });

                if (!response.ok) {
                    throw new Error("Failed to delete item from wishlist");
                }
                let result = await response.json(); // Assuming the response is JSON
                const newWishList = wishList.filter((item) => item.id !== id);
                setWishList(newWishList);
            } else {
                const newWishList = wishList.filter((item) => item.productStockID !== productStockID && amount !== item.amount);
                localStorage.setItem("wishList", JSON.stringify(newWishList));
                setWishList(newWishList);
            }
        } catch (err) {
            console.error("Error deleting item from wishlist:", err);
        }
    }, [user, wishList]);
    return (
        <AuthContext.Provider value={{ user, setUser, wishList, AddToWishList, DeleteItemFromWishList, loading }}>
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
