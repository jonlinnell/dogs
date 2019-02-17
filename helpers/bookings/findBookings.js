const Booking = require('../../models/booking.model');

module.exports = id =>
  new Promise((resolve, reject) => {
    if (id) {
      Booking.findById(id)
        .populate('bookings')
        .exec((error, result) => (error ? reject(error) : resolve(result)));
    } else {
      Booking.find()
        .populate('bookings')
        .exec((error, result) => (error ? reject(error) : resolve(result)));
    }
  });
