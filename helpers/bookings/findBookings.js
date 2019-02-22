const Booking = require('../../models/booking.model');

module.exports = () =>
  new Promise((resolve, reject) => {
    Booking.find()
      .populate('slot')
      .exec((error, result) => (error ? reject(error) : resolve(result)));
  });
