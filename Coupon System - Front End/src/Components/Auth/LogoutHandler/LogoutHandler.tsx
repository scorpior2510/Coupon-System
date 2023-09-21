import "./LogoutHandler.css";
// ----------------------------------------------
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// ----------------------------------------------
import { initializeCompanyAction, initializeCompanyListAction, initializeCouponListAction, 
    initializeCustomerAction, initializeCustomerListAction, userLoggedOutAction } from "../../../Redux";

function LogoutHandler(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userLoggedOutAction());
        dispatch(initializeCompanyListAction());
        dispatch(initializeCustomerListAction());
        dispatch(initializeCompanyAction());
        dispatch(initializeCustomerAction());
        dispatch(initializeCouponListAction());
        navigate("/Home");
    }, []);

    return (
        <></>
    );
}

export default LogoutHandler;
