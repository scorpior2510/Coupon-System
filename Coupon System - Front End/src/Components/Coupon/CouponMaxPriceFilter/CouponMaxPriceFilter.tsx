import "./CouponMaxPriceFilter.css";
// ----------------------------------------------
import { useState } from "react";
// ----------------------------------------------
import { CouponModel } from "../../../Models";

interface CouponMaxPriceFilterProps {
  filterByMaxPrice: (maxPrice: string) => void;
  couponList: CouponModel[];
}

function CouponMaxPriceFilter(props: CouponMaxPriceFilterProps): JSX.Element {
  const [priceFilterInput, setPriceFilterInput] = useState<string>("0");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilterInput(event.target.value);
  };

  const findCouponListMaxPrice = () =>
    Math.max(...props.couponList.map((coupon) => coupon.price));
  const findCouponListMinPrice = () =>
    Math.min(...props.couponList.map((coupon) => coupon.price));

  return (
    <div className="CouponMaxPriceFilter">
      <span>Max Price: </span>
      <input
        type="range"
        id="priceFilterInput"
        value={priceFilterInput}
        min={findCouponListMinPrice()}
        max={findCouponListMaxPrice()}
        step={10}
        onChange={handleInputChange}
      ></input>
      <span> {priceFilterInput} </span>
      <button onClick={() => props.filterByMaxPrice(priceFilterInput)}>
        Apply Max Price
      </button>
    </div>
  );
}

export default CouponMaxPriceFilter;
