import "./CustomerDetailsContainer.css";
// ----------------------------------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ----------------------------------------------
import { CustomerFocusedViewCu } from "..";
import { CustomerModel } from "../../../Models";
import {
  fetchCustomerAction,
  selectCustomer,
  selectCustomerFetchStatus,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";
import { useNavigate } from "react-router-dom";

function CustomerDetailsContainer(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = useSelector(selectCustomer);
  const hasMadeInitialFetch = useSelector(selectCustomerFetchStatus);

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getCustomerDetails()
        .then((res) => {
          const fetchedCustomer: CustomerModel = res.data;
          dispatch(fetchCustomerAction(fetchedCustomer));
        })
        .catch((error) => {
          if (error?.code === "ERR_NETWORK") {
            navigate("/server/down");
          }
          notifyService.errorAxiosApiCall(error);
        });
    }
  }, []);

  return (
    <div className="CustomerDetailsContainer">
      <CustomerFocusedViewCu customer={customer} />
    </div>
  );
}

export default CustomerDetailsContainer;
