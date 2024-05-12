import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const LoggedInMenu = () => {
    const { logout } = useAuthStore();
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/items">Todo Items</Link>
            </li>
            <li className="nav-item">
                <button className="btn btn-link nav-link" style={{ textDecoration: 'none' }} onClick={logout}>Logout</button>
            </li>
        </>
    );
};

const LoggedOutMenu = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </>
    );
};

const NavbarComponent = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ReDo</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {isAuthenticated ? <LoggedInMenu /> : <LoggedOutMenu />}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
