import { Footer, Navbar } from "../../components";
import "./SecuritySafeguards.scss";

export default function SecuritySafeguards() {
  return (
    <div className="security-safeguards-wrapper">
      {/* Navbar */}
      <Navbar />
      <main></main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
