import useAuthStore from "../stores/useAuthStore.js";
import {Navigate} from "react-router-dom";


const ProtectedRoute = ({children, condition}) => {

    // const token = useAuthStore(state => state.token);


    if (!condition) {
        return <Navigate to="/"/>;
    }

    return children;

}

export default ProtectedRoute;