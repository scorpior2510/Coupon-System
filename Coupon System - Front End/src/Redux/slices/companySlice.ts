import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// ----------------------------------------------
import { CompanyState, RootState } from "..";
import { CompanyModel, CouponModel } from "../../Models";


const initialState: CompanyState = {
    company: { id: 0, name: "", email: "", password: "", coupons: [] },
    hasMadeInitialFetch: false
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        fetchCompanyAction(state, action: PayloadAction<CompanyModel>) {
            state.company = action.payload;
            state.hasMadeInitialFetch = true;
        },
        deleteCouponAction(state, action: PayloadAction<number>) {
            state.company.coupons = state.company.coupons.filter(coupon => coupon.id !== action.payload);
        },
        updateCouponAction(state, action: PayloadAction<CouponModel>) {
            const index = state.company.coupons.findIndex(coupon => coupon.id === action.payload.id);
            const updatedCompanyCoupons = [...state.company.coupons];
            updatedCompanyCoupons[index] = action.payload;
            state.company.coupons = updatedCompanyCoupons;
        },
        addCouponAction(state, action: PayloadAction<CouponModel>) {
            const updatedCompanyCoupons = [...state.company.coupons];
            updatedCompanyCoupons.push(action.payload);
            state.company.coupons = updatedCompanyCoupons;
        },
        initializeCompanyAction() {
            return initialState;
        }
    }
})

export const selectCompany = (state: RootState) => state.company.company;
export const selectCompanyFetchStatus = (state: RootState) => state.company.hasMadeInitialFetch;

export const {
    fetchCompanyAction, deleteCouponAction, updateCouponAction, addCouponAction, initializeCompanyAction
} = companySlice.actions;

export const companyReducer = companySlice.reducer;