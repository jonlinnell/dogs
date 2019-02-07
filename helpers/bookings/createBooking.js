const Booking = require('../../models/booking.model');

module.exports = request => new Promise((resolve, reject) => {
  const newBooking = new Booking(request);

  newBooking
    .save((err, result) => (
      err
        ? reject(err)
        : resolve(result)
    ));
});
