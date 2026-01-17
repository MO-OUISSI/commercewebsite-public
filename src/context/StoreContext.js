import React, { createContext, useContext, useState, useEffect } from 'react';
import storeService from '../api/storeService';
import { BASE_URL } from '../api/apiClient';
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

    return (
        <StoreContext.Provider value={{ storeInfo, loading }}>
            {children}
        </StoreContext.Provider>
    );
};
