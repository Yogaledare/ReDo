import useAuthStore from "../stores/useAuthStore.js";
import {Navigate} from "react-router-dom";


const ProtectedRoute = ({children}) => {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return children;

}

export default ProtectedRoute;