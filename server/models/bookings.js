const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateStart: {
        type: Date
    },
    dateEnd: {
        type: Date
    },
    timeStart: {
      type: Number,
    },
    timeEnd: {
      type: Number,
    },
    isCheckin: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    labId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab'
    },
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
