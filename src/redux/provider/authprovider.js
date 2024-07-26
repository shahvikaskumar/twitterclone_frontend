import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { verifytoken } from "../slice/authslice";


const AuthProvider = ({children}) => {
    const dispatch = useDispatch();    
      
    useEffect(() => {
             
        const token = localStorage.getItem('token');
        
        if(token){
            dispatch(verifytoken(token));
        } 
        
        // eslint-disable-next-line
    },[dispatch]);

    return (
        <>
            {children}
        </>       
    ) 
    
};

export default AuthProvider;

