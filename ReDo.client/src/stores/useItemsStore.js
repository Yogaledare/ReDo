import {create} from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore.js'; // import the auth store to use its states

const useItemsStore = create(set => ({
    items: [],
    loading: false,
    error: null,

    fetchItems: async () => {
        set({loading: true, error: null});
        const {isAuthenticated} = useAuthStore.getState(); // access auth store state
        if (!isAuthenticated) {
            set({error: "Not authenticated.", loading: false});
            return;
        }

        try {
            const response = await axios.get('http://localhost:5002/items');
            if (response.status === 200) {
                set({items: response.data, loading: false});
            } else {
                set({error: "Failed to fetch items.", loading: false});
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            set({error: error.message, loading: false});
        }
    },

    toggleItemFinished: async (itemId) => {
        set({loading: true});
        try {
            const response = await axios.put(`http://localhost:5002/items/toggle-finish/${itemId}`);
            if (response.status === 200) {
                set(state => ({
                    items: state.items.map(item =>
                        item.reDoItemEntityId === itemId ? {...item, isFinished: !item.isFinished} : item),
                    loading: false
                }));
            } else {
                set({error: "Failed to toggle item finished state.", loading: false});
            }
        } catch (error) {
            console.error('Error toggling item finished state:', error);
            set({error: error.message, loading: false});
        }
    }
}));

export default useItemsStore;