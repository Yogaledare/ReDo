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
            let customError = { ...error };

            switch (status) {
                case 400:
                    customError.message = "Bad Request.";
                    break;
                case 401:
                    customError.message = "You are not authorized.";
                    break;
                case 404:
                    customError.message = "Could not find URL.";
                    break;
                case 500:
                    customError.message = "Server error.";
                    break;
                default:
                    customError.message = "Network or server error.";
                    break;
            }
            return Promise.reject(customError);
        }
    );

    return api;
};

export default createApiInstance;
