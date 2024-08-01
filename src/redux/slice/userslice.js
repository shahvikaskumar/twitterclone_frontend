import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Base_URL } from "../../Utility/config";
import { setloading} from "./authslice";
import { setusertweet } from "./tweetslice";


const initialState = {
    singleuser:'',
    btnedit:false,
    btnphoto:false,
    

};

const userslice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setsingleuser(state, action){
            state.singleuser = action.payload;
        },

        setbtnedit(state,action){
            state.btnedit = action.payload;
        },

        setbtnphoto(state, action){
            state.btnphoto = action.payload;
        },

        
    },
});

//#region  Get Single Use Detail
export const Getsingleuser = (token, id, showtoast) => async(dispatch) =>{
    try{
        dispatch(setloading(true));
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };

        const response = await axios.get(`${Base_URL}user/${id}`,config);        
        dispatch(setsingleuser(response.data.user));
    }
    catch(err){
        console.log(err);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured' , type:"error"}));
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

//#region other use Follow
export const Userfollow = (token, otheruserid, userid, showtoast) => async(dispatch) => {
    try{
        dispatch(setloading(true));
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        };

        const response = await axios.post(`${Base_URL}user/${otheruserid}/follow`,{userid},config);
        dispatch(setsingleuser(response.data.usertofollow));
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:"error"}))
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

//#region Other user Unfollow
export const Userunfollow = (token, otheruserid, userid, showtoast) => async(dispatch) => {
    try{
        dispatch(setloading(true));
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        };

        const response = await axios.post(`${Base_URL}user/${otheruserid}/unfollow`,{userid},config);
        dispatch(setsingleuser(response.data.usertounfollow));
        
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:"error"}))
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

//#region user Profile Picture Update
export const Profilepicupdate = (token, formdata, showtoast) => async (dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers :{
                'Content-Type':'multipart/form-data',              
                Authorization:`Bearer ${token}`
            }
        };
        
        const response = await axios.post(`${Base_URL}user/${formdata.userid}/uploadprofilepic`, {image:formdata.image}, config);
        dispatch(setsingleuser(response.data.user));
        dispatch(showtoast({message:response.data.success, type:"success"}));
        
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error, type:"danger"}));
    }
    finally {
        dispatch(setloading(false));
    }
};
//#endregion

//#region User Profile Details edit like name, dob, location
export const Profileedit = (token, formdata, userid, showtoast) => async (dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers :{                
                Authorization:`Bearer ${token}`
            }
        };
        
        const response = await axios.put(`${Base_URL}user/${userid}`, formdata, config);
        dispatch(setsingleuser(response.data.user));
        dispatch(showtoast({message:response.data.success, type:"success"}));
        
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error, type:"danger"}));
    }
    finally {
        dispatch(setloading(false));
    }
};
//#endregion

//#region Get single user Tweet only
export const Getusertweet = (token, userid) => async(dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };

        const response = await axios.get(`${Base_URL}user/${userid}/tweets`,config);
        dispatch(setusertweet(response.data.tweets));
    }
    catch(err){
        console.log(err.response?.data?.error);
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

export const {setsingleuser , setbtnedit, setbtnphoto} = userslice.actions;

export default userslice.reducer;