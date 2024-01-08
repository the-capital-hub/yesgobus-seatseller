import {
  BusBooking,
  // ComingSoon,
  ContactUs,
  // KYC,
  LandingPage,
  Login,
  Payment,
  PaymentFailure,
  PaymentSuccess,
  TicketView,
  Profile,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import KycLandingPage from "./pages/KYC/KycLandingPage/KycLandingPage";
// import KycPayments from "./pages/KYC/KycPayment/KycPayment";
import MobileNavbar from "./components/Mobile/Busresultsnavbar/busresultsnavbar";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { setIsMobileApp, selectIsMobileApp } from "./stores/slices/designSlice";
import { useDispatch, useSelector } from "react-redux";
import { App as CapacitorApp } from "@capacitor/app";
import CabRoutes from "./routes/CabRoutes";
import "./App.scss";
import CabDriverRoutes from "./routes/CabDriverRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import {
  AdminCreateAccount,
  AdminLogin,
  AdminAccountDetails,
} from "./pages/Admin";
import NotFoundPage from "./pages/Error/NotFoundPage/NotFoundPage";

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
  }, [dispatch]);

  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (!canGoBack) {
      CapacitorApp.exitApp();
    } else {
      window.history.back();
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isMobileApp ? <BusBooking /> : <LandingPage />}
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
        {/* <Route path="/cabs" element={<ComingSoon />} />
        <Route path="/cabs/kyc" element={<KYC />} />
        <Route path="/cabs/kyc/payment" element={<KycPayments />} /> */}

        {/* <Route path="/cabs/kyc" element={<KycLandingPage />} /> */}

        <Route path="/mobile_navbar" element={<MobileNavbar />} />

        <Route path="/cabs/*" element={<CabRoutes />} />

        <Route path="/cab_driver/*" element={<CabDriverRoutes />} />

        {/* Admin */}
        <Route path="/admin/create-account" element={<AdminCreateAccount />} />
        <Route
          path="/admin/account-details"
          element={<AdminAccountDetails />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
