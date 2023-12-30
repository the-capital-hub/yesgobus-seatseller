import "./BusBooking.scss";
import {
  Navbar,
  BusRoute,
  LeftFilter,
  OffersCard,
  Title,
  RoutesTitle,
  ColumnNames,
  BusBookingCard,
  Footer,
} from "../../components";
// import {
//   fromto
// } from "../../assets/homepage";
// import { offer1 } from "../../assets/homepage";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";

import { Spin } from "antd";
import { useLocation, Navigate } from "react-router-dom";
import { cityMapping } from "../../utils/cityMapping";
import { filterIcon } from "../../assets/busbooking";
import { getVrlBuses } from "../../api/vrlBusesApis";
import { getSrsBuses } from "../../api/srsBusesApis";
import BusSortBy from "../../components/BusSortBy/BusSortBy";
import {
  getBusBookingCardProps,
  sortBuses,
} from "../../utils/BusBookingHelpers";

const BusBooking = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const location = useLocation();
  const [noOfBuses, setNoOfBuses] = useState(0);
  const [noOfVrlBuses, setNoVrlOfBuses] = useState(0);
  const [noOfSrsBuses, setNoSrsOfBuses] = useState(0);
  const [busDetails, setBusDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [vrlBuses, setVrlBuses] = useState([]);
  const [srsBuses, setSrsBuses] = useState([]);
  const [srsBusesForFilter, setSrsBusesForFilter] = useState([]);
  const [allSrsBusOperators, setSrsBusOperators] = useState([]);

  // SortState
  const [sortBy, setSortBy] = useState(null);

  //dates
  const date = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dates = [];

  for (let i = 0; i <= 6; i++) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + i);
    const formattedDate = `${daysOfWeek[nextDate.getDay()]}, ${
      months[nextDate.getMonth()]
    }-${nextDate.getDate()}`;
    dates.push(formattedDate);
  }

  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  currentDate = `${year}-${month}-${day}`;

  const queryParams = new URLSearchParams(location.search);
  const sourceCity =
    queryParams.get("from") || localStorage.getItem("sourceCity");
  const destinationCity =
    queryParams.get("to") || localStorage.getItem("destinationCity");
  currentDate = queryParams.get("date") || currentDate;

  const [fromLocation, setFromLocation] = useState(sourceCity);
  const [toLocation, setToLocation] = useState(destinationCity);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [sourceCityId, setSourceCityId] = useState("");
  const [destinationCityId, setDestinationCityId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sourceCity = queryParams.get("from");
    const destinationCity = queryParams.get("to");
    const doj = queryParams.get("date") || currentDate;

    if (sourceCity && destinationCity) {
      setFromLocation(sourceCity);
      setToLocation(destinationCity);
      setSelectedDate(doj);
    }
    handleSearch(fromLocation, toLocation, selectedDate);
  }, [location]);

  const handleSearch = async (
    sourceCity,
    destinationCity,
    doj,
    filters,
    returnDate
  ) => {
    setBusDetails([]);
    setVrlBuses([]);
    setSrsBuses([]);
    if (
      sourceCity === null ||
      sourceCity === undefined ||
      sourceCity === "" ||
      sourceCity === "null"
    ) {
      sourceCity = "Mysore";
    }
    if (
      destinationCity === null ||
      destinationCity === undefined ||
      destinationCity === "" ||
      destinationCity === "null"
    ) {
      destinationCity = "Bangalore";
    }

    if (
      sourceCity.trim().toLowerCase() === destinationCity.trim().toLowerCase()
    ) {
      alert("Source and destination cities cannot be the same.");
      return;
    }

    localStorage.setItem("sourceCity", sourceCity);
    localStorage.setItem("destinationCity", destinationCity);
    setFromLocation(sourceCity);
    setToLocation(destinationCity);
    setSelectedDate(doj);
    setNoOfBuses(0);
    setNoVrlOfBuses(0);
    setNoSrsOfBuses(0);

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
    let isFilter = false;

    if (
      filters &&
      (filters.busPartners.length > 0 ||
        filters.boardingPoints.length > 0 ||
        filters.droppingPoints.length > 0 ||
        (filters.minPrice && filters.maxPrice))
    ) {
      isFilter = true;
      let filteredBuses = srsBusesForFilter;
      if (filters.busPartners.length > 0) {
        filteredBuses = filteredBuses.filter((bus) =>
          filters?.busPartners
            .map((partner) => partner.toLowerCase())
            .includes(bus?.operator_service_name.toLowerCase())
        );
      }
      if (filters.boardingPoints.length > 0) {
        filteredBuses = filteredBuses.filter((bus) =>
          filters.boardingPoints.some((point) =>
            bus.boarding_stages.includes(point)
          )
        );
      }
      if (filters.droppingPoints.length > 0) {
        filteredBuses = filteredBuses.filter((bus) =>
          filters.droppingPoints.some((point) =>
            bus.dropoff_stages.includes(point)
          )
        );
      }
      if (filters.minPrice && filters.maxPrice) {
        setVrlBuses([]);
        setNoVrlOfBuses(0);
        filteredBuses = filteredBuses.filter((bus) => {
          const prices = bus.show_fare_screen
            .split("/")
            .map((price) => parseFloat(price));
          return prices.some(
            (price) => price >= filters.minPrice && price <= filters.maxPrice
          );
        });
      }
      const uniqueBusesSet = new Set(filteredBuses.map((bus) => bus.id));
      filteredBuses = Array.from(uniqueBusesSet, (id) =>
        filteredBuses.find((bus) => bus.id === id)
      );

      setSrsBuses(filteredBuses);
      setNoSrsOfBuses(filteredBuses?.length);
    } else {
      isFilter = false;
    }
    console.log(isFilter);
    //vrl buses
    for (const sourceCity of sourceCities) {
      for (const destinationCity of destinationCities) {
        try {
          setLoading(true);
          const requestBody = {
            sourceCity: sourceCity.trim(),
            destinationCity: destinationCity.trim(),
            doj: doj,
            ...filters,
          };
          const vrlResponse = await getVrlBuses(requestBody);
          if (Array.isArray(vrlResponse.data)) {
            const uniqueReferenceNumbersSet = new Set();
            const uniqueBusesArray = vrlResponse.data.filter((bus) => {
              if (!uniqueReferenceNumbersSet.has(bus.ReferenceNumber)) {
                uniqueReferenceNumbersSet.add(bus.ReferenceNumber);
                return true;
              }
              return false;
            });

            setVrlBuses((prevBuses) => {
              // extract a unique list of buses from combined bus list
              let newBuslist = [...prevBuses, ...uniqueBusesArray];
              const newUniqueBusListSet = new Set();
              const newUniqueBusList = newBuslist.filter((bus) => {
                if (!newUniqueBusListSet.has(bus.ReferenceNumber)) {
                  newUniqueBusListSet.add(bus.ReferenceNumber);
                  return true;
                }
                return false;
              });

              return [...newUniqueBusList];
            });
            setNoVrlOfBuses((prevCount) => prevCount + uniqueBusesArray.length);
          } else {
            console.error("Invalid vrlResponse.data:", vrlResponse.data);
          }
          // setVrlDestinationCityId(vrlResponse.destinationCity);
          // setVrlSourceCityId(vrlResponse.sourceCity);
        } catch (error) {
          // setVrlBuses([]);
          // setNoVrlOfBuses(0);
          // console.log(error);
        }

        //srs buses
        try {
          if (isFilter === false) {
            const srsResponse = await getSrsBuses(
              sourceCity.trim(),
              destinationCity.trim(),
              doj
            );
            const filteredBuses = srsResponse.filter(
              (bus) => bus?.status === "New" || bus.status === "Update"
            );
            setSrsBuses((prevBuses) => [...prevBuses, ...filteredBuses]);
            setSrsBusesForFilter((prevFilteredBuses) => [
              ...prevFilteredBuses,
              ...filteredBuses,
            ]);
            setNoSrsOfBuses((prevCount) => prevCount + filteredBuses?.length);
          }
        } catch (error) {
          //   setSrsBuses([]);
          // setSrsBusesForFilter([]);
          // setNoSrsOfBuses(0);
          // console.log(error);
        }

        //seat seller buses
        try {
          //   const response = await axiosInstance.post(
          //     `${import.meta.env.VITE_BASE_URL}/api/busBooking/getBusDetails`,
          //     {
          //       sourceCity: sourceCity.trim(),
          //       destinationCity: destinationCity.trim(),
          //       doj: doj,
          //       // boardingPoints,
          //       // droppingPoints,
          //       ...filters,
          //     }
          //   );
          //   if (response.data.data[0] !== null) {
          //     setBusDetails(response.data.data);
          //     setNoOfBuses(response.data.data.length);
          //   } else {
          //     setBusDetails([]);
          //     setNoOfBuses(0);
          //   }
          //   setSourceCityId(response.data.sourceCity);
          //   setDestinationCityId(response.data.destinationCity);
          //   setLoading(false);
        } catch (error) {
          setBusDetails([]);
          setNoOfBuses(0);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleDateFilter = (date) => {
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const parts = date.split(",");
    const dateParts = parts[1].split("-");
    const day = parseInt(dateParts[1]);
    const month = monthMap[dateParts[0]];
    const year = parseInt(new Date().getFullYear());
    const newDate = new Date(Date.UTC(year, month, day));
    const formattedDateString = newDate.toISOString().split("T")[0];
    handleSearch(fromLocation, toLocation, formattedDateString);
  };

  const priceToDisplay = (fare) => {
    const fareArray = Array.isArray(fare) ? fare : [fare];

    const prices = fareArray.map((price) => {
      return parseInt(price, 10);
    });

    if (prices.length === 1) {
      return prices[0].toFixed(2);
    } else {
      const minPrice = Math.min(...prices).toFixed(2);
      const maxPrice = Math.max(...prices).toFixed(2);
      return `${minPrice} - ${maxPrice}`;
    }
  };

  // const priceToDisplaySrs = (fare) => {
  //   const prices = fare.split("/");
  //   if (prices.length === 1) {
  //     return prices[0];
  //   } else {
  //     const minPrice = Math.min(...prices).toFixed(2);
  //     return minPrice;
  //   }
  // };

  // const formatTravelTime = (durationInMins) => {
  //   const hours = Math.floor(durationInMins / 60);
  //   const minutes = durationInMins % 60;
  //   const formattedHours = hours > 0 ? `${hours} :` : "";
  //   const formattedMinutes = minutes > 0 ? ` ${minutes}` : "";
  //   return `${formattedHours}${formattedMinutes}`;
  // };

  const handleFilter = (filters) => {
    handleSearch(fromLocation, toLocation, selectedDate, filters);
  };

  const handleDate = (date) => {
    handleSearch(fromLocation, toLocation, date);
  };

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const journeyDay = Math.floor(hours / 24);
    const hour = hours % 24;
    const ampm = hour < 12 ? "am" : "pm";
    const displayHour = hour > 12 ? hour - 12 : hour;
    const formattedTime = `${displayHour.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedTime;
  }

  function calculateTravelTime(departureTime, arrivalTime) {
    if (arrivalTime < departureTime) {
      arrivalTime += 1440;
    }
    const travelTimeInMinutes = arrivalTime - departureTime;
    const travelHours = Math.floor(travelTimeInMinutes / 60);
    const travelMinutes = travelTimeInMinutes % 60;
    const totalTimeTaken = travelHours + "hr " + travelMinutes + "min";
    return totalTimeTaken;
  }

  // function calculateVrlTravelTime(pickupTime, arrivalTime) {
  //   const currentDate = new Date();

  //   const [hours, minutes, seconds] = pickupTime.split(":");
  //   currentDate.setHours(hours);
  //   currentDate.setMinutes(minutes);
  //   currentDate.setSeconds(seconds || 0);

  //   const arrivalDateTime = new Date(
  //     arrivalTime.replace(
  //       /(\d+)-(\d+)-(\d+) (\d+):(\d+) ([APMapm]{2})/,
  //       "$2/$1/$3 $4:$5 $6"
  //     )
  //   );
  //   const timeDifference = arrivalDateTime - currentDate;

  //   const travelTimeInMinutes = timeDifference / (1000 * 60);
  //   return formatTravelTime(parseInt(travelTimeInMinutes));
  // }

  // Handle sort change
  function handleSortByChange(sortTerm) {
    setSortBy(sortTerm);
  }

  // get sortedData
  const busList = [...vrlBuses, ...srsBuses]; // vrlbuses always go first
  const sortedBusList = sortBuses(busList, sortBy);

  return (
    <div className="busBooking">
      <Navbar />
      <BusRoute
        locationOne={fromLocation}
        locationTwo={toLocation}
        departureDate={selectedDate}
        returnDate={"- - -"}
        onSearch={handleSearch}
      />
      <div className="busBooking-container">
        <div className="left">
          <LeftFilter
            sourceCity={fromLocation}
            destinationCity={toLocation}
            doj={selectedDate}
            onFilterChange={handleFilter}
            isSrs={noOfSrsBuses > 0}
            allSrsBusOperators={allSrsBusOperators}
            key={"left-filter"}
          />
        </div>

        <div className="right">
          <div className="mobile-filter">
            <div className="filter-buttons">
              <button
                className="filter"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <img src={filterIcon} alt="" /> <span>Filter</span>
              </button>
            </div>
            <div className={`filter-wrapper ${showMobileFilters && "active"}`}>
              <LeftFilter
                sourceCity={fromLocation}
                destinationCity={toLocation}
                doj={selectedDate}
                onFilterChange={handleFilter}
                key={"mobile-left-filter"}
              />
              <div className="dates">
                {dates.map((date) => (
                  <p
                    key={date}
                    className={`date ${date === selectedDate ? "active" : ""}`}
                    onClick={() => handleDateFilter(date)}
                  >
                    {date}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="dates">
            {dates.map((date) => (
              <p
                key={date}
                className={`date ${date === selectedDate ? "active" : ""}`}
                onClick={() => handleDateFilter(date)}
              >
                {date}
              </p>
            ))}
          </div>
          {/* <div className="exclusiveOffers">
            <Title title={"Offers"} />
            <div className="offers">
              <OffersCard
                img={offer1}
                title={"Deal of the Day"}
                subtitle={"Enjoy Different  Deals Each Day With "}
                code={"EASEDAY"}
                date={"31st july, 2023"}
              />
              <OffersCard
                img={offer1}
                title={"Deal of the Day"}
                subtitle={"Enjoy Different  Deals Each Day With "}
                code={"EASEDAY"}
                date={"31st july, 2023"}
              />
              <OffersCard
                img={offer1}
                title={"Deal of the Day"}
                subtitle={"Enjoy Different  Deals Each Day With "}
                code={"EASEDAY"}
                date={"31st july, 2023"}
              />
            </div>
          </div> */}
          <Spin spinning={loading}>
            <div className="wrapper">
              <RoutesTitle
                locationOne={fromLocation}
                locationTwo={toLocation}
                date={selectedDate}
                onDateChange={handleDate}
              />

              {/* Sort By */}
              <BusSortBy
                handleSortByChange={handleSortByChange}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <ColumnNames
                noOfBuses={noOfBuses + noOfVrlBuses + noOfSrsBuses}
              />

              {/* Render Bus list */}
              {sortedBusList?.map((bus) => {
                const isVrl = bus.type === "vrl" ? true : false;

                const busProps = getBusBookingCardProps(bus);

                return (
                  <div
                    className="bus-card-container"
                    key={isVrl ? bus?.ReferenceNumber : bus.id}
                  >
                    <BusBookingCard {...busProps} key={bus?.ReferenceNumber} />
                  </div>
                );
              })}

              {/* vrl buses */}
              {/* {vrlBuses?.map((bus) => (
                <div className="bus-card-container" key={bus?.ReferenceNumber}>
                  <BusBookingCard
                    key={bus?.ReferenceNumber}
                    ReferenceNumber={bus?.ReferenceNumber}
                    // inventoryType={bus.inventoryType}
                    sourceCity={fromLocation}
                    sourceCityId={bus?.FromCityId}
                    destinationCity={toLocation}
                    destinationCityId={bus?.ToCityId}
                    doj={selectedDate}
                    title={"VRL Travels"}
                    busName={"VRL Travels"}
                    busType={bus?.BusTypeName}
                    rating={(Math.random() * 1 + 4).toFixed(1)}
                    noOfReviews={Math.floor(Math.random() * 101) + 37}
                    pickUpLocation={bus?.FromCityName}
                    pickUpTime={bus?.CityTime}
                    reachLocation={bus?.ToCityName}
                    reachTime={bus?.ArrivalTime}
                    // calucalte total time
                    travelTime={calculateVrlTravelTime(
                      bus?.CityTime24,
                      bus?.ApproxArrival
                    )}
                    seatsLeft={bus?.EmptySeats}
                    // avlWindowSeats={bus?.avlWindowSeats}
                    price={bus?.lowestPrice}
                    allPrices={bus?.allPrices}
                    // pickUpTimes={pickUpTimes}
                    pickUpLocationOne={bus?.BoardingPoints}
                    // pickUpLocationTwo={pickUpLocationTwo}
                    // dropTimes={dropTimes}
                    dropLocationOne={bus?.DroppingPoints}
                    // dropLocationTwo={dropLocationTwo}
                    backSeat={true}
                    // cancellationPolicy={bus?.cancellationPolicy}
                    fare={bus?.fares}
                    isVrl={true}
                  />
                </div>
              ))} */}

              {/* srs buses */}
              {/* {srsBuses?.map((bus) => (
                <div className="bus-card-container" key={bus?.id}>
                  <BusBookingCard
                    key={bus?.id}
                    scheduleId={bus?.id}
                    // inventoryType={bus.inventoryType}
                    sourceCity={fromLocation}
                    sourceCityId={bus?.origin_id}
                    destinationCity={toLocation}
                    destinationCityId={bus?.destination_id}
                    doj={selectedDate}
                    title={bus?.operator_service_name}
                    busName={bus?.operator_service_name}
                    busType={bus?.bus_type}
                    rating={(Math.random() * 1 + 4).toFixed(1)}
                    noOfReviews={Math.floor(Math.random() * 101) + 37}
                    pickUpLocation={fromLocation}
                    pickUpTime={bus?.dep_time}
                    reachLocation={toLocation}
                    reachTime={bus?.arr_time}
                    // calucalte total time
                    travelTime={bus?.duration}
                    seatsLeft={bus?.available_seats}
                    // avlWindowSeats={bus?.avlWindowSeats}
                    price={priceToDisplaySrs(bus?.show_fare_screen)}
                    // pickUpTimes={pickUpTimes}
                    pickUpLocationOne={bus?.boarding_stages}
                    // pickUpLocationTwo={pickUpLocationTwo}
                    // dropTimes={dropTimes}
                    dropLocationOne={bus?.dropoff_stages}
                    // dropLocationTwo={dropLocationTwo}
                    backSeat={true}
                    // cancellationPolicy={bus?.cancellationPolicy}
                    fare={bus?.show_fare_screen}
                    isSrs={true}
                  />
                </div>
              ))} */}

              {/* seat seller buses */}
              {busDetails?.map((bus) => (
                <div className="bus-card-container" key={bus?.id}>
                  <BusBookingCard
                    key={bus?.id}
                    tripId={bus?.id}
                    // inventoryType={bus.inventoryType}
                    sourceCity={fromLocation}
                    sourceCityId={sourceCityId}
                    destinationCity={toLocation}
                    destinationCityId={destinationCityId}
                    doj={selectedDate}
                    title={bus?.travels}
                    busName={bus?.travels}
                    busType={bus?.busType}
                    rating={(Math.random() * 1 + 4).toFixed(1)}
                    noOfReviews={Math.floor(Math.random() * 101) + 37}
                    pickUpLocation={
                      bus?.boardingTimes[0]?.bpName || bus.boardingTimes?.bpName
                    }
                    pickUpTime={convertMinutesToTime(bus.departureTime)}
                    reachLocation={bus?.droppingTimes[0]?.bpName}
                    reachTime={convertMinutesToTime(bus?.arrivalTime)}
                    travelTime={calculateTravelTime(
                      bus?.departureTime,
                      bus?.arrivalTime
                    )}
                    seatsLeft={bus?.availableSeats}
                    avlWindowSeats={bus?.avlWindowSeats}
                    price={priceToDisplay(bus?.fares)}
                    // pickUpTimes={pickUpTimes}
                    pickUpLocationOne={bus?.boardingTimes}
                    // pickUpLocationTwo={pickUpLocationTwo}
                    // dropTimes={dropTimes}
                    dropLocationOne={bus?.droppingTimes}
                    // dropLocationTwo={dropLocationTwo}
                    backSeat={true}
                    cancellationPolicy={bus?.cancellationPolicy}
                    fare={bus?.fares}
                  />
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusBooking;
