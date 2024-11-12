'use client'
import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        debugger
        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("theme") ||
                (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            );
        }
        return "dark"; // Default theme for SSR
    });


    useEffect(() => {
        debugger
        //using when page is reloaded
        const html = document.documentElement;
        html.className = ""
        html.classList.add(theme);
    }, [theme]);

    const changeTheme = () => {
        try {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            setTheme(newTheme);
        } catch (error) {
            console.error('Error toggling theme:', error);
            // Fallback to light theme in case of error
            localStorage.setItem('theme', "light");
            setTheme("light");
        }
    };

    return { theme, changeTheme };
};

export default useTheme;
