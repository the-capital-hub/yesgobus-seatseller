import {
  BusBooking,
  ComingSoon,
  ContactUs,
  KYC,
  LandingPage,
  Login,
  Payment,
  PaymentFailure,
  PaymentSuccess,
  TicketView,
  Profile,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KycLandingPage from "./pages/KYC/KycLandingPage/KycLandingPage";
import KycPayments from "./pages/KYC/KycPayment/KycPayment";
import MobileNavbar from "./components/Mobile/Busresultsnavbar/busresultsnavbar";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { setIsMobileApp, selectIsMobileApp } from "./stores/slices/designSlice";
import { useDispatch, useSelector } from "react-redux";


function App() {
  const dispatch = useDispatch();
  const isMobileApp = useSelector(selectIsMobileApp);

  useEffect(() => {

    const currentPlatform = Capacitor.getPlatform();

    if (currentPlatform === "android" || currentPlatform === "ios") {
      dispatch(setIsMobileApp(true));
    } else {
      dispatch(setIsMobileApp(false));
    }

    //   caches.keys().then((names) => {
    //     names.forEach((name) => {
    //       caches.delete(name);
    //     });
    //   });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isMobileApp ? <BusBooking /> : <LandingPage />
          }
        />
        <Route path="/busbooking" element={<BusBooking />} />
        <Route path="/busbooking/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/busbooking/payment/failure"
          element={<PaymentFailure />}
        />
        <Route
          path="/busbooking/payment/success"
          element={<PaymentSuccess />}
        />
        <Route path="/busbooking/ticket" element={<TicketView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cabs" element={<ComingSoon />} />
        <Route path="/cabs/kyc" element={<KYC />} />
        <Route path="/cabs/kyc/payment" element={<KycPayments />} />

        {/* <Route path="/cabs/kyc" element={<KycLandingPage />} /> */}

        <Route path="/mobile_navbar" element={<MobileNavbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
