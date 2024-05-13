import {create} from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore.js'; // import the auth store to use its states

const useItemsStore = create(set => ({
    items: [],
    loading: false,
    error: null, 


    fetchItems: async () => {
        set({ loading: true, error: null });
        console.log(1);
        const {isAuthenticated} = useAuthStore.getState(); // access auth store state
        if (isAuthenticated) {
            console.log(2);
            try {
                const response = await axios.get('http://localhost:5002/items');
                set({ items: response.data, loading: false });
                console.log(`3. response.data: ${response.data}`);
            } catch (error) {
                console.error('Error fetching items:', error);
                set({ error: error.message, loading: false });
                console.log(4);
            }
        }
    }
}));

export default useItemsStore;
