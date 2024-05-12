import React, {useEffect} from 'react';
import './App.css';
import useAuthStore from "./stores/useAuthStore.js";
import useMembersStore from "./stores/useMembersStore.js";
import LogoutButtonComponent from "./components/LogoutButtonComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";

function App() {
    const {isAuthenticated, login, logout} = useAuthStore();
    const {members, member, fetchMembers} = useMembersStore();

    // useEffect(() => {
    //     const performFetch = async () => {
    //         await fetchMembers();
    //     }
    //     performFetch();
    // }, [isAuthenticated]);

    useEffect(() => {
        fetchMembers();
    }, [isAuthenticated]);


    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                {!isAuthenticated ? (
                    <LoginComponent/>
                ) : (
                    <>
                        <LogoutButtonComponent/>
                        <p>Members: {JSON.stringify(members)}</p>
                        <p>Member: {JSON.stringify(member)}</p>
                    </>
                )}
            </div>
        </>
    );
}

export default App;
