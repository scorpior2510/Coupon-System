import "./LightingModeButton.css";
// ----------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { MdLightMode, MdModeNight } from "react-icons/md";
// ----------------------------------------------
import { changedLightingModeAction, selectIsDarkMode } from "../../../Redux";

function LightingModeButton(): JSX.Element {
  const dispatch = useDispatch();

  const changeLightingMode = () => dispatch(changedLightingModeAction());
  const isDarkMode: boolean = useSelector(selectIsDarkMode);

  return (
    <button className="btn btn-100 btn-theme" onClick={changeLightingMode}>
      {isDarkMode ? <MdLightMode /> : <MdModeNight />}
    </button>
  );
}

export default LightingModeButton;
