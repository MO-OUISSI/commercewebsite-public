import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_STORE_INFO } from '../data/mockData';

const StoreContext = createContext();

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export const StoreProvider = ({ children }) => {
    const [storeInfo] = useState(MOCK_STORE_INFO);
    const [loading] = useState(false);

    useEffect(() => {
        // Update Title
        document.title = storeInfo?.title || 'Store Shop';

        // Update Favicon
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';

        if (storeInfo?.logo) {
            link.href = storeInfo.logo;
            if (!document.querySelector("link[rel*='icon']")) {
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        } else {
            // If logo not available, remove the icon link if it exists
            const existingIcon = document.querySelector("link[rel*='icon']");
            if (existingIcon) {
                existingIcon.parentNode.removeChild(existingIcon);
            }
        }
    }, [storeInfo]);

    return (
        <StoreContext.Provider value={{ storeInfo, loading }}>
            {children}
        </StoreContext.Provider>
    );
};
