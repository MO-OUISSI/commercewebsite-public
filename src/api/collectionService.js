import { MOCK_COLLECTIONS } from '../data/mockData';

const collectionService = {
    /**
     * Fetch all active collections
     */
    getCollections: async () => {
        // Return local data immediately for higher performance
        return MOCK_COLLECTIONS;
    }
};

export default collectionService;
