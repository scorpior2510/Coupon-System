import "./ContactInformation.css";
import {FaGithub, FaLinkedinIn, FaMailchimp} from "react-icons/fa"

function ContactInformation(): JSX.Element {
    return (
        <div className="ContactInformation">
			<FaGithub />
			<FaLinkedinIn />
			<FaMailchimp />
        </div>
    );
}

export default ContactInformation;
