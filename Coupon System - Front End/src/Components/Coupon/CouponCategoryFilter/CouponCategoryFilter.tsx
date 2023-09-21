import "./CouponCategoryFilter.css";
// ----------------------------------------------
import { CouponModel } from "../../../Models";

interface CouponCategoryFilterProps {
  filterByCategory: (category: string) => void;
  couponList: CouponModel[];
}

function CouponCategoryFilter(props: CouponCategoryFilterProps): JSX.Element {
  const distinctCategoryList: string[] = [
    ...new Set(props.couponList.map((coupon) => coupon.category)),
  ];

  return (
    <div className="CouponCategoryFilter">
      <span>Category: </span>
      {distinctCategoryList.map((category, idx) => (
        <button onClick={() => props.filterByCategory(category)} key={idx}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default CouponCategoryFilter;
