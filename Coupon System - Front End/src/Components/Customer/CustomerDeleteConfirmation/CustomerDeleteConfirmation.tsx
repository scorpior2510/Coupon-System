import "./CustomerDeleteConfirmation.css";
// ----------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// ----------------------------------------------
import { CustomerModel } from "../../../Models";
import { deleteCustomerAction, selectCustomerList } from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";
import { TitleWithLogo } from "../../UI";

function CustomerDeleteConfirmation(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);

  const [customer] = useState<CustomerModel>(
    useSelector(selectCustomerList).find((c) => c.id === id)!
  );

  const handleDelete = () => {
    webApiService
      .deleteCustomer(id)
      .then(() => {
        dispatch(deleteCustomerAction(id));
        navigate("/api/admin/customers");
        notifyService.successPlainText("customer deleted successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  const handleCancel = () => {
    navigate("/api/admin/customers");
  };

  return (
    <div className="CustomerDeleteConfirmation delete-confirmation-container">
      <TitleWithLogo screen={"DeleteConfirmation"} text={"Delete Customer"} />
      <p>Are you sure you want to delete the following customer?</p>
      <p>{`${customer.firstName} ${customer.lastName} (#${customer.id})`}</p>
      <p>{`${customer.email}`}</p>
      <p>{`** Has Made ${customer.coupons.length} Purchases`}</p>
      <p>
        <span className="warning-message">Warning:</span> Deleting a customer
        also deletes his purchases
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default CustomerDeleteConfirmation;
