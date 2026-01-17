import { PRODUCTS } from '../data/products';

const productService = {
    /**
     * Fetch products with optional filtering
     * @param {Object} params { category, search }
     */
    getAllProducts: async (params = {}) => {
        // Return local data immediately for high performance
        let filtered = [...PRODUCTS];

        if (params.category && params.category !== 'all') {
            filtered = filtered.filter(p => p.category === params.category);
        }

        if (params.search) {
            const q = params.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
        }

        // Return structure matching expected response
        return {
            products: filtered,
            count: filtered.length,
            pages: 1
        };
    },

    /**
     * Fetch a single product by ID
     * @param {string} id 
     */
    getProductById: async (id) => {
        const product = PRODUCTS.find(p => (p.id === id || p._id === id));
        if (product) {
            return { success: true, data: { product } };
        }
        throw new Error('Product not found');
    }
};

export default productService;
