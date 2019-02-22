const Booking = require('../../models/booking.model');

module.exports = id =>
  new Promise((resolve, reject) => {
    if (id) {
      Booking.findById(id)
        .populate('slot')
        .exec((error, result) => (error ? reject(error) : resolve(result)));
    } else {
      Booking.find()
        .populate('slot')
        .exec((error, result) => (error ? reject(error) : resolve(result)));
    }
  });
