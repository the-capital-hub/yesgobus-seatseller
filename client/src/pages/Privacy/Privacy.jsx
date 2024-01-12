import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import "./Privacy.scss";
import { PrivacyContent } from "../../constants/Privacy";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function Privacy() {
  return (
    <>
      <ScrollToTop />
      <div className="privacy-wrapper">
        {/* Navbar */}
        <Navbar />
        <main className="privacy-container">
          <h1 className="text-primary text-2xl md:text-3xl">Privacy Policy</h1>
          <ul className="privacy-content list-none ps-0">
            <li className=" mb-4 px-2">
              <p className="">
                Welcome to{" "}
                <Link
                  to="/"
                  className="no-underline text-primary font-semibold"
                >
                  YesGoBus
                </Link>
                . This Privacy Policy explains how we collect, use, and protect
                the personal information you provide while using our website or
                mobile application.
              </p>
            </li>

            {PrivacyContent.map(({ heading, text, list }, index) => {
              return (
                <li className="mb-4 px-2" key={heading}>
                  <h3 className="mb-2">
                    {index + 1}. {heading}
                  </h3>
                  <p className="">{text}</p>
                  {list && list.length ? (
                    <ul className="mt-2">
                      {list.map((text) => {
                        return (
                          <li className="mb-4" key={text}>
                            {text}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}

            {/* Contact information */}
            <li className="mb-4 px-2">
              <h3 className="mb-2">
                {PrivacyContent.length + 1}. Contact Information
              </h3>
              <p className="">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:support@yesgobus.com"
                  className="no-underline text-primary"
                >
                  support@yesgobus.com
                </a>
                . Thank you for trusting{" "}
                <Link
                  to="/"
                  className="no-underline text-primary font-semibold"
                >
                  YesGoBus
                </Link>
                . We are committed to safeguarding your privacy and providing
                you with a secure and enjoyable booking experience.
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
