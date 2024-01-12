import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { TOSContent } from "../../constants/TermsOfService";
import "./TermsOfService.scss";

export default function TermsOfService() {
  return (
    <div className="terms-of-service-wrapper">
      {/* Navbar */}
      <Navbar />
      <main className="tos-container">
        <h1 className="text-primary">Terms of Service</h1>
        <ul className="tos-content list-none ps-0">
          <li className=" mb-4 px-2">
            <p className="">
              Welcome to{" "}
              <Link to="/" className="no-underline text-primary font-semibold">
                YesGoBus
              </Link>
              . By using our website or mobile application, you agree to comply
              with and be bound by the following terms and conditions of use.
              Please read these terms carefully before accessing or using our
              services.
            </p>
          </li>
          {TOSContent.map(({ heading, text }, index) => {
            return (
              <li className="mb-4 px-2" key={heading}>
                <h3 className="mb-2">
                  {index + 1}. {heading}
                </h3>
                <p className="">{text}</p>
              </li>
            );
          })}

          {/* Privacy Policy */}
          <li className="mb-4 px-2">
            <h3 className="mb-2">{TOSContent.length + 1}. Privacy Policy</h3>
            <p className="">
              Your privacy is important to us. Please review our{" "}
              <Link to={"/privacy"} className="no-underline text-primary">
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and disclose your personal
              information.
            </p>
          </li>

          {/* Contact information */}
          <li className="mb-4 px-2">
            <h3 className="mb-2">
              {TOSContent.length + 2}. Contact Information
            </h3>
            <p className="">
              If you have any questions about these terms of service, please
              contact us at{" "}
              <a
                href="mailto:support@yesgobus.com"
                className="no-underline text-primary"
              >
                support@yesgobus.com
              </a>
              .
            </p>
          </li>
        </ul>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
