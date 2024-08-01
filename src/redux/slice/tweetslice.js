import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setloading } from "./authslice";
import axios from "axios";
import { Base_URL } from "../../Utility/config";


const initialState = {
    tweetdialog: false,
    menucanvas:false,
    alltweet:[],    
    replytweet:null,
    singletweet:[],
    changetweet:false,
    usertweet:[],

};

const tweetslice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {

        // Sets the visibility of the tweet dialog
        settweetdialog(state, action) {
            state.tweetdialog = action.payload;
            
        },  
        
        // Sets the flag to indicate a change in tweets
        setchangetweet(state, action){
            state.changetweet = action.payload;
        },

        // Sets the visibility of the menu canvas
        setmenucanvas(state, action){
            state.menucanvas = action.payload;
        },

        // Sets all tweets and handles retweet structure
        setalltweet(state,action){
            const tweets = action.payload;
            state.alltweet = tweets;
            tweets.forEach(tweet => {
                const retweetcount = tweet.retweetby.length;
                const retweet = tweet.toJSON ? tweet.toJSON() : tweet;
                

                for (let i = 0; i < retweetcount; i++) {
                    const retweetUser = retweet.retweetby[i];
                    
                    state.alltweet.push({
                        ...retweet, 
                        retweetedby: retweetUser.user.username,
                        createdAt: retweetUser.retweetdate
                        })
                    }
                    
                });
            state.alltweet.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt  ));
        },

        // Adds a new tweet to the list of all tweets
        setaddtweet(state, action){
            state.alltweet = [action.payload, ...state.alltweet];
        },

        // Sets the tweet to which a reply is being made
        setreplytweet(state, action){
            state.replytweet = action.payload;
        },

        // Sets the single tweet data
        setsingletweet(state, action){
            state.singletweet = action.payload;
        },

        // Sets the tweets of a specific user
        setusertweet(state,action){
            state.usertweet = action.payload;
        },

        // Updates likes for a tweet in all relevant places
        setupdatelikes(state, action){
            const updatedTweet = action.payload;
            const tweetIndex = state.alltweet.findIndex(tweet => tweet._id === updatedTweet._id);
            if (tweetIndex !== -1) {
                state.alltweet[tweetIndex] = {
                    ...state.alltweet[tweetIndex],
                    likes: updatedTweet.likes,
                };
            }

            const usertweetIndex = state.usertweet?.findIndex(tweet => tweet._id === updatedTweet._id);
            if (usertweetIndex !== -1) {
                state.usertweet[usertweetIndex] = {
                    ...state.usertweet[usertweetIndex],
                    likes: updatedTweet.likes,
                };
            }
            
            if(state.singletweet.length > 0){
            if(state.singletweet[0]._id === updatedTweet._id){
                state.singletweet[0] = {
                    ...state.singletweet[0],
                    likes:updatedTweet.likes,
                };
            
            }
            const replieindex = state.singletweet[0].replies.findIndex(tweet => tweet._id === updatedTweet._id);
            if (replieindex !== -1) {
                state.singletweet[0].replies[replieindex] = {
                    ...state.singletweet[0].replies[replieindex],
                    likes: updatedTweet.likes,
                };
            }
            
            }    
        },

        // Updates retweets for a tweet in all relevant places
        setupdateretweet(state, action){
            const updatedTweet = action.payload;
            const tweetIndex = state.alltweet.findIndex(tweet => tweet._id === updatedTweet._id);
            if (tweetIndex !== -1) {
                state.alltweet[tweetIndex] = {
                    ...state.alltweet[tweetIndex],
                    retweetby: updatedTweet.retweetby,
                };
            }

            
                const tno = updatedTweet.retweetby.length - 1;
                const retweet = updatedTweet.toJSON ? updatedTweet.toJSON() : updatedTweet;               
                const retweetUser = retweet.retweetby[tno];
                    
                    state.alltweet.push({
                        ...retweet, 
                        retweetedby: retweetUser.user.username,
                        createdAt: retweetUser.retweetdate
                        })
                    
                    
                
            state.alltweet.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt  ));

            
            const usertweetIndex = state.usertweet?.findIndex(tweet => tweet._id === updatedTweet._id);
            if (usertweetIndex !== -1) {
                state.usertweet[usertweetIndex] = {
                    ...state.usertweet[usertweetIndex],
                    retweetby: updatedTweet.retweetby,
                };
            }
            
            if(state.singletweet.length > 0){
            if(state.singletweet[0]._id === updatedTweet._id){
                state.singletweet[0] = {
                    ...state.singletweet[0],
                    retweetby:updatedTweet.retweetby,
                };
            
            }
            const replieindex = state.singletweet[0].replies.findIndex(tweet => tweet._id === updatedTweet._id);
            if (replieindex !== -1) {
                state.singletweet[0].retweetby[replieindex] = {
                    ...state.singletweet[0].retweetby[replieindex],
                    retweetby: updatedTweet.retweetby,
                };
            }
            
            }    
        },

        // Deletes a tweet from all relevant places
        settweetdelete(state, action){
            const tweetdelete = action.payload;
            state.alltweet = state.alltweet.filter(tweet => tweet._id !== tweetdelete);

            state.singletweet = state.singletweet?.filter(tweet => tweet._id !== tweetdelete);
            state.singletweet[0] = {
                ...state.singletweet[0],
                replies: state.singletweet[0]?.replies?.filter(reply => reply._id !== tweetdelete)
            };
            state.usertweet = state.usertweet?.filter(tweet => tweet._id !== tweetdelete);

        },

        // Updates replies for a tweet
        setupdatereply(state, action){
            const updatedTweet = action.payload;
            const tweetIndex = state.alltweet.findIndex(tweet => tweet._id === updatedTweet._id);
            if (tweetIndex !== -1) {
                state.alltweet[tweetIndex] = {
                    ...state.alltweet[tweetIndex],
                    replies: updatedTweet.replies,
                };
            }            
            
        },
    },
});

//#region Async action to create a new tweet
export const Createtweet = createAsyncThunk('tweet/create', async({data,token,showtoast, modalclose},{dispatch}) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization:`Bearer ${token}`
            }
        };

        console.log(data);
        const response = await axios.post(`${Base_URL}tweet`,data,config);
        dispatch(showtoast({message:response.data.success,type:'success'}));
        dispatch(setaddtweet(response.data.tweet));
    }
    catch(err){
        console.log(err.response.data);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:'error'}));
    }
    finally{
        dispatch(setloading(false));
        modalclose();
    }
});
//#endregion

//#region Async action to get all tweets
export const Getalltweet = (token) => async (dispatch) => {
    try{

        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };

        dispatch(setloading(true));
        const response = await axios.get(`${Base_URL}tweet`,config);
        dispatch(setalltweet(response.data.tweets));        
    }
    catch(error){
        console.log(error);
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

//#region Async action to like a tweet
export const Tweetlike = (token, tweetid, userid, showtoast) => async(dispatch) => {
    try{

        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };
        const response = await axios.post(`${Base_URL}tweet/${tweetid}/like`, {userid} ,config);
        dispatch(setupdatelikes(response.data.tweet));
        dispatch(showtoast({message:response.data.success,type:"success"}))
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured',type:"error"}))
    }
};
//#endregion

//#region Async action to dislike a tweet
export const Tweetdislike = (token, tweetid, userid, showtoast) => async(dispatch) => {
    try{

        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };
        const response = await axios.post(`${Base_URL}tweet/${tweetid}/dislike`, {userid} ,config);
        dispatch(setupdatelikes(response.data.tweet));
        dispatch(showtoast({message:response.data.success,type:"success"}))
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured',type:"error"}))
    }
};
//#endregion

//#region Async action to reply to a tweet
export const Tweetreply = createAsyncThunk('tweet/reply', async({data, token, showtoast,tweetid ,modalclose},{dispatch}) => {
    try{
        dispatch(setloading(true));
        dispatch(setchangetweet(true));
        const config = {
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization:`Bearer ${token}`
            }
        };
        
        const response = await axios.post(`${Base_URL}tweet/${tweetid}/reply`, data , config);
        dispatch(showtoast({message:response.data.success,type:'success'}));
        dispatch(setupdatereply(response.data.tweet));
        dispatch(setchangetweet(false));
        console.log(response.data);
        
    }
    catch(err){
        console.log(err.response.data);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:'error'}));
    }
    finally{
        dispatch(setloading(false));
        modalclose();
    }
});
//#endregion

//#region Async action to get a single tweet
export const Getsingletweet = (token , tweetid) => async (dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };        
        const response = await axios.get(`${Base_URL}tweet/${tweetid}`,config);
        dispatch(setsingletweet(response.data.tweet)); 
        
    }
    catch(error){
        console.log(error);
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

//#region Async action to delete a tweet
export const Tweetdelete = (token, tweetid, userid, showtoast) => async(dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            },            
        };
        
        const response = await axios.delete(`${Base_URL}tweet/${tweetid}/${userid}`, config );
        dispatch(settweetdelete(response.data.tweet._id));
        dispatch(showtoast({message:response.data.success, type:"success"}));
    }
    catch(err){
        console.log(err);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:"error"}));
    }
    finally{
        dispatch(setloading(false));
    }
}; 
//#endregion

//#region Async action to retweet a tweet
export const Tweetretweet = (token, tweetid, userid, showtoast) => async(dispatch) => {
    try{
        dispatch(setloading(true));
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        };

        const response = await axios.post(`${Base_URL}tweet/${tweetid}/retweet`,{userid}, config);
        dispatch(setupdateretweet(response.data.tweet));
        dispatch(showtoast({message:response.data.success, type:"success"}));   
        console.log(response.data.tweet); 
    }
    catch(err){
        console.log(err.response?.data?.error);
        dispatch(showtoast({message:err.response?.data?.error || 'An error occured', type:"error"}));
    }
    finally{
        dispatch(setloading(false));
    }
};
//#endregion

// Exporting actions and reducer
export const { settweetdialog, setchangetweet , settweetdelete , setreplytweet, setsingletweet , setupdatereply, setmenucanvas , setupdatelikes, setupdateretweet, setusertweet , setalltweet, setaddtweet } = tweetslice.actions;

export default tweetslice.reducer;