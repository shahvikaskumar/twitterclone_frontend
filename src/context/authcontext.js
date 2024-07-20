import { createContext,useContext, useEffect,useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { Base_URL } from '../Utility/constant';

// Create a context for managing authentication state
const AuthContext = createContext();

// AuthProvider component manages authentication state and provides authentication methods
export const AuthProvider = ({children}) => {
    const [auth, setauth] = useState({token:null, isauth:false, user:null});
    const navigate=useNavigate();
    const location=useLocation();

    // Function to verify the authentication token
    const verifytoken = async (token) => {
        
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            };
            
            const response = await axios.post(`${Base_URL}auth/verify-token`,{},config);
            
            if(response.data.valid){                
                setauth({token,isauth:true,user:response.data.user});
                navigate(location.pathname);                
            }else{
                localStorage.removeItem('token');
                setauth({token:null,isauth:false,user:null});
            }
        }
        catch (error){
            localStorage.removeItem('token');
            setauth({token:null,isauth:false, user:null});
        }
    };

    // Effect hook to check for authentication token on component mount
    useEffect(() => {
        const token=localStorage.getItem('token');
        if(token){
            verifytoken(token);
        }
        // eslint-disable-next-line
    },[]);

    
    // Function to handle user login
    const login = (data) => {        
        localStorage.setItem('token',data.token);
        setauth({token:data.token, isauth:true,user:data.user});                
        navigate('/');
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('token');
        setauth({token:null, isauth:false, user:null});        
        navigate('/login');
    };

    // Provide authentication state and methods through context
    return(
        <AuthContext.Provider value={{auth, login,logout}}>
            {children}
        </AuthContext.Provider>
    );   
};

// Custom hook to consume authentication context
export const useAuth = () => useContext(AuthContext);