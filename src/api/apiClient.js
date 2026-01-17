import axios from 'axios';

export const BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
