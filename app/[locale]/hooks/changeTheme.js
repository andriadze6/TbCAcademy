'use client';
import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(null); // Start with null since theme is not determined on the server

    useEffect(() => {
        // Run only on the client
        const savedTheme = localStorage.getItem('theme');
        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(savedTheme || preferredTheme);

        // Add initial theme to the body class
        const bodyClass = document.body.classList;
        bodyClass.remove("light", "dark");
        bodyClass.add(savedTheme || preferredTheme);
    }, []);

    useEffect(() => {
        if (theme) {
            // Update the body class whenever the theme changes
            const bodyClass = document.body.classList;
            bodyClass.remove("light", "dark");
            bodyClass.add(theme);
        }
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
