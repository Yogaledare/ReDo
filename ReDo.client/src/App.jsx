import React, {useEffect} from 'react';
import './App.css';
import useAuthStore from "./stores/useAuthStore.js";
import useMembersStore from "./stores/useMembersStore.js";
import HomePage from "./components/HomePage.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ItemsPage from "./components/ItemsPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    const {token, login, logout} = useAuthStore();
    const {members, member, fetchMembers} = useMembersStore();

    useEffect(() => {
        fetchMembers();
    }, [token]);

    return (<>
            <Router>
                <NavbarComponent></NavbarComponent>
                {/*{isAuthenticated ? <LoggedInNavbar></LoggedInNavbar> : <LoggedOutNavbar></LoggedOutNavbar>}*/}

                <div className="container mt-5">

                    <Routes>
                        <Route path={"/"} element={<HomePage></HomePage>}></Route>
                        <Route path={"/items"} element={
                            <ProtectedRoute
                                condition={!!token}
                            >
                                <ItemsPage></ItemsPage>
                            </ProtectedRoute>
                        }>
                        </Route>
                        <Route path={"/login"} element={
                            <ProtectedRoute
                                condition={!token}
                            >
                                <LoginPage></LoginPage>
                            </ProtectedRoute>
                        }>
                        </Route>
                        {/*<Route path={"/login"} element={<LoginPage></LoginPage>}></Route>*/}

                        


                    </Routes>


                </div>

            </Router>
        </>);
}

export default App;

