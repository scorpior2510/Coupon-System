import "./CompanyDetailsContainer.css";
// ----------------------------------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------
import { CompanyFocusedViewCo } from "..";
import { CompanyModel } from "../../../Models";
import {
  fetchCompanyAction,
  selectCompany,
  selectCompanyFetchStatus,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";

function CompanyDetailsContainer(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const hasMadeInitialFetch = useSelector(selectCompanyFetchStatus);

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getCompanyDetails()
        .then((res) => {
          const fetchedCompany: CompanyModel = res.data;
          dispatch(fetchCompanyAction(fetchedCompany));
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
    <div className="CompanyDetailsContainer">
      <CompanyFocusedViewCo company={company} />
    </div>
  );
}

export default CompanyDetailsContainer;
