const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /.+@(student\.)?lboro\.ac\.uk/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
    unique: true,
  },
  slot: { type: Schema.Types.ObjectId, ref: 'Slot' },
});

BookingSchema.post('findOneAndDelete', (booking, next) => {
  booking
    .model('Slot')
    .updateOne(
      { bookings: { $in: booking._id } },
      { $pull: { bookings: booking._id } },
      next
    );
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
