import {create} from 'zustand';
// import axios from 'axios';
import LoggedOutApi from "../api/loggedOutApi.js";

// const api = axios.create({
//     baseURL: 'http://localhost:5002/',
//     validateStatus: status => (status >= 200 && status < 300) || status === 401
// })

const useAuthStore = create((set, get) => ({
    token: null,
    // isAuthenticated: false,
    // user: null,
    error: '',

    login: async (email, password) => {
        set({error: ''});
        try {
            const response = await LoggedOutApi.post('login', {email, password});
            const {accessToken} = response.data;
            if (accessToken) {
                set({token: accessToken});
            }
        } catch (error) {
            const message = error.response?.data?.message || "Login failed. Please check your credentials.";
            set({token: null, loginError: message});
        }
    },

    logout: () => {
        set({token: null});
    }
}));

export default useAuthStore;






// delete axios.defaults.headers.common['Authorization'];
// set({token: null, isAuthenticated: false, loginError: ''});


//
// login: async (email, password) => {
//     set({error: ''});
//     try {
//         const response = await api.post('login', {email, password,});
//         if (response.status === 200) {
//             const {accessToken} = response.data;
//             axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//             set({token: accessToken, isAuthenticated: true, loginError: ''});
//         } else {
//             set({isAuthenticated: false, loginError: 'Invalid credentials, please try again.'});
//         }
//     } catch (error) {
//         console.error('Login error: ', error);
//         set({isAuthenticated: false, loginError: 'Network error or server is down.'});
//     }
// },
//
//     logout: () => {
//     delete axios.defaults.headers.common['Authorization'];
//     set({token: null, isAuthenticated: false, loginError: ''});
// }
// }));
//
