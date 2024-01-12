import {
  fbdark,
  instagramdark,
  linkedindark,
  twitterdark,
} from "../../assets/footer";
import AboveFooterImages from "../AboveFooterImages/AboveFooterImages";
import Button from "../Button/Button";
import FooterLinks from "../FooterLinks/FooterLinks";
import "./Footer.scss";
import { useSelector } from "react-redux";
import { selectIsMobileApp } from "../../stores/slices/designSlice";

const Footer = () => {
  const date = new Date();
  const isMobileApp = useSelector(selectIsMobileApp);

  return (
    !isMobileApp && (
      <div className="footer">
        <div className="footerContainer">
          <p>
            Your go-to for easy and reliable bus bookings, linking travelers
            with diverse routes seamlessly.
          </p>

          {/* <FooterLinks title={"General"} links={["About Us", "Pricing"]} /> */}
          <FooterLinks
            title={"Policies"}
            links={[
              { link: "/security-safeguards", label: "Security safeguards" },
              { link: "/terms-of-service", label: "Terms of service" },
              { link: "/privacy", label: "Privacy" },
              // "Accessibility",
            ]}
          />
          <AboveFooterImages
            title={"Get In Touch"}
            subtitle={
              "Follow us on social media and stay updated with the latest information about our services"
            }
            images={[fbdark, instagramdark, twitterdark, linkedindark]}
          />

          {/* <div className="subscribe">
            <AboveFooterImages
              title={"Subscribe to our yesgobus"}
              subtitle={"Subscribe to our yesgobus and get more updates"}
            />
            <form className="input">
              <input type="email" name="" id="" />
              <Button text={"Join Now"} />
            </form>
          </div> */}
        </div>
        <p className="rights">
          {date.getFullYear()} - Shine GoBus Private Limited
        </p>
      </div>
    )
  );
};

export default Footer;
