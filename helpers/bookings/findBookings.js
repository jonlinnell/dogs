const Booking = require('../../models/booking.model');

module.exports = id =>
  new Promise((resolve, reject) => {
    if (id) {
      Booking.findById(id, (error, result) =>
        error ? reject(error) : resolve(result)
      );
    } else {
      Booking.find((error, result) =>
        error ? reject(error) : resolve(result)
      );
    }
  });
