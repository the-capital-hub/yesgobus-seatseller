import { Route, Routes } from "react-router-dom";
import CabDriverRoutesLayout from "../components/Layouts/CabDriverLayout/CabDriverRoutesLayout";
import LandingPage from "../pages/CabDriver/LandingPage/LandingPage";
import CreateAccount from "../pages/CabDriver/CreateAccount/CreateAccount";
import Login from "../pages/CabDriver/Login/Login";
import CabDriverHomeLayout from "../components/Layouts/CabDriverHomeLayout/CabDriverHomeLayout";
import Home from "../pages/CabDriver/Home/Home";
import Ride from "../pages/CabDriver/RIde/Ride";
import TripRequirment from "../pages/CabDriver/TripRequirment/TripRequirment";
import Pickup from "../pages/CabDriver/pickup/Pickup";
import Otp from "../pages/CabDriver/Otp/Otp";
import OnTheWay from "../pages/CabDriver/OnTheWay/OnTheWay";

const CabDriverRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CabDriverRoutesLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="create_account" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="" element={<CabDriverHomeLayout />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="rides" element={<Ride />} />

        <Route path="trip_requirment" element={<TripRequirment />} />
        <Route path="pickup" element={<Pickup />} />

        <Route path="otp" element={<Otp />} />
        <Route path="on_the_way" element={<OnTheWay />} />
      </Route>
    </Routes>
  );
};

export default CabDriverRoutes;
