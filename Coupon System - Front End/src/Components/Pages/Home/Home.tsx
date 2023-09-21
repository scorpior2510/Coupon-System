import "./Home.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
// ----------------------------------------------
import {
  HomeContentAdmin,
  HomeContentCompany,
  HomeContentCustomer,
  HomeContentDefault,
} from "..";
import { ClientType } from "../../../Models";
import { selectLoggedInUser } from "../../../Redux";

function Home(): JSX.Element {
  const loggedInUserClientType: ClientType =
    useSelector(selectLoggedInUser).clientType;

  switch (loggedInUserClientType) {
    case ClientType.ADMINISTRATOR:
      return (
        <div className="Home">
          <HomeContentAdmin />
        </div>
      );
    case ClientType.COMPANY:
      return (
        <div className="Home">
          <HomeContentCompany />
        </div>
      );
    case ClientType.CUSTOMER:
      return (
        <div className="Home">
          <HomeContentCustomer />
        </div>
      );
    default:
      return (
        <div className="Home">
          <HomeContentDefault />
        </div>
      );
  }
}

export default Home;
