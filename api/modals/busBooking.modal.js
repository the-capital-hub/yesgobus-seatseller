import mongoose from "mongoose";

const { Schema } = mongoose;

// const boardingPointSchema = new Schema({
//   id: String,
//   location: String,
//   time: String,
// });

// const droppingPointSchema = new Schema({
//   id: String,
//   location: String,
//   time: String,
// });

const paxDetailsSchema = new mongoose.Schema({
  seatName: String,
  paxName: String,
  mobileNo: String,
  paxAge: Number,
  baseFare: Number,
  gstFare: Number,
  totalFare: Number,
  idProofId: Number,
  idProofDetails: String,
});

const reservationSchema = new mongoose.Schema({
  referenceNumber: String,
  passengerName: String,
  seatNames: String,
  email: String,
  phone: String,
  pickUpID: Number,
  dropID: Number,
  payableAmount: Number,
  totalPassengers: Number,
  verifyCall: String,
  discount: Number,
  seatDetails: String,
  paxDetails: [paxDetailsSchema],
  gstState: Number,
  gstCompanyName: String,
  gstRegNo: String,
  apipnrNo: String,
});


const seatDetailsSchema = new Schema({
  age: String,
  name: String,
  seatNbr: String,
  sex: String,
  fare: Number,
  totalFareWithTaxes: Number,
  ladiesSeat: Boolean,
  lastName: String,
  mobile: String,
  title: String,
  email: String,
  idType: String,
  idNumber: String,
  nameOnId: String,
  primary: Boolean,
  ac: Boolean,
  sleeper: Boolean,
});

const busBookingSchema = new Schema({
  userId: String,
  sourceCity: String,
  destinationCity: String,
  doj: Date,
  tripId: String,
  // boardingPoint: boardingPointSchema,
  // droppingPoint: droppingPointSchema,
  boardingPoint: String,
  droppingPoint: String,
  busOperator: String,
  busType: String,
  selectedSeats: String,
  customerName: String,
  customerLastName: String,
  customerEmail: String,
  customerPhone: String,
  emergencyPhNumber: String,
  blockSeatPaxDetails: [seatDetailsSchema],
  reservationSchema: [reservationSchema],
  inventoryType: Number,
  totalAmount: Number,
  merchantTransactionId: String,
  bookingStatus: {
    type: String,
    default: "pending"
  },
  tin: String,
  buspnr: String,
  opPNR: String,
  totalRefundAmount: String,
  cancelChargesPercentage: String,
  cancellationCharges: String,
  pickUpTime: String,
  reachTime: String,
  cancellationPolicy: String,
  sentBookingRemainer: {
    type: String,
    default: false,
  },
  blockKey: String,
  isVrl: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true,
  }
);


const BusBooking = mongoose.model("BusBooking", busBookingSchema);

export default BusBooking;