import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { setloading} from "../redux/slice/authslice";

const ProtectedRoute = ({children}) => {

    const dispatch = useDispatch();
    const isauth = useSelector((state) => state.auth.isauth);
    const [redirectPath, setRedirectPath] = useState(null);
    
    useEffect(() => {
        dispatch(setloading(true));    
        if (!isauth) {
            setRedirectPath('/login');
        } 
        dispatch(setloading(false));
    }, [isauth, dispatch]); 

    if (redirectPath) {
        return <Navigate to={redirectPath} />;
    }
    return children;    
    
};

export default ProtectedRoute;