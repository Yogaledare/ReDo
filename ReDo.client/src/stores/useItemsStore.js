import {create} from 'zustand';
import loggedInApi from "../api/loggedInApi.js";

const handleStoreError = (set, error) => {
    // let errorMessage = defaultErrorMessage;
    let errorMessage = '';
    let validationErrors = {};

    if (error.response?.data?.errors) {
        validationErrors = error.response.data.errors;
        errorMessage = error.response.data.detail;
    } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
    } else if (error.message) {
        errorMessage = error.message;
    }

    console.error(errorMessage);
    set({error: errorMessage, validationErrors});
};

const createAsyncAction = (set, action) => {
    return async (...args) => {
        set({error: '', validationErrors: {}});
        try {
            await action(...args);
        } catch (error) {
            handleStoreError(set, error);
        }
    };
};

const useItemsStore = create(set => ({
    items: [],
    error: null,
    validationErrors: {},

    fetchItems: createAsyncAction(set, async () => {
        const response = await loggedInApi.get('items');
        set({items: response.data});
    }),

    toggleItemFinished: createAsyncAction(set, async (itemId) => {
        await loggedInApi.put(`items/toggle-finish/${itemId}`);
        set(state => ({
            items: state.items.map(item => ({
                ...item,
                isFinished: item?.reDoItemEntityId === itemId ? !item.isFinished : item.isFinished
            }))
        }));
    }),

    addItem: createAsyncAction(set, async (description) => {
        const newItem = await loggedInApi.post('items', {description});
        set(state => ({items: [...state.items, newItem.data]}));
    }),

    removeItem: createAsyncAction(set, async (itemId) => {
        await loggedInApi.delete(`items/${itemId}`);
        set(state => ({
            items: state.items.filter(item => item?.reDoItemEntityId !== itemId)
        }));
    }),

    removeLastItem: createAsyncAction(set, async () => {
        await loggedInApi.delete(`items/last`);
        set(state => ({
            items: state.items.slice(0, -1)
        }));
    }),

    removeAllItems: createAsyncAction(set, async () => {
        await loggedInApi.delete('items');
        set({items: []});
    }),
}));

export default useItemsStore;