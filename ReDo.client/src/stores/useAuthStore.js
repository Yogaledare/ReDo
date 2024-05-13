import {create} from 'zustand';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5002/',
    validateStatus: status => (status >= 200 && status < 300) || status === 401
})

const useAuthStore = create((set, get) => ({
    token: null,
    isAuthenticated: false,
    // user: null,
    loginError: '',

    login: async (email, password) => {
        try {
            const response = await api.post('login', {email, password,});
            if (response.status === 200) {
                const {accessToken} = response.data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                set({token: accessToken, isAuthenticated: true, loginError: ''});
            } else {
                set({isAuthenticated: false, loginError: 'Invalid credentials, please try again.'});
            }
        } catch (error) {
            console.error('Login error: ', error);
            set({isAuthenticated: false, loginError: 'Network error or server is down.'});
        }
    },

    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        set({token: null, isAuthenticated: false, loginError: ''});
    }
}));

export default useAuthStore;