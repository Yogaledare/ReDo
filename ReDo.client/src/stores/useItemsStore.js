import {create} from 'zustand';
import loggedInApi from "../api/loggedInApi.js";


const handleStoreError = (set, error, defaultErrorMessage) => {
    const errorMessage = error?.data?.message ?? defaultErrorMessage; 
    console.error(errorMessage); 
    set({error: errorMessage})
}


const useItemsStore = create(set => ({
    items: [],
    error: null,

    fetchItems: async () => {
        try {
            const response = await loggedInApi.get('items');
            set({items: response.data})
        } catch (error) {
            handleStoreError(set, error, 'Failed to fetch items.'); 
        }
    },

    toggleItemFinished: async (itemId) => {
        try {
            await loggedInApi.put(`items/toggle-finish/${itemId}`);
            set(state => ({
                items: state.items.map(item => ({
                    ...item,
                    isFinished: item?.reDoItemEntityId === itemId ? !item.isFinished : item.isFinished
                }))
            }));
        } catch (error) {
            handleStoreError(set, error, 'Failed to toggle item.');
        }
    },

    addItem: async (description) => {
        try {
            const newItem = await loggedInApi.post('items', {description: description});
            set(state => ({items: [...state.items, newItem.data]}));
        } catch (error) {
            handleStoreError(set, error, 'Failed to add new item.');
        }
    },

    removeItem: async (itemId) => {
        try {
            const response = await loggedInApi.delete(`items/${itemId}`);
            set((state) => ({
                items: state.items.filter(item => item.reDoItemEntityId !== itemId)
            }));
        } catch (error) {
            handleStoreError(set, error, 'Failed to remove item.');
        }
    },

    removeLastItem: async () => {
        try {
            const response = await loggedInApi.delete(`items/last`);
            set((state) => ({
                items: state.items.slice(0, -1)
            }));
        } catch (error) {
            handleStoreError(set, error, 'Failed to remove item.');
        }
    },
    
    removeAllItems: async () => {
        try {
            const response = await loggedInApi.delete(`items`);
            set((state) => ({
                items: []
            }));
        } catch (error) {
            handleStoreError(set, error, 'Failed to remove items.');
        }
    },


}));

export default useItemsStore;