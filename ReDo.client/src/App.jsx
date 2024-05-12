import React, {useEffect} from 'react';
import './App.css';
import useAuthStore from "./stores/useAuthStore.js";
import useMembersStore from "./stores/useMembersStore.js";
import HomePage from "./components/HomePage.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemsPage from "./components/ItemsPage.jsx";
import LoginPage from "./components/LoginPage.jsx";

function App() {
    const {isAuthenticated, login, logout} = useAuthStore();
    const {members, member, fetchMembers} = useMembersStore();

    useEffect(() => {
        fetchMembers();
    }, [isAuthenticated]);

    return (
        <>
            <Router>
            <NavbarComponent></NavbarComponent>
            {/*{isAuthenticated ? <LoggedInNavbar></LoggedInNavbar> : <LoggedOutNavbar></LoggedOutNavbar>}*/}
            
                <div className="container mt-5">
                    
                    <Routes>
                        
                        <Route path={"/"} element={<HomePage></HomePage>}></Route>
                        <Route path={"/items"} element={<ItemsPage></ItemsPage>}></Route>
                        <Route path={"/login"} element={<LoginPage></LoginPage>}></Route>
                        {/*<Route path={"/contact"} element={<Contact></Contact>}></Route>*/}
                        
                        
                    </Routes>
                    
                    
                </div>

            </Router>
        </>
    );
}

export default App;

