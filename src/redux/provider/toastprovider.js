import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cleartoast } from '../slice/toastslice';

export const ToastProvider = ({ children}) => {
    const dispatch = useDispatch();
    const toaststate = useSelector((state) => state.toast);

    React.useEffect(() => {
        if(toaststate.message && toaststate.type){
            toast[toaststate.type](toaststate.message,{
                position: 'bottom-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    dispatch(cleartoast());
                },
            });
        }
    },[toaststate, dispatch]);

    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};