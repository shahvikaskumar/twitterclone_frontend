import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message:'',
    type:'',
};

const toastslice = createSlice({
    name:'toast',
    initialState,
    reducers:{

        // Sets the toast message and type
        showtoast(state, action){
            state.message = action.payload.message;
            state.type = action.payload.type;
        },

        // Clears the toast message and type
        cleartoast(state){
            state.message='';
            state.type='';
        },
    },
});

export const { showtoast, cleartoast } = toastslice.actions;
export default toastslice.reducer;