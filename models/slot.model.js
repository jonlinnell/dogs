const mongoose = require('mongoose');

const { Schema } = mongoose;

const SlotSchema = {
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
};

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;
