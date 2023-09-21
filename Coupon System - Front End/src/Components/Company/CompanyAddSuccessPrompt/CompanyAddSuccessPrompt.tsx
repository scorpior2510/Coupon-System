import "./CompanyAddSuccessPrompt.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { TitleWithLogo } from "../../UI";

interface CompanyAddSuccessPromptProps {
  hideCompanySuccessPrompt: () => void;
}

function CompanyAddSuccessPrompt(
  props: CompanyAddSuccessPromptProps
): JSX.Element {
  return (
    <div className="CompanyAddSuccessPrompt success-prompt-container">
      <TitleWithLogo
        screen={"SuccessPrompt"}
        text={"Company Added Successfully"}
      />
      <p>Do you want to add another company?</p>
      <button onClick={props.hideCompanySuccessPrompt}>
        Add Another Company
      </button>
      <Link to={"/api/admin/home"}>
        <button>Done</button>
      </Link>
    </div>
  );
}

export default CompanyAddSuccessPrompt;
