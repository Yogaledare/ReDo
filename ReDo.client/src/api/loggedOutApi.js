// src/api/loggedOutApi.js
import createApiInstance from './baseApi';
import useAuthStore from "../stores/useAuthStore.js";


const loggedOutApi = createApiInstance();

loggedOutApi.interceptors.request.use(config => {
    const { token } = useAuthStore.getState();
    
    if (token) {
        return Promise.reject({ message: "Already logged in." });
    }
    
    return config;
});

export default loggedOutApi;