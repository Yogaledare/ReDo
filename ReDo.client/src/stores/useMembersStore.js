// src/stores/useMembersStore.js
import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore.js'; // import the auth store to use its states

const useMembersStore = create(set => ({
    members: [],
    member: null,

    fetchMembers: async () => {
        const { isAuthenticated } = useAuthStore.getState(); // access auth store state
        if (isAuthenticated) {
            try {
                const membersResponse = await axios.get('http://localhost:5002/members');
                set({ members: membersResponse.data });
                const memberResponse = await axios.get('http://localhost:5002/member');
                set({ member: memberResponse.data });
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        }
    }
}));

export default useMembersStore;
