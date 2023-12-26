import { useEffect, useState } from "react";
import { downarrow } from "../../assets/busbooking";
import "./LeftFilterBox.scss";

const LeftFilterBox = ({ title, points, count, name, onFilterChange, filters, sourceCity, destinationCity }) => {
  const [showPoints, setShowPoints] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedPoints(filters || []);
  }, [filters]);

  const displayLocation = (location) => {
    const maxLength = 30;
    if (location?.length > maxLength) {
      return location.substring(0, maxLength) + "...";
    } else {
      return location;
    }
  };

  const handleCheckboxChange = (point) => {
    const updatedFilters = selectedPoints.includes(point)
      ? selectedPoints.filter((filter) => filter !== point)
      : [...selectedPoints, point];

    setSelectedPoints(updatedFilters);
    onFilterChange(name, updatedFilters);
  };

  const filterPoints = (point) => {
    return point?.toLowerCase().includes(searchTerm.toLowerCase());
  };

  function capitalizeFirstLetter(str) {
    return str?.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="LeftFilterBox">
      <div className="leftFilterContainer">
        <div onClick={() => setShowPoints(!showPoints)} className="title">
          <p>{title}</p>
          <img src={downarrow} alt="" />
        </div>
        {showPoints && (
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginTop: "15px" }}
            />
            <ul>
              {points
                ?.filter(filterPoints)
                .map((point, index) => (
                  <>
                    <div className="filterTypes" key={index}>
                      <div className="types">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(point)}
                          checked={selectedPoints.includes(point)}
                        />
                        <p>{capitalizeFirstLetter(displayLocation(point))}</p>
                      </div>
                      {/* <p>({count[index]})</p> */}
                    </div>
                    <hr />
                  </>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftFilterBox;
