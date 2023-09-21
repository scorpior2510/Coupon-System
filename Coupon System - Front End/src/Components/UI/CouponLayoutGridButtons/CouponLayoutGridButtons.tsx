import "./CouponLayoutGridButtons.css";
// ----------------------------------------------
import { CouponCardsSize } from "../../Shared";

import {
  TfiLayoutGrid4,
  TfiLayoutGrid3,
  TfiLayoutGrid2,
} from "react-icons/tfi";

interface CouponLayoutGridButtonsProps {
  adjustCouponCardsSize: (size: CouponCardsSize) => void;
}

function CouponLayoutGridButtons(
  props: CouponLayoutGridButtonsProps
): JSX.Element {
  return (
    <div className="CouponLayoutGridButtons">
      <button onClick={() => props.adjustCouponCardsSize("big-cards")}>
        <TfiLayoutGrid2 />
      </button>
      <button onClick={() => props.adjustCouponCardsSize("medium-cards")}>
        <TfiLayoutGrid3 />
      </button>
      <button onClick={() => props.adjustCouponCardsSize("small-cards")}>
        <TfiLayoutGrid4 />
      </button>
    </div>
  );
}

export default CouponLayoutGridButtons;
