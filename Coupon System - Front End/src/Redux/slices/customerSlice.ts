
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------
import { CustomerState, RootState } from "..";
import { CouponModel, CustomerModel } from "../../Models";

const initialState: CustomerState = {
    customer: { id: 0, firstName: "", lastName: "", email: "", password: "", coupons: [] },
    hasMadeInitialFetch: false
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        fetchCustomerAction(state, action: PayloadAction<CustomerModel>) {
            state.customer = action.payload;
            state.hasMadeInitialFetch = true;
        },
        purchaseCouponAction(state, action: PayloadAction<CouponModel>) {
            const updatedCustomerCoupons = [...state.customer.coupons];
            updatedCustomerCoupons.push(action.payload);
            state.customer.coupons = updatedCustomerCoupons;
        },
        initializeCustomerAction() {
            return initialState;
        }
    }
})

export const selectCustomer = (state: RootState) => state.customer.customer;
export const selectCustomerFetchStatus = (state: RootState) => state.customer.hasMadeInitialFetch;

export const {
    fetchCustomerAction, purchaseCouponAction, initializeCustomerAction
} = customerSlice.actions;

export const customerReducer = customerSlice.reducer;