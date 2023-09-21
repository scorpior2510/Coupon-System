import "./CouponListContainerAll.css";
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
import { CouponModel } from "../../../Models";
import {
  fetchCouponListAction,
  selectCouponList,
  selectCouponListFetchStatus,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";
import { EmptyView, FilterType, CouponCardsSize } from "../../Shared";
import { CouponLayoutGridButtons } from "../../UI";

function CouponListContainerAll(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coupons = useSelector(selectCouponList);
  const hasMadeInitialFetch = useSelector(selectCouponListFetchStatus);
  const [filteredCouponList, setFilteredCouponList] = useState<CouponModel[]>([
    ...coupons,
  ]);
  const [chosenFilter, setChosenFilter] = useState<FilterType>("None");

  useEffect(() => {
    if (!hasMadeInitialFetch) {
      webApiService
        .getAllCoupons()
        .then((res) => {
          const fetchedCoupons: CouponModel[] = res.data;
          dispatch(fetchCouponListAction(fetchedCoupons));
          setFilteredCouponList(fetchedCoupons);
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
      coupons.filter((coupon) => coupon.category.toString() === category)
    );
  };

  const filterByMaxPrice = (priceFilterInput: string) => {
    setFilteredCouponList(
      coupons.filter((coupon) => coupon.price <= +priceFilterInput)
    );
  };

  const clearAllFilters = () => {
    setFilteredCouponList(coupons);
    setChosenFilter("None");
  };

  const [couponSize, setCouponSize] = useState<CouponCardsSize>("medium-cards");
  
  const adjustCouponCardsSize = (size: CouponCardsSize) => {
    setCouponSize(size);
  };

  return (
    <div className="CouponListContainerAll">
      {coupons.length === 0 ? (
        <EmptyView screen="CustomerCouponPool" />
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
                couponList={coupons}
              />
            )}
            {chosenFilter === "Category" && (
              <CouponCategoryFilter
                filterByCategory={filterByCategory}
                couponList={coupons}
              />
            )}
          </div>
          {filteredCouponList.length === 0 ? (
            <EmptyView screen="CustomerCouponPoolFilterNoResults" />
          ) : (
            <CouponListCardsView
              couponList={filteredCouponList}
              screen={"CustomerCouponListAll"}
              cardsSize={couponSize}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CouponListContainerAll;
