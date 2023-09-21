import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------
import { CouponListState, RootState } from "..";
import { CouponModel } from "../../Models";

const initialState: CouponListState = {
    couponList: [],
    hasMadeInitialFetch: false
}

const couponListSlice = createSlice({
    name: "couponList",
    initialState,
    reducers: {
        fetchCouponListAction(state, action: PayloadAction<CouponModel[]>) {
            state.couponList = action.payload;
            state.hasMadeInitialFetch = true;
        },
        decreaseCouponAmountByOneAction(state, action: PayloadAction<CouponModel>) {
            const index = state.couponList.findIndex(coupon => coupon.id === action.payload.id);
            const updatedCouponList = [...state.couponList];
            updatedCouponList[index].amount = updatedCouponList[index].amount - 1;
            state.couponList = updatedCouponList;
        },
        initializeCouponListAction() {
            return initialState;
        }
    }
})

export const selectCouponList = (state: RootState) => state.couponList.couponList;
export const selectCouponListFetchStatus = (state: RootState) => state.couponList.hasMadeInitialFetch;

export const {
    fetchCouponListAction, initializeCouponListAction, decreaseCouponAmountByOneAction
} = couponListSlice.actions;

export const couponListReducer = couponListSlice.reducer;