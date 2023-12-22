import { Route, Routes } from "react-router-dom";
import CabDriverRoutesLayout from "../components/Layouts/CabDriverLayout/CabDriverRoutesLayout";
import LandingPage from "../pages/CabDriver/LandingPage/LandingPage";
// import BookingPage from "../pages/Cabs/BookingPage/BookingPage";
// import SearchPage from "../pages/Cabs/SearchPage/SearchPage";

const CabDriverRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CabDriverRoutesLayout />}>
        {/* <Route index element={<LandingPage />} /> */}
        {/* <Route path="booking" element={<BookingPage />} />
        <Route path="search" element={<SearchPage />} /> */}
        <Route index element={<LandingPage />} />

      </Route>
    </Routes>
  );
};

export default CabDriverRoutes;
