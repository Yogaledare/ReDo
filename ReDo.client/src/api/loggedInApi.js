// src/api/loggedInApi.js
import createApiInstance from './baseApi';
import useAuthStore from "../stores/useAuthStore.js";


const loggedInApi = createApiInstance();

// Add an interceptor for adding the authorization token
loggedInApi.interceptors.request.use(config => {
    const { token } = useAuthStore.getState();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        return Promise.reject({ message: "Not logged in." });
    }
    return config;
});

export default loggedInApi;