import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    username:null,
    token:null
}

let mySlice = createSlice({
    name:"User Info",
    initialState,
    reducers:{
        login(state, action) {
            state.username = action.payload.username;
            state.token = action.payload.token; 
        },
        signout(state, action) {
            state.username = null;
            state.token = null;
        }
    }
});

export const {login, signout} = mySlice.actions;
export default mySlice.reducer; 