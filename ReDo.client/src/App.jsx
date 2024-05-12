import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import useAuthStore from "./stores/useAuthStore.js";
import LogoutButtonComponent from "./components/LogoutButtonComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";


function App() {
    // const [token, setToken] = useState(''); 
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // const { token, isAuthenticated, login, logout} = useAuthStore();     
    
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState({});

    // Fetch all members
    useEffect(() => {
        axios.get('http://localhost:5002/members')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    // Fetch a single member
    useEffect(() => {
        axios.get('http://localhost:5002/member')
            .then(response => {
                setMember(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                {!isAuthenticated ? (
                    <LoginComponent />
                ) : (
                    <>
                        <LogoutButtonComponent />
                        <p>Members: {JSON.stringify(members)}</p>
                        <p>Member: {JSON.stringify(member)}</p>
                    </>
                )}
            </div>
        </>
    )
}

export default App;
