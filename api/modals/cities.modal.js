import mongoose from "mongoose";

const { Schema } = mongoose;

const citySchema = new Schema(
  {
    CityName: {
      type: String,
      required: true
    },
    Id: {
      type: Number, 
      required: true
    },
    aliasNames: [{
      type: String 
    }]
  }
);

const City = mongoose.model("City", citySchema);

export default City;
