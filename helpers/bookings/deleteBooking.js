const Booking = require('../../models/booking.model');

module.exports = id =>
  new Promise((resolve, reject) =>
    Booking.findByIdAndDelete(id, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  );
