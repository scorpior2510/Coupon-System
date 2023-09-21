import "./AuthMenu.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// ----------------------------------------------
import { ClientType, UserModel } from "../../../Models";
import { selectLoggedInUser } from "../../../Redux";

function AuthMenu(): JSX.Element {

  const loggedInUserDetails: UserModel = useSelector(selectLoggedInUser);
  const loggedInUserClientType: ClientType = loggedInUserDetails.clientType;
  const isUserLoggedIn: boolean = loggedInUserClientType !== ClientType.NONE;

  return (
    <div className="AuthMenu">
      {isUserLoggedIn ? (
        <div className="login-details-container">
          <p>Welcome {loggedInUserDetails.email} </p>
          <p><Link to={"/api/auth/logout"} id="authMenu-link" className="button-like-link">Log out</Link></p>
        </div>
      ) : (
        <p>
          <span>Hello Guest </span>
          <Link to={"/api/auth/login"} id="authMenu-link" className="button-like-link">Log in</Link>
        </p>
      )}
    </div>
  );
}

export default AuthMenu;