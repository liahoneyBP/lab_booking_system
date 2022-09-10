const mongoose = require('mongoose');
const { Schema } = mongoose;

const labSchema = new mongoose.Schema(
  {
    labName: {
      type: String,
      required: true,
    },
    building: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
    },
    floor: {
      type: Number,
    },
    capacity: {
      type: Number,
    },
    facility: {
       pc: { type: Boolean, default: true},
       mac: { type: Boolean, default: false},
       projector: { type: Boolean, default: true},
       whiteBoard: { type: Boolean, default: true},
    },
    bookings: [bookingSchema] 
  },
);

module.exports = mongoose.model("Lab", labSchema);
