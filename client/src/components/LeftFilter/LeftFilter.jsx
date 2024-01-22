import "./LeftFilter.scss";
import LeftFilterBox from "../LeftFilterBox/LeftFilterBox";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import { cityMapping } from "../../utils/cityMapping";
import { map } from "../../assets/homepage";
import { getVrlBusFilters } from "../../api/vrlBusesApis";
import { getSrsBuseFilters } from "../../api/srsBusesApis";
import { sortPartners } from "../../utils/BusBookingHelpers";

const LeftFilter = ({
  sourceCity,
  destinationCity,
  doj,
  onFilterChange,
  isSrs,
  allSrsBusOperators,
}) => {
  const [range, setRange] = useState([100, 4000]);
  const [filters, setFilters] = useState([]);
  const [boardingPointsFilter, setBoardingPointsFilter] = useState([]);
  const [droppingPointsFilter, setDroppingPointsFilter] = useState([]);
  const [busPartnerFilter, setBusPartnerFilter] = useState([]);
  const [selectedBoardingPoints, setSelectedBoardingPoints] = useState([]);
  const [selectedDroppingPoints, setSelectedDroppingPoints] = useState([]);

  const handleSliderChangeCommitted = (event, newRange) => {
    // setRange(newRange);
    onFilterChange({
      boardingPoints: boardingPointsFilter,
      droppingPoints: droppingPointsFilter,
      busPartners: busPartnerFilter,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    });
  };

  const handleSliderChange = (event, newRange) => {
    setRange(newRange);
  };

  useEffect(() => {
    const getFilters = async () => {
      let response = {};
      let vrlResponse = {};
      let srsResponse = {};
      let combinedBoardingPoints = [];
      let combinedDroppingPoints = [];
      let combinedBusPartners = [];

      let sourceCities = [];
      let destinationCities = [];
      if (sourceCity.trim().toLowerCase() in cityMapping) {
        const mapping = cityMapping[sourceCity.trim().toLowerCase()];
        sourceCities = mapping.sourceCity;
      } else {
        sourceCities.push(sourceCity);
      }
      if (destinationCity.trim().toLowerCase() in cityMapping) {
        const mapping = cityMapping[destinationCity.trim().toLowerCase()];
        destinationCities = mapping.sourceCity;
      } else {
        destinationCities.push(destinationCity);
      }

      for (const sourceCity of sourceCities) {
        for (const destinationCity of destinationCities) {
          try {
            response = await axiosInstance.get(
              `${import.meta.env.VITE_BASE_URL}/api/busBooking/getFilters`,
              {
                params: {
                  sourceCity: sourceCity,
                  destinationCity: destinationCity,
                  doj: doj,
                },
              }
            );
          } catch (error) {
            // console.error("Error fetching filters:", error);
          }

          try {
            srsResponse = await getSrsBuseFilters(
              sourceCity.trim(),
              destinationCity.trim(),
              doj
            );
          } catch (error) {
            // console.error("Error fetching filters:", error);
          }

          try {
            vrlResponse = await getVrlBusFilters({
              sourceCity: sourceCity.trim(),
              destinationCity: destinationCity.trim(),
              doj: doj,
            });
          } catch (error) {
            // console.error("Error fetching filters:", error);
          }

          combinedBoardingPoints = combinedBoardingPoints.concat(
            vrlResponse?.data?.boardingPoints || [],
            srsResponse?.boardingPoints || []
            // response?.data?.data?.boardingPoints || []
          );

          combinedDroppingPoints = combinedDroppingPoints.concat(
            vrlResponse?.data?.droppingPoints || [],
            // response?.data?.data?.droppingPoints || [],
            srsResponse?.droppingPoints || []
          );

          combinedBusPartners = combinedBusPartners.concat(
            response?.data?.data?.busPartners || [],
            srsResponse?.busPartners || []
          );

          if (
            vrlResponse?.data?.boardingPoints?.length ||
            vrlResponse?.data?.droppingPoints?.length
          ) {
            // console.log("VRL response", vrlResponse);
            combinedBusPartners.push("VRL Travels");
          }
        }
      }
      // Create Set objects to remove duplicates
      const uniqueBoardingPointsSet = new Set(
        combinedBoardingPoints.map((point) => point)
      );
      const uniqueDroppingPointsSet = new Set(
        combinedDroppingPoints.map((point) => point)
      );
      const uniqueBusPartnersSet = new Set(
        combinedBusPartners.map((partner) => partner)
      );

      // Convert Set objects to arrays
      const uniqueBoardingPoints = [...uniqueBoardingPointsSet];
      const uniqueDroppingPoints = [...uniqueDroppingPointsSet];
      const uniqueBusPartners = [...uniqueBusPartnersSet];

      const sortedBusPartners = sortPartners(uniqueBusPartners);

      setFilters({
        ...(response?.data?.data || []),
        boardingPoints: uniqueBoardingPoints,
        droppingPoints: uniqueDroppingPoints,
        busPartners: sortedBusPartners,
      });
    };

    getFilters();
  }, [sourceCity, destinationCity, doj]);

  const handleFilterChange = (filterName, selectedFilters) => {
    let updatedBoardingPointsFilter = boardingPointsFilter;
    let updatedDroppingPointsFilter = droppingPointsFilter;
    let updatedBusPartnerFilter = busPartnerFilter;

    if (filterName === "boardingPoints") {
      updatedBoardingPointsFilter = selectedFilters;
    }
    if (filterName === "droppingPoints") {
      updatedDroppingPointsFilter = selectedFilters;
    }
    if (filterName === "busPartners") {
      updatedBusPartnerFilter = selectedFilters;
    }
    onFilterChange({
      boardingPoints: updatedBoardingPointsFilter,
      droppingPoints: updatedDroppingPointsFilter,
      busPartners: updatedBusPartnerFilter,
    });
    setBoardingPointsFilter(updatedBoardingPointsFilter);
    setDroppingPointsFilter(updatedDroppingPointsFilter);
    setBusPartnerFilter(updatedBusPartnerFilter);
  };

  return (
    <div className="leftFilter">
      <h4>Filter</h4>
      <div className="filters">
        <LeftFilterBox
          title={"Boarding Points"}
          points={filters.boardingPoints}
          count={[12, 16, 78]}
          name={"boardingPoints"}
          onFilterChange={handleFilterChange}
          filters={selectedBoardingPoints}
          sourceCity={sourceCity}
          destinationCity={destinationCity}
          key={"Boarding-Points"}
          doj={doj}
        />
        <LeftFilterBox
          title={"Drop Points"}
          points={filters.droppingPoints}
          count={[12, 16, 78]}
          name={"droppingPoints"}
          onFilterChange={handleFilterChange}
          filters={selectedDroppingPoints}
          sourceCity={sourceCity}
          destinationCity={destinationCity}
          key={"Drop-Points"}
          doj={doj}
        />
        <LeftFilterBox
          title={"Bus Partner"}
          points={filters.busPartners}
          count={[12, 16, 78]}
          name={"busPartners"}
          onFilterChange={handleFilterChange}
          sourceCity={sourceCity}
          destinationCity={destinationCity}
          key={"Bus-Partner"}
          doj={doj}
        />
        {/* <LeftFilterBox
          title={"Bus Type"}
          points={filters.busType}
          count={[12, 16, 78]}
          name={"busTypes"}
          onFilterChange={handleFilterChange}
        /> */}
        <div className="priceRange">
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={range}
            onChangeCommitted={handleSliderChangeCommitted}
            onChange={handleSliderChange}
            valueLabelDisplay="off"
            min={0}
            max={4000}
            step={1}
          />
          <div className="range-labels">
            <span>₹ {range[0]}</span>
            <span>₹ {range[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftFilter;
