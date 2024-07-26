import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Base_URL } from "../../Utility/config";

const initialState = {
    token:null,
    isauth:false,
    user:'',
    loading:false,    
};

const authslice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setauth(state, action){
            const {token, user} = action.payload;
            state.token = token;
            state.isauth = true;
            state.user = user;
            state.loading = false;           

        },

        clearauth(state) {
            state.token = null;
            state.isauth = false;
            state.user = null;
            state.loading = false;
            state.mloader = false;
        },

        setloading(state, action){
            state.loading = action.payload;
        },        

        seterror(state, action){
            state.error = action.payload;
            state.loading = false;
        },

        setuserupdate(state,action){
            state.user=action.payload;
            const updateuser = action.payload;
            const userindex = state.allusers.findIndex(user => user._id === updateuser._id);
            if (userindex !== -1) {
              state.allusers[userindex] = updateuser;            }
        },
    },
});

export const verifytoken = (token) => async (dispatch) => {
    
    try{
        dispatch(setmloader(true));
        const config = {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        };

        const response = await axios.post(`${Base_URL}auth/verify-token`,{},config);
        
        if(response.data.valid){
            dispatch(setauth({token:token,user:response.data.user}));           
        }
        else {
            localStorage.removeItem('token');
            dispatch(clearauth());
        }
    }
    catch(error){
        localStorage.removeItem('token');
        dispatch(seterror(error.message));
    }
    finally{
        dispatch(setmloader(false));
    }
};

export const register = (data , navigate, showtoast) => async (dispatch) => {
    
    
    try{
        dispatch(setloading(true));
        const response = await axios.post(`${Base_URL}auth/register`,data);      
        dispatch(showtoast({message:response.data.success,type:'success'}));
        navigate('/login');
    }
    catch(err){
        dispatch(seterror(err.message));       
        dispatch(showtoast({message:err?.response?.data?.error,type:'error'}));    
    }
    finally{
        dispatch(setloading(false));       
    }
};

export const login = (data, navigate, showtoast, prevpath) => async (dispatch) =>{
    
    try{
        dispatch(setloading(true));        
        const response = await axios.post(`${Base_URL}auth/login`,data);  
        localStorage.setItem('token',response.data.token);        
        dispatch(setauth({token:response.data.token,user:response.data.user}));               
        dispatch(showtoast({message:response.data.success,type:"success"}));
        
        if(response.data.user['usertype'] === 'admin'){            
            navigate('/admin');
        }else {

        navigate('/');
        }
        
        
    }
    catch(error){
        dispatch(seterror(error.message));
        dispatch(showtoast({message:error.response?.data?.error || 'An error occures',type:'error'}));
    }
    finally{
        dispatch(setloading(false));
    }
}

export const logout = (navigate, showtoast) => async (dispatch) => {
    
    try{
        localStorage.removeItem('token');
        dispatch(clearauth());                
        dispatch(showtoast({message:'Logout Successfully.',type:'success'}));
        navigate('/');
    }
    catch(error){
        dispatch(seterror(error.message));
        dispatch(showtoast({message:'Logout Unsuccessfully.',type:'error'}));
    }
};

export const forgotpassword = (data,navigate, showtoast) => async (dispatch) => {
    try{
        dispatch(setloading(true));
        const response = await axios.post(`${Base_URL}auth/forgotpassword`,data);
        dispatch(showtoast({message:response.data.success, type:"success"}));
        navigate('/login');  
    }
    catch(error){
        dispatch(seterror(error.message));
        dispatch(showtoast({message:error.response?.data?.error || 'An error occures',type:'error'}));
    }
    finally{
        dispatch(setloading(false));
    }

};

export const Resetpassword = (data, navigate, showtoast) => async  (dispatch) => {

    try{
        dispatch(setloading(true));
        const response = await axios.post(`${Base_URL}auth/resetpassword`,data);
        dispatch(showtoast({message:response.data.success, type:'success'}));
        navigate('/login');
    }
    catch(error){
        dispatch(seterror(error.message));
        dispatch(showtoast({message:error.response?.data?.error || 'An error occures',type:'error'}));
    }
    finally{
        dispatch(setloading(false));
    }
};

export const Getalluser = (token) => async(dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers:{      
                Authorization:`Bearer ${token}`
            }
          };
        const response = await axios.get(`${Base_URL}users/all`,config);
        dispatch(setallusers(response.data.data));
        
    }
    catch(error){
        console.log(error);        
    }
    finally{
        dispatch(setloading(false));
    }
};


export const Updateprofile = createAsyncThunk('user/update', async({data, uid, token, showtoast},{dispatch}) => {
    
    try{
        dispatch(setloading(true));        
        const config = {
            headers:{      
              'Content-Type':'multipart/form-data',              
              Authorization:`Bearer ${token}`
            }
          };
          
        const response = await axios.put(`${Base_URL}user/update/${uid}`,data, config);
        dispatch(showtoast({message:response.data.success, type:'success'}));          
        dispatch(setuserupdate(response.data.user));
          
    }
    catch(err){
        console.log(err.response.data);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:'error'}));
        
    }
    finally{
        dispatch(setloading(false));        
    }

});

export const {setauth, setallusers, setuserupdate, clearauth, setloading, setmloader , seterror} = authslice.actions;

export default authslice.reducer;