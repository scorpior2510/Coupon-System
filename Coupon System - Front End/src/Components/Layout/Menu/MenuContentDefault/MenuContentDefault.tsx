import "./MenuContentDefault.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function MenuContentDefault(): JSX.Element {
  return (
    <div className="MenuContentDefault menu-container">
      <Link to={"/home"}>🏠 Home</Link>
      <Link to={"/about"}>🛈 About</Link>
    </div>
  );
}

export default MenuContentDefault;
