import "./CouponListContainerCo.css";
// ----------------------------------------------
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ----------------------------------------------
import {
  fetchCompanyAction,
  selectCompany,
  selectCompanyFetchStatus,
} from "../../../Redux";
import { CompanyModel, CouponModel } from "../../../Models";
import { notifyService, webApiService } from "../../../Services";
import {
  CouponCategoryFilter,
  CouponListCardsView,
  CouponMaxPriceFilter,
} from "..";
import { EmptyView, FilterType, CouponCardsSize } from "../../Shared";
import { CouponLayoutGridButtons } from "../../UI";
import { useNavigate } from "react-router-dom";

function CouponListContainerCo(): JSX.Element {
  const navigate = useNavigate();
  const company = useSelector(selectCompany);
  const hasMadeInitialFetch = useSelector(selectCompanyFetchStatus);
  const dispatch = useDispatch();

  const [filteredCouponList, setFilteredCouponList] = useState<CouponModel[]>([
    ...company.coupons,
  ]);
  const [chosenFilter, setChosenFilter] = useState<FilterType>("None");

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getCompanyDetails()
        .then((res) => {
          const fetchedCompany: CompanyModel = res.data;
          setFilteredCouponList(fetchedCompany.coupons);
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

  const filterByCategory = (category: string) => {
    setFilteredCouponList(
      company.coupons.filter(
        (coupon) => coupon.category.toString() === category
      )
    );
  };

  const filterByMaxPrice = (priceFilterInput: string) => {
    setFilteredCouponList(
      company.coupons.filter((coupon) => coupon.price <= +priceFilterInput)
    );
  };

  const clearAllFilters = () => {
    setFilteredCouponList(company.coupons);
    setChosenFilter("None");
  };

  const [couponSize, setCouponSize] = useState<CouponCardsSize>("medium-cards");
  
  const adjustCouponCardsSize = (size: CouponCardsSize) => {
    setCouponSize(size);
  };

  return (
    <div className="CouponListContainerCo">
      {hasMadeInitialFetch && company.coupons.length === 0 ? (
        <EmptyView screen="CompanyCoupons" />
      ) : (
        <>
          <div className="filter-container">
            <div>
              <span>Filter By: </span>
              <button onClick={() => setChosenFilter("Category")}>
                Category
              </button>
              <button onClick={() => setChosenFilter("MaxPrice")}>
                Max Price
              </button>
              <div className="coupon-layout-grid-section">
                <span>View: </span>
                <CouponLayoutGridButtons
                  adjustCouponCardsSize={adjustCouponCardsSize}
                />
              </div>
              <br></br>
              <span> Clear Filters: </span>
              <button onClick={clearAllFilters}>Clear</button>
            </div>
            {chosenFilter === "MaxPrice" && (
              <CouponMaxPriceFilter
                filterByMaxPrice={filterByMaxPrice}
                couponList={company.coupons}
              />
            )}
            {chosenFilter === "Category" && (
              <CouponCategoryFilter
                filterByCategory={filterByCategory}
                couponList={company.coupons}
              />
            )}
          </div>
          {filteredCouponList.length === 0 ? (
            <EmptyView screen="CompanyCouponsFilterNoResults" />
          ) : (
            <CouponListCardsView
              couponList={filteredCouponList}
              screen={"CompanyCouponList"}
              cardsSize={couponSize}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CouponListContainerCo;
