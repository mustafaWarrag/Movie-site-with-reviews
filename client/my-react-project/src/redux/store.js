import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers.js";

const store = configureStore({
    reducer:{
        user:myReducer
    }
});

export default store;