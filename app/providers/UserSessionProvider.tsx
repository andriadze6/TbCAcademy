'use client';

import { createContext, useContext, useEffect, useState, useCallback, use } from "react";
import { ItemListType } from "@/Type/type";
import { supabase } from "../../utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { set } from "@auth0/nextjs-auth0/dist/session";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    wishList: ItemListType[];
    cart: ItemListType[];
    AddToWishList: (productID: string, colorID: string, productStockID?: string, amount?: number) => Promise<void>;
    AddToCart: (productID: string, colorID: string, productStockID?: string, amount?: number) => Promise<void>;
    DeleteItemFromWishList: (id: string, productStockID?: string) => Promise<void>;
    DeleteItemFromCart: (id: string, productStockID?: string) => Promise<void>;
    loading: boolean;
}

interface UserSavedItemsType {
    wishList: ItemListType[],
    cart: ItemListType[]
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [saveItems, setSavedItems] = useState<UserSavedItemsType>({ wishList: [], cart: [] });
    const [cart, setCart] = useState<ItemListType[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                console.log('INITIAL_SESSION');
                setUser(session?.user || null);
                GetSavedItems(session?.user?.id);
            } else if (event === 'SIGNED_IN') {
                console.log("SIGNED_IN");
                localStorage.removeItem("wishList");
                setUser(session?.user || null);
                GetSavedItems(session?.user?.id);
            } else if (event === 'SIGNED_OUT') {
                console.log('SIGNED_OUT');
                setUser(null);
                setSavedItems({ wishList: [], cart: [] });
                localStorage.removeItem("wishList");
                router.replace("/");
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const GetSavedItems = useCallback(async (id?: string) => {
        try {
            console.log("Fetching wishlist...");
            if (id) {
                const [wishListData, CartData] = await  Promise.all([
                    supabase
                        .from('WishList')
                        .select("*")
                        .eq('user_ID', id),
                    supabase
                        .from('Cart')
                        .select("*")
                        .eq('user_ID', id),
                ])
                if (wishListData.error) throw wishListData.error;
                if (CartData.error) throw CartData.error;
                setSavedItems({ wishList: wishListData.data || [], cart: CartData.data || [] });
            } else {
                const storedWishList = localStorage.getItem("wishList");
                const storedCart = localStorage.getItem("cart");
                if (storedWishList) {
                    setSavedItems((pre)=>{
                        return {cart:storedCart&& JSON.parse(storedCart), wishList: storedWishList&& JSON.parse(storedWishList)}
                    })
                }
            }
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            setSavedItems({ wishList: [], cart: [] });
        }
    }, []);

    const AddToWishList = useCallback(async (productID: string, colorID: string, productStockID?: string, amount?: number) => {
        try {
            let checkItemExist = saveItems.wishList.find((item) => item.product_ID === productID && item.color_ID === colorID && item.productStockID === productStockID);
            if (!checkItemExist) {
                if (!productID || !colorID || !productStockID) return;
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
                    var newWishList = [...saveItems.wishList, { id: result.id, user_ID: user.id, product_ID: productID, color_ID: colorID, productStockID, amount }];
                } else {
                    newWishList = [...saveItems.wishList, { id: "", user_ID: "", product_ID: productID, color_ID: colorID, productStockID, amount }];
                    localStorage.setItem("wishList", JSON.stringify(newWishList));
                }
                setSavedItems((pre) => ({ ...pre, wishList: newWishList }));
            }

        } catch (err) {
            console.error("Error adding to wishlist:", err);
        }
    }, [user, saveItems.wishList]);

    const AddToCart = useCallback(async (productID: string, colorID: string, productStockID?: string, amount?: number) => {
        try {
            let checkItemExist = saveItems.cart.find((item) => item.product_ID === productID && item.color_ID === colorID && item.productStockID === productStockID);
            if (!checkItemExist) {
                if (!productID || !colorID || !productStockID) return;
                if (user) {
                    const response = await fetch("/api/AddToCart", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ user_ID: user.id, product_ID: productID, color_ID: colorID, productStockID, amount }),
                    });
                    if (!response.ok) {
                        throw new Error("Failed to add to wishlist");
                    }
                    let result = await response.json();
                    var newCart = [...saveItems.cart, { id: result.id, user_ID: user.id, product_ID: productID, color_ID: colorID, productStockID, amount }];
                } else {
                    newCart = [...saveItems.cart, { id: "", user_ID: "", product_ID: productID, color_ID: colorID, productStockID, amount }];
                    localStorage.setItem("wishList", JSON.stringify(newCart));
                }
                setSavedItems((pre) => ({ ...pre, cart: newCart }));

            }
        } catch (err) {
            console.error("Error adding to wishlist:", err);
        }
    }, [user, saveItems.cart]);

    const DeleteItemFromWishList = useCallback(async (id: string, productStockID?: string,) => {
        try {
            if (!id || !productStockID) return;
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
                var newWishList = saveItems.wishList.filter((item) => item.id !== id);
                setSavedItems((pre) => ({ ...pre, wishList: newWishList }));
            } else {
                newWishList = saveItems.wishList.filter((item) => item.productStockID !== productStockID);
                localStorage.setItem("wishList", JSON.stringify(newWishList));
            }
            setSavedItems((pre) => ({ ...pre, wishList: newWishList }));
        } catch (err) {
            console.error("Error deleting item from wishlist:", err);
        }
    }, [user, saveItems.wishList]);

    const DeleteItemFromCart = useCallback(async (id: string, productStockID?: string) => {
        try {
            if (!id || !productStockID) return;
            debugger
            if (user) {
                const response = await fetch("/api/DeleteItemFromCart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ID: id }),
                });

                if (!response.ok) {
                    throw new Error("Failed to delete item from wishlist");
                }
                var newCart = saveItems.cart.filter((item) => item.id !== id);
                setSavedItems((pre) => ({ ...pre, cart: newCart }));
            } else {
                newCart = saveItems.cart.filter((item) => item.productStockID !== productStockID);
                localStorage.setItem("wishList", JSON.stringify(newCart));
            }
            setSavedItems((pre) => ({ ...pre, cart: newCart }));
        } catch (err) {
            console.error("Error deleting item from wishlist:", err);
        }
    }, [user, saveItems.cart]);

    return (
        <AuthContext.Provider value={{ user, setUser,wishList: saveItems.wishList, cart:saveItems.cart, AddToWishList, AddToCart,DeleteItemFromWishList, DeleteItemFromCart, loading }}>
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
