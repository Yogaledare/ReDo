// src/api/baseApi.js
import axios from 'axios';

const createApiInstance = (config = {}) => {
    const api = axios.create({
        baseURL: 'http://localhost:5002/',
        ...config,
    });

    // Global response handling
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        error => {
            const status = error.response ? error.response.status : 0;
            switch (status) {
                case 401:
                    return Promise.reject({message: "You are not authorized.", details: error});
                case 404:
                    return Promise.reject({message: "Could not find URL.", details: error});
                case 500:
                    return Promise.reject({message: "Server error.", details: error});
                default:
                    return Promise.reject({message: "Network or server error", details: error});
            }
        }
    );

    return api;
};

export default createApiInstance;
