import { useState } from "react";

export const useTheme = () => {
    const [isDark, setIsDark] = useState(false)

    const toggle = () => {
        setIsDark(!isDark)
    }

    return { isDark, toggle }
}