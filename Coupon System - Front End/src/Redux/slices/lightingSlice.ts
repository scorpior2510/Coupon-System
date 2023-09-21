import { createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------
import { LightingState, RootState } from "..";


const initialState: LightingState = {
    isDarkMode: false
}

const lightingModeSlice = createSlice({
    name: "lightingMode",
    initialState,
    reducers: {
        changedLightingModeAction(state) {
            state.isDarkMode = !state.isDarkMode;
        },
        initializeLightingModeAction() {
            return initialState;
        }
    }
})

export const selectIsDarkMode = (state: RootState) => state.lightingMode.isDarkMode;

export const {
    changedLightingModeAction, initializeLightingModeAction
} = lightingModeSlice.actions;

export const lightingModeReducer = lightingModeSlice.reducer;