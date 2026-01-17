import { MOCK_STORE_INFO } from '../data/mockData';

const storeService = {
    getStoreInfo: async () => {
        // Return local data immediately for higher performance
        return { success: true, data: MOCK_STORE_INFO };
    }
};

export default storeService;
