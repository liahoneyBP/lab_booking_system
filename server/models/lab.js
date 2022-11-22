const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  dateStart: Date,
  dateEnd: Date,
  timeStart: Number,
  timeEnd: Number,
  position: {
    type: String
  },
  bookedBy: {
    type: String
  },
  isCheckin: {
    type: String,
    default: 'Unconfirmed'
  },
  description: {
    type: String
  },
  purpose: {
    type: String,
  },
  pin: {
    type: String
  },
  labId: {
    type: Schema.ObjectId,
    ref: 'Lab'
  },
  user: {
    type: Schema.Types.Mixed,
    ref: 'User'
  },
  
}, {timestamps: true})


const labSchema = new mongoose.Schema(
  {
    labName: {
      type: String,
      title: true,
      unique: true,
      trim: true,
      text: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    building: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      text: true,
    },
    floor: {
      type: Number,
    },
    capacity: {
      type: Number,
    },
    images: {
      type: Array,
    },
    equipment: {
      type: Array,
    },
    bookings: [bookingSchema]
  },
);


module.exports = mongoose.model("Lab", labSchema);
