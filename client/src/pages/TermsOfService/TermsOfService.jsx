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
        <ul className="xl:max-w-[80dvw] ps-0">
          {TOSContent.map(({ heading, text }, index) => {
            return (
              <li className="list-none mb-4 px-2" key={heading}>
                <h3 className="mb-2">
                  {index + 1}. {heading}
                </h3>
                <p className="">{text}</p>
              </li>
            );
          })}
          <li className="list-none mb-4 px-2">
            <h3 className="mb-2">
              {TOSContent.length + 1}. {"Contact Information"}
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
