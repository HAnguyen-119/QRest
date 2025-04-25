import { TextContextProps } from '@/constants/Types/context'
import React, { createContext, useContext, ReactNode } from 'react'

const TextContext = createContext<TextContextProps | undefined>(undefined)

export const TextProvider = ({ children }: { children: ReactNode }) => {
    const fontFamily = 'Josefin-Sans'

    return (
        <TextContext.Provider value={{ fontFamily }}>
            {children}
        </TextContext.Provider>
    )
}

export const useTextContext = () => {
    const context = useContext(TextContext)

    if (!context) {
        throw new Error('useTextContext must be used within a TextProvider')
    }

    return context
}