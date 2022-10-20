const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  dateStart: Date,
  dateEnd: Date,
  timeStart: Date,
  timeEnd: Date,
  duration: Number,
  recurring: [],
  position: { 
    type: String
  },
  isCheckin: {
     type: Boolean
    },
  title: {
     type: String
    },
  description: {
    type: String
  },
  purpose: {
    type: String,
  },
  pin: {
    type: Number
  },
  roomId: {
     type: Schema.ObjectId, ref: 'Lab' 
    },
  user: {
     type: Schema.ObjectId, ref: 'User' 
    },
})


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
      enum: ["1", "15"],
    },
    details: {
      type: String,
      text: true,
    },
    floor: {
      type: Number,
      enum: ["2", "3"]
    },
    type: {
      type: String,
      enum: ["Class", "Free Lab"]
    },
    
    capacity: {
      type: Number,
    },
    images: {
      type: Array,
    },
    equipment: {
       pc: { type: Boolean, default: true},
       mac: { type: Boolean, default: false},
       projector: { type: Boolean, default: true},
       whiteBoard: { type: Boolean, default: true},
    },
    bookings: [bookingSchema] 
  },
);


module.exports = mongoose.model("Lab", labSchema);
