import { Footer, Navbar } from "../../components";
import "./TermsOfService.scss";

export default function TermsOfService() {
  return (
    <div className="terms-of-service-wrapper">
      {/* Navbar */}
      <Navbar />
      <main className="tos-container">
        <h1>Terms of Service</h1>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
