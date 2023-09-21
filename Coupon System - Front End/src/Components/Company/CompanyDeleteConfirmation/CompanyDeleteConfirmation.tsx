import "./CompanyDeleteConfirmation.css";
// ----------------------------------------------
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ----------------------------------------------
import { CompanyModel } from "../../../Models";
import {
  deleteCompanyAction,
  selectCompanyList,
} from "../../../Redux";
import { notifyService, webApiService } from "../../../Services";
import { TitleWithLogo } from "../../UI";


function CompanyDeleteConfirmation(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);

  const [company] = useState<CompanyModel>(
    useSelector(selectCompanyList).find((c) => c.id === id)!
  );

  const handleDelete = () => {
    webApiService
      .deleteCompany(id)
      .then(() => {
        dispatch(deleteCompanyAction(id));
        navigate("/api/admin/companies");
        notifyService.successPlainText("company deleted successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  const handleCancel = () => {
    navigate("/api/admin/companies");
  };

  return (
    <div className="CompanyDeleteConfirmation delete-confirmation-container">
      <TitleWithLogo screen={"DeleteConfirmation"} text={"Delete Company"} />
      <p>Are you sure you want to delete the following company?</p>
      <p>{`${company.name} (#${company.id})`}</p>
      <p>{`${company.email}`}</p>
      <p>{`** Has ${company.coupons.length} Coupons`}</p>
      <p>
        <span className="warning-message">Warning:</span> Deleting a company
        also deletes it's coupons
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default CompanyDeleteConfirmation;
