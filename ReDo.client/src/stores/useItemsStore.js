import {create} from 'zustand';
import loggedInApi from "../api/loggedInApi.js";


const useItemsStore = create(set => ({
    items: [],
    error: null,
    
    fetchItems: async () => {
        try {
            console.log("inside get")
            const response = await loggedInApi.get('items');
            console.log("after get")
            set({items: response.data})
        } catch (error) {
            console.error('Error fetching items:', error.message || 'Failed to fetch items.');
            set({ error: error.message || 'Failed to fetch items.' });
        }
    },
    
    toggleItemFinished: async (itemId) => {
        try {
            await loggedInApi.put(`items/toggle-finish/${itemId}`);
            set((state) => ({
                items: state.items.map(item =>
                    item.reDoItemEntityId === itemId ? { ...item, isFinished: !item.isFinished } : item)
            }));
        } catch (error) {
            console.error('Error toggling item finished state:', error.message || 'Failed to toggle item.');
            set({ error: error.message || 'Failed to toggle item finished state.' });
        }
    }, 
    
    addItem: async (description) => {
        try {
            const newItem = await loggedInApi.post('items', { description: description });
            set(state => ({ items: [...state.items, newItem.data] }));
        } catch (error) {
            console.error('Error adding new item:', error.data.message || 'Failed to add new item.');
            set({ error: error.data.message || 'Failed to add new item.' });
        }
    }
    
    
}));

export default useItemsStore;