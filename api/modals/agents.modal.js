import mongoose from "mongoose";

const { Schema } = mongoose;

const agentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phNum: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    accHolderName: {
      type: String,
      required: true
    },
    bankAccNum: {
      type: String,
      required: true
    },
    ifsc: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;