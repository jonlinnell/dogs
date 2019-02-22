const mongoose = require('mongoose');

const { Schema } = mongoose;

const SlotSchema = new Schema({
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
});

SlotSchema.post('findOneAndDelete', (slot, next) =>
  slot.model('Booking').deleteMany({ slot: { $eq: slot._id } }, next)
);

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;
