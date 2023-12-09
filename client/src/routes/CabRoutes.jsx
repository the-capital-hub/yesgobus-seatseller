import { Route, Routes } from "react-router-dom";
import CabLayout from "../components/Layouts/CabLayout/CabLayout";
import LandingPage from "../pages/Cabs/LandingPage/LandingPage";
import SearchPage from "../pages/Cabs/SearchPage/SearchPage";

const CabRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CabLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="booking" element={<p>Booking Page</p>} />
      </Route>
    </Routes>
  );
};

export default CabRoutes;
