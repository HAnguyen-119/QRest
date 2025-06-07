import React, { createContext, useContext, useState, ReactNode } from 'react';

type RefreshContextType = {
    isRefresh: boolean;
    setIsRefresh: (value: boolean) => void;
};

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    return (
        <RefreshContext.Provider value={{ isRefresh, setIsRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};

export const useRefresh = (): RefreshContextType => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error('useRefresh must be used within a RefreshProvider');
    }
    return context;
};
