import "./CustomerAddSuccessPrompt.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { TitleWithLogo } from "../../UI";

interface CustomerAddSuccessPromptProps {
  hideCustomerSuccessPrompt: () => void;
}

function CustomerAddSuccessPrompt(
  props: CustomerAddSuccessPromptProps
): JSX.Element {
  return (
    <div className="CustomerAddSuccessPrompt success-prompt-container">
      <TitleWithLogo
        screen={"SuccessPrompt"}
        text={"Customer Added Successfully"}
      />
      <p>Do you want to add another customer?</p>
      <button onClick={props.hideCustomerSuccessPrompt}>
        Add Another Customer
      </button>
      <Link to={"/api/admin/home"}>
        <button>Done</button>
      </Link>
    </div>
  );
}

export default CustomerAddSuccessPrompt;
