import axios from 'axios';
import { Base_URL } from '../../Utility/constant';

export const login = (username, password) => async dispatch => {
    try{
        const response = await axios.post(`${Base_URL}auth/login`,{username,password});
        dispatch({type:'Login success', payload:response.data});
    }
    catch(error){
        dispatch({type:'Login fail'});
    }
};


export const register = (fullname,email,username,password) => async dispatch => {
    try{
        const response = await axios.post(`${Base_URL}auth/register`,{fullname, email, username,password});
        dispatch({type:'Register success', payload:response.data});
    }
    catch(error){
        dispatch({type:'Register fail'});
    }
};