import { ThemeContextProps } from "@/constants/types";
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(false)

    const toggle = () => {
        setIsDark((prev) => !prev)
    }


    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
}