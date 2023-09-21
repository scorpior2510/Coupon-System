import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// ----------------------------------------------
import { lightingModeReducer, loginReducer, companyListReducer, 
    customerListReducer, companyReducer, customerReducer, couponListReducer } from ".";

const rootReducer = combineReducers({
    lightingMode: lightingModeReducer,
    loggedInUserDetails: loginReducer,
    companyList: companyListReducer,
    customerList: customerListReducer,
    couponList: couponListReducer,
    company: companyReducer,
    customer: customerReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;