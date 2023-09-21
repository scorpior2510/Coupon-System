import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// ----------------------------------------------
import { CustomerListState, RootState } from "..";
import { CustomerModel } from "../../Models";


const initialState: CustomerListState = {
    customerList: [],
    hasMadeInitialFetch: false
}

const customerListSlice = createSlice({
    name: "customerList",
    initialState,
    reducers: {
        fetchCustomerListAction(state, action: PayloadAction<CustomerModel[]>) {
            state.customerList = action.payload;
            state.hasMadeInitialFetch = true;
        },
        deleteCustomerAction(state, action: PayloadAction<number>) {
            state.customerList = state.customerList.filter(customer => customer.id !== action.payload);
        },
        updateCustomerAction(state, action: PayloadAction<CustomerModel>) {
            const index = state.customerList.findIndex(customer => customer.id === action.payload.id);
            const updatedCustomerList = [...state.customerList];
            updatedCustomerList[index] = action.payload;
            state.customerList = updatedCustomerList;
        },
        addCustomerAction(state, action: PayloadAction<CustomerModel>) {
            const updatedCustomerList = [...state.customerList];
            updatedCustomerList.push(action.payload);
            state.customerList = updatedCustomerList;
        },
        initializeCustomerListAction() {
            return initialState;
        }
    }
})

export const selectCustomerList = (state: RootState) => state.customerList.customerList;
export const selectCustomerListFetchStatus = (state: RootState) => state.customerList.hasMadeInitialFetch;

export const {
    fetchCustomerListAction, deleteCustomerAction, updateCustomerAction,addCustomerAction, initializeCustomerListAction
} = customerListSlice.actions;

export const customerListReducer = customerListSlice.reducer;