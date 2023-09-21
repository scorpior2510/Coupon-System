import "./CompanyListContainerAll.css";
// ----------------------------------------------
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------
import { notifyService, webApiService } from "../../../Services";
import {
  fetchCompanyListAction,
  selectCompanyList,
  selectCompanyListFetchStatus,
} from "../../../Redux";
import { CompanyModel } from "../../../Models";
import { CompanyListTableView } from "..";
import { EmptyView } from "../../Shared";

function CompanyListContainerAll(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyList = useSelector(selectCompanyList);
  const hasMadeInitialFetch = useSelector(selectCompanyListFetchStatus);

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getAllCompanies()
        .then((res) => {
          const fetchedCompanyList: CompanyModel[] = res.data;
          dispatch(fetchCompanyListAction(fetchedCompanyList));
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
    <div className="CompanyListContainerAll">
      {hasMadeInitialFetch && companyList.length === 0 ? (
        <EmptyView screen="AdminCompanies" />
      ) : (
        <CompanyListTableView companyList={companyList} />
      )}
    </div>
  );
}

export default CompanyListContainerAll;
