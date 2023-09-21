import "./TitleWithLogo.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
// ----------------------------------------------
import { TitleWithLogoType } from "../../Shared";
import { selectIsDarkMode } from "../../../Redux";

interface TitleWithLogoProps {
  screen: TitleWithLogoType;
  text: string;
}

function TitleWithLogo(props: TitleWithLogoProps): JSX.Element {
  const isDarkMode: boolean = useSelector(selectIsDarkMode);
  let illustrationPath: string;
  switch (props.screen) {
    case "SuccessPrompt":
      isDarkMode
        ? (illustrationPath =
            "/assets/images/logos/check-square-f-svgrepo-com_dark.svg")
        : (illustrationPath =
            "/assets/images/logos/check-square-f-svgrepo-com_light.svg");
      break;
    case "DeleteConfirmation":
      isDarkMode
        ? (illustrationPath =
            "/assets/images/logos/exclamation-mark-triangle-svgrepo-com_dark.svg")
        : (illustrationPath =
            "/assets/images/logos/exclamation-mark-triangle-svgrepo-com_light.svg");
      break;
    default:
      illustrationPath = "";
  }

  return (
    <div className="TitleWithLogo">
      <img src={illustrationPath}></img>
      <h2>{props.text}</h2>
    </div>
  );
}

export default TitleWithLogo;
