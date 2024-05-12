import React, {useEffect} from 'react';
import './App.css';
import useAuthStore from "./stores/useAuthStore.js";
import useMembersStore from "./stores/useMembersStore.js";
import LogoutButtonComponent from "./components/LogoutButtonComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";

function App() {
    const {isAuthenticated, login, logout} = useAuthStore();
    const {members, member, fetchMembers} = useMembersStore();

    useEffect(() => {
        fetchMembers();
    }, [isAuthenticated]);

    return (
        <>
            <div className="container mt-5 ">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">


                        <h1 className="mb-5">ReDo</h1>
                    </div>
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
            </div>
        </>
    );
}

export default App;
