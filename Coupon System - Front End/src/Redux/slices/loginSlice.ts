import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// ----------------------------------------------
import { LoginState, RootState } from "..";
import { ClientType, UserModel } from "../../Models";

const initialState: LoginState = {
    loggedInUser: {email: "", clientType: ClientType.NONE, token: ""}
}

const loginSlice = createSlice({
    name: "loggedInUserDetails",
    initialState,
    reducers: {
        userLoggedInAction(state, action: PayloadAction<UserModel>) {
            state.loggedInUser = action.payload;
        },
        userLoggedOutAction() {
            return initialState;
        },
        initializeLoggedInUserDetailsAction() {
            return initialState;
        }
    }
})

export const selectLoggedInUser = (state: RootState) => state.loggedInUserDetails.loggedInUser;

export const {
    userLoggedInAction, userLoggedOutAction, initializeLoggedInUserDetailsAction
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;

