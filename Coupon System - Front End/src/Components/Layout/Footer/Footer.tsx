import { ContactInformation, CopyRights } from "../../Shared";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <CopyRights />
            <ContactInformation />
        </div>
    );
}

export default Footer;
