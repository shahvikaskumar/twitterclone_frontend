import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";


const ProtectedRoute = ({children}) => {
    // Retrieve authentication data from context
    const {auth} = useAuth();

    // If user is not authenticated, navigate to the login page
    if(!auth.isauth){
        return <Navigate to='/login' />
    }

    // If user is authenticated, render the child components
    return children;
};

export default ProtectedRoute;