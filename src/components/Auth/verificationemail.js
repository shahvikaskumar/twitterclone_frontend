import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Base_URL } from '../../Utility/config';
import { showtoast } from "../../redux/slice/toastslice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { setloading } from '../../redux/slice/authslice';
import Loading from '../loading/loading';

const Verifyemailform = () => {
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    let [message, setmessage] = useState('');
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    const email = query.get('email');

    useEffect(() => {
        const verifyEmail = async () => {
          try {
            dispatch(setloading(true));
            if (token && email) {
              const response = await axios.get(`${Base_URL}auth/verifyemail?token=${token}&email=${email}`);
              setmessage(response.data.success);
            }
          } catch (error) {
            dispatch(showtoast({ message: error.response?.data?.error || 'An error occurred during verification', type: "error" }));
          }finally{
            dispatch(setloading(false));
          }
        };
    
        verifyEmail();
      }, [token, email, dispatch]);
    
    return (
        <>
        {loading ? (<Loading /> ) : (
        <div className='w-100 text-center my-5 py-5 h-75'>
            <FontAwesomeIcon className='mb-4 text-success'  icon={faCircleCheck} size="5x"/>
            <h2 className='fs-1'>{message}</h2>
        </div>
        )}
        </>
    );
};

export default Verifyemailform;
