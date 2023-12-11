import { Route, Routes } from "react-router-dom";
import CabLayout from "../components/Layouts/CabLayout/CabLayout";
import LandingPage from "../pages/Cabs/LandingPage/LandingPage";
import BookingPage from "../pages/Cabs/BookingPage/BookingPage";
import SearchPage from "../pages/Cabs/SearchPage/SearchPage";

const CabRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CabLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};

export default CabRoutes;
