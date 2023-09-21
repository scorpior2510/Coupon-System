import "./Menu.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
// ----------------------------------------------
import {
  MenuContentAdmin,
  MenuContentCompany,
  MenuContentCustomer,
  MenuContentDefault,
} from "..";
import { ClientType } from "../../../Models";
import { selectLoggedInUser } from "../../../Redux";

function Menu(): JSX.Element {
  const loggedInUserClientType: ClientType =
    useSelector(selectLoggedInUser).clientType;

  switch (loggedInUserClientType) {
    case ClientType.ADMINISTRATOR:
      return (
        <div className="Menu">
          <MenuContentAdmin />
        </div>
      );
    case ClientType.COMPANY:
      return (
        <div className="Menu">
          <MenuContentCompany />
        </div>
      );
    case ClientType.CUSTOMER:
      return (
        <div className="Menu">
          <MenuContentCustomer />
        </div>
      );
    default:
      return (
        <div className="Menu">
          <MenuContentDefault />
        </div>
      );
  }
}

export default Menu;
