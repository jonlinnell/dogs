const Booking = require('../../models/booking.model');

const findSlots = require('../../helpers/slots/findSlots');

module.exports = request =>
  new Promise((resolve, reject) => {
    const newBooking = new Booking(request);

    findSlots(request.slot).then(slot => {
      if (slot) {
        newBooking.save((err, result) => (err ? reject(err) : resolve(result)));
      } else {
        reject(Error('No such slot.'));
      }
    });
  });
