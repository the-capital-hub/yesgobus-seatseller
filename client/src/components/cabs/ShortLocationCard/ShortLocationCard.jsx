import "./ShortLocationCard.scss";
import { IoLocationSharp } from "react-icons/io5";

const ShortLocationCard = ({ location, title, onClick }) => (
  <div className="short-location-card" key={location} onClick={onClick}>
    <IoLocationSharp size={25} />
    <div className="details">
      <h4>{title}</h4>
      <p>{location}</p>
    </div>
  </div>
);

export default ShortLocationCard;
