const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  user: { type: Schema.ObjectId, ref: 'User' },
  bookingStart: Date,
  bookingEnd: Date,
  startHour: Number,
  duration: Number,
  recurring: [],
  businessUnit: { type: String, required: true },
  purpose: { type: String, required: true },
  roomId: { type: Schema.ObjectId, ref: 'Room' }
})

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
    image: {
      data: Buffer,
      contentType: String
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