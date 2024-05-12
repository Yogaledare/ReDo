import {useState} from 'react';
import UseAuthStore from '../stores/useAuthStore.js';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = UseAuthStore((state) => state.login);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <h2 className="mb-3">Login</h2>
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
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent; 