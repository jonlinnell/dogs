const Booking = require('../../models/booking.model');

module.exports = slot =>
  new Promise((resolve, reject) =>
    Booking.find({ slot: { $eq: slot } }, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  );
