import "./CustomerListContainerAll.css";
// ----------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// ----------------------------------------------
import { CustomerListTableView } from "..";
import { CustomerModel } from "../../../Models";
import {
  fetchCustomerListAction,
  selectCustomerList,
  selectCustomerListFetchStatus,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";
import { EmptyView } from "../../Shared";
import { useNavigate } from "react-router-dom";

function CustomerListContainerAll(): JSX.Element {
  const navigate = useNavigate();
  const customerList = useSelector(selectCustomerList);
  const hasMadeInitialFetch = useSelector(selectCustomerListFetchStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getAllCustomers()
        .then((res) => {
          const fetchedCustomerList: CustomerModel[] = res.data;
          dispatch(fetchCustomerListAction(fetchedCustomerList));
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
    <div className="CustomerListContainerAll">
      {hasMadeInitialFetch && customerList.length === 0 ? (
        <EmptyView screen="AdminCustomers" />
      ) : (
        <CustomerListTableView customerList={customerList} />
      )}
    </div>
  );
}

export default CustomerListContainerAll;
