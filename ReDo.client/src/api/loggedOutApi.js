// src/api/loggedOutApi.js
import createApiInstance from './baseApi';
import useAuthStore from "../stores/useAuthStore.js";


const loggedOutApi = createApiInstance();

// Add an interceptor for adding the authorization token
loggedOutApi.interceptors.request.use(config => {
    const { token } = useAuthStore.getState();
    if (token) {
        return Promise.reject({ message: "Not logged in." });
    }
    return config;
});

export default loggedOutApi;