import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes
import userRoutes from "./routes/user.routes.js";
import cabRoutes from "./routes/cab.routes.js";
import cabBookingRoutes from "./routes/cabbooking.routes.js";
import busBookingRoutes from "./routes/busBooking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import kycRoutes from "./routes/verifykyc.routes.js";
import agentRoutes from "./routes/agents.routes.js";
import cabdriverRoute from "./routes/cabdriver.routes.js"
 
//schedular
import { sendReminderJob, checkPaymentJob, sendMessageAfterJourneyJob } from "./utils/scheduler.js";

dotenv.config();
const app = express();
const PORT = 8000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb server");
  } catch (err) {
    console.log(err);
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://yesgobus.com', 'https://yesgobus.netlify.app', 'https://localhost', 'http://192.168.1.101:5173', 'http://localhost'],
    credentials: true,
  })
);

//routes
app.get("/", (req, res) => {
  res.send("YesGoBus Backend");
});
app.use("/api/user", userRoutes);
app.use("/api/cab", cabRoutes);
app.use("/api/cabBooking", cabBookingRoutes);
app.use("/api/busBooking", busBookingRoutes);
app.use("/api/payment/", paymentRoutes);
app.use("/api/cabdriver",cabdriverRoute)
app.use("/api/driver", driverRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/agent", agentRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`server started on port ${PORT}`);
});
