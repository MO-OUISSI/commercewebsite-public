import apiClient from './apiClient';

const orderService = {
    /**
     * Create a new order
     * @param {Object} orderData 
     */
    createOrder: async (orderData) => {
        try {
            const response = await apiClient.post('/orders', orderData);
            return response.data;
        } catch (error) {
            console.warn('Backend unavailable, simulating successful order');
            return {
                message: 'Order placed successfully (Demo Mode)',
                order: {
                    _id: 'demo-order-' + Date.now(),
                    ...orderData,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                }
            };
        }
    }
};

export default orderService;
