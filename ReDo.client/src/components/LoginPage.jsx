import {useEffect, useState} from 'react';
import useAuthStore from '../stores/useAuthStore.js';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const loginError = useAuthStore((state) => state.loginError);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate(); 

    
    useEffect(() => {
        if (!loginError && isAuthenticated) {
            navigate('/')
        }
    }, [loginError, isAuthenticated, navigate])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <h1 className="mb-3">Login</h1>
                <form onSubmit={handleSubmit}>
                    {/*<form onSubmit={handleSubmit}>*/}
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    {loginError && <div className={"alert alert-danger"}>{loginError}</div>}
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 