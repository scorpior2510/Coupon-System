import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// ----------------------------------------------
import { CompanyListState, RootState } from "..";
import { CompanyModel } from "../../Models";


const initialState: CompanyListState = {
    companyList: [],
    hasMadeInitialFetch: false
}

const companyListSlice = createSlice({
    name: "companyList",
    initialState,
    reducers: {
        fetchCompanyListAction(state, action: PayloadAction<CompanyModel[]>) {
            state.companyList = action.payload;
            state.hasMadeInitialFetch = true;
        },
        deleteCompanyAction(state, action: PayloadAction<number>) {
            state.companyList = state.companyList.filter(company => company.id !== action.payload);
        },
        updateCompanyAction(state, action: PayloadAction<CompanyModel>) {
            const index = state.companyList.findIndex(company => company.id === action.payload.id);
            const updatedCompanyList = [...state.companyList];
            updatedCompanyList[index] = action.payload;
            state.companyList = updatedCompanyList;
        },
        addCompanyAction(state, action: PayloadAction<CompanyModel>) {
            const updatedCompanyList = [...state.companyList];
            updatedCompanyList.push(action.payload);
            state.companyList = updatedCompanyList;
        },
        initializeCompanyListAction() {
            return initialState;
        }
    }
})

export const selectCompanyList = (state: RootState) => state.companyList.companyList;
export const selectCompanyListFetchStatus = (state: RootState) => state.companyList.hasMadeInitialFetch;

export const {
    fetchCompanyListAction, deleteCompanyAction, updateCompanyAction,addCompanyAction, initializeCompanyListAction
} = companyListSlice.actions;

export const companyListReducer = companyListSlice.reducer;