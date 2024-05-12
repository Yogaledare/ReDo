import React from 'react';
import useAuthStore from '../stores/useAuthStore';

const LogoutButtonComponent = () => {
    const logout = useAuthStore(state => state.logout);

    return (
        <button onClick={logout}>Logout</button>
    );
}

export default LogoutButtonComponent;