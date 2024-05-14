// src/api/loggedInApi.js
import createApiInstance from './baseApi';
import useAuthStore from "../stores/useAuthStore.js";


const loggedInApi = createApiInstance();

loggedInApi.interceptors.request.use(config => {
    const {token} = useAuthStore.getState();
    
    if (!token) {
        return Promise.reject({message: "Not logged in."});
    }
    
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default loggedInApi;