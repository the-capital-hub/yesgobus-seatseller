/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { Route, Routes } from "react-router-dom";
import CabLayout from "../components/Layouts/CabLayout/CabLayout";
import LandingPage from "../pages/Cabs/LandingPage/LandingPage";

const CabRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<CabLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="search" element={<p>Search Page</p>} />
        <Route path="booking" element={<p>Booking Page</p>} />
      </Route>
    </Routes>
  );
};

export default CabRoutes;
