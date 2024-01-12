import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import "./SecuritySafeguards.scss";
import { SecurityContent } from "../../constants/SecuritySafeguards";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function SecuritySafeguards() {
  return (
    <>
      <ScrollToTop />
      <div className="security-safeguards-wrapper">
        {/* Navbar */}
        <Navbar />
        <main className="security-container">
          <h1 className="text-primary text-2xl md:text-3xl ">
            Security Safeguards
          </h1>
          <ul className="security-content list-none ps-0">
            <li className=" mb-4 px-2">
              <p className="">
                At{" "}
                <Link
                  to="/"
                  className="no-underline text-primary font-semibold"
                >
                  YesGoBus
                </Link>
                , we prioritize the security of your personal information. We
                have implemented robust measures to ensure the confidentiality,
                integrity, and availability of your data. Below, we outline the
                security safeguards in place to protect your information:
              </p>
            </li>

            {SecurityContent.map(({ heading, text }, index) => {
              return (
                <li className="mb-4 px-2" key={heading}>
                  <h3 className="mb-2">
                    {index + 1}. {heading}
                  </h3>
                  <p className="">{text}</p>
                </li>
              );
            })}

            {/* Contact */}
            <li className=" mb-4 px-2">
              <p className="">
                At{" "}
                <Link
                  to="/"
                  className="no-underline text-primary font-semibold"
                >
                  YesGoBus
                </Link>
                , your security is our top priority. We are committed to
                maintaining a secure and trustworthy environment for your travel
                bookings. If you have any security-related concerns or
                questions, please contact us at{" "}
                <a
                  href="mailto:support@yesgobus.com"
                  className="no-underline text-primary"
                >
                  support@yesgobus.com
                </a>
                . Thank you for choosing us for your travel needs, and rest
                assured that your data is in safe hands.
              </p>
            </li>
          </ul>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
