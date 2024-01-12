import { Link } from "react-router-dom";
import "./FooterLinks.scss";

const FooterLinks = ({ title, links }) => {
  return (
    <div className="footerLinks">
      <h1>{title}</h1>
      <div className="links">
        {links?.map(({ link, label }) => (
          <Link to={link} key={link}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
