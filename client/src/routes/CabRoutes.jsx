import { Route, Routes } from "react-router-dom";
import CabLayout from "../components/Layouts/CabLayout/CabLayout";
import LandingPage from "../pages/Cabs/LandingPage/LandingPage";
import BookingPage from "../pages/Cabs/BookingPage/BookingPage";

const CabRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CabLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="search" element={<p>Search Page</p>} />
        <Route path="booking" element={<BookingPage />} />
      </Route>
    </Routes>
  );
};

export default CabRoutes;
