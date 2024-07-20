import { createContext, useContext } from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context for managing toast messages
const ToastContext= createContext();

// ToastProvider component manages toast messages and provides a method to show them
export const ToastProvider = ({ children}) => {
    const showToast = (message, type) => {
        toast[type](message, {
            position:"bottom-center",
            autoClose:1500,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
        });
    };

    // Provide showToast function through context
    return(
        <ToastContext.Provider value={showToast}>
            {children}
            <ToastContainer/>
        </ToastContext.Provider>
    );
};

// Custom hook to consume toast context and show toast messages
export const useToast = () => {
    return useContext(ToastContext);
};