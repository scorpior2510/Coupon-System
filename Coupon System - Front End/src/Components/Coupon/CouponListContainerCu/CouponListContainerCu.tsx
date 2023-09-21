import "./CouponListContainerCu.css";
// ----------------------------------------------
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------
import {
  CouponCategoryFilter,
  CouponListCardsView,
  CouponMaxPriceFilter,
} from "..";
import { CouponModel, CustomerModel } from "../../../Models";
import {
  fetchCustomerAction,
  selectCustomer,
  selectCustomerFetchStatus,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";
import { EmptyView, FilterType, CouponCardsSize } from "../../Shared";
import { CouponLayoutGridButtons } from "../../UI";

function CouponListContainerCu(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = useSelector(selectCustomer);
  const hasMadeInitialFetch = useSelector(selectCustomerFetchStatus);

  const [filteredCouponList, setFilteredCouponList] = useState<CouponModel[]>([
    ...customer.coupons,
  ]);
  const [chosenFilter, setChosenFilter] = useState<FilterType>("None");

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getCustomerDetails()
        .then((res) => {
          const fetchedCustomer: CustomerModel = res.data;
          dispatch(fetchCustomerAction(fetchedCustomer));
          setFilteredCouponList(fetchedCustomer.coupons);
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
      customer.coupons.filter(
        (coupon) => coupon.category.toString() === category
      )
    );
  };

  const filterByMaxPrice = (priceFilterInput: string) => {
    setFilteredCouponList(
      customer.coupons.filter((coupon) => coupon.price <= +priceFilterInput)
    );
  };

  const clearAllFilters = () => {
    setFilteredCouponList(customer.coupons);
    setChosenFilter("None");
  };

  const [couponSize, setCouponSize] = useState<CouponCardsSize>("medium-cards");
  
  const adjustCouponCardsSize = (size: CouponCardsSize) => {
    setCouponSize(size);
  };

  return (
    <div className="CouponListContainerCu">
      {hasMadeInitialFetch && customer.coupons.length === 0 ? (
        <EmptyView screen="CustomerCoupons" />
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
                couponList={customer.coupons}
              />
            )}
            {chosenFilter === "Category" && (
              <CouponCategoryFilter
                filterByCategory={filterByCategory}
                couponList={customer.coupons}
              />
            )}
          </div>
          {filteredCouponList.length === 0 ? (
            <EmptyView screen="CustomerCouponsFilterNoResults" />
          ) : (
            <CouponListCardsView
              couponList={filteredCouponList}
              screen={"CustomerCouponList"}
              cardsSize={couponSize}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CouponListContainerCu;
