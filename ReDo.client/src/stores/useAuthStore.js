import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set, get) => ({
    token: null,
    isAuthenticated: false,
    user: null,

    login: async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5002/login', {
                email,
                password,
            });
            const { accessToken } = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            set({ token: accessToken, isAuthenticated: true });
        } catch (error) {
            console.error('Login error: ', error);
            set({isAuthenticated: false})
        }
    },
    
    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        set({token: null, isAuthenticated: false});
    }
}));

export default useAuthStore;